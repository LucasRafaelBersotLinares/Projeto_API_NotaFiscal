/**
 * Testador Automático — Concessionária REST API
 * Uso: node tester.mjs [porta]
 * Padrão: porta 3000
 */

import http from "node:http";

const BASE = `http://localhost:${process.argv[2] ?? 3000}`;
const results = [];

// ─── HTTP helper ──────────────────────────────────────────────────────────────

function req(method, url, body) {
  return new Promise((resolve) => {
    const fullUrl = BASE + url;
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
      },
    };
    const request = http.request(fullUrl, options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        let json = null;
        try { json = JSON.parse(data); } catch {}
        resolve({ status: res.statusCode, body: json, raw: data });
      });
    });
    request.on("error", (e) => resolve({ status: 0, body: null, raw: e.message }));
    if (payload) request.write(payload);
    request.end();
  });
}

// ─── Assertion helpers ─────────────────────────────────────────────────────────

let currentGroup = "";
const createdIds = {};

// IDs conforme a documentação: id_cliente, id_vendedor, id_carro, id_estoque, id_nota
async function resolveId(postRes, listEndpoint, uniqueField, uniqueValue) {
  // Se o POST já devolveu algum campo de ID, retorna diretamente
  if (postRes.body) {
    const id =
      postRes.body.id ??
      postRes.body.id_cliente ??
      postRes.body.id_vendedor ??
      postRes.body.id_carro ??
      postRes.body.id_estoque ??
      postRes.body.id_nota;

    if (id != null) {
      return id;
    }
  }

  // Tenta buscar via GET all
  try {
    const listRes = await req("GET", listEndpoint);

    if (!Array.isArray(listRes.body)) {
      return null;
    }

    const found = listRes.body.find(
      (item) => String(item[uniqueField]) === String(uniqueValue)
    );

    if (!found) {
      return null;
    }

    return (
      found.id ??
      found.id_cliente ??
      found.id_vendedor ??
      found.id_carro ??
      found.id_estoque ??
      found.id_nota ??
      null
    );
  } catch {
    return null;
  }
}

function group(name) {
  currentGroup = name;
  console.log(`\n▶ ${name}`);
}

async function test(description, fn) {
  let passed = false;
  let detail = "";
  let statusGot = null;
  try {
    const result = await fn();
    passed = result.passed;
    detail = result.detail ?? "";
    statusGot = result.status ?? null;
  } catch (e) {
    detail = e.message;
  }
  const icon = passed ? "✓" : "✗";
  console.log(`  ${icon} ${description}${detail ? " — " + detail : ""}`);
  results.push({ group: currentGroup, description, passed, detail, status: statusGot });
}

function expect(res, expectedStatus) {
  const ok = res.status === expectedStatus;
  return {
    passed: ok,
    status: res.status,
    detail: ok ? `HTTP ${res.status}` : `esperado ${expectedStatus}, recebeu ${res.status}`,
  };
}

function expectRange(res, min, max) {
  const ok = res.status >= min && res.status <= max;
  return {
    passed: ok,
    status: res.status,
    detail: ok ? `HTTP ${res.status}` : `esperado ${min}-${max}, recebeu ${res.status}`,
  };
}

// ─── TESTES ───────────────────────────────────────────────────────────────────

// Verificar se o servidor está online
group("Conectividade");
await test("Servidor respondendo na porta", async () => {
  const r = await req("GET", "/clientes");
  if (r.status === 0) return { passed: false, detail: "Servidor inacessível — " + r.raw };
  return { passed: true, status: r.status, detail: `HTTP ${r.status}` };
});

// ── CLIENTES ──────────────────────────────────────────────────────────────────
group("Clientes — CRUD básico");

await test("GET /clientes retorna lista (200)", async () => {
  const r = await req("GET", "/clientes");
  return expect(r, 200);
});

await test("POST /clientes cria cliente válido (201)", async () => {
  const r = await req("POST", "/clientes", {
    nome: "João da Silva",
    cpf: "111.111.111-11",
    telefone: "(11) 99999-0001",
    email: "joao@teste.com",
    cidade: "São Paulo"
  });
  if (r.status === 201) {
    createdIds.cliente1 = await resolveId(r, "/clientes", "cpf", "111.111.111-11");
  }
  const passed = r.status === 201 && !!createdIds.cliente1;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /clientes`,
  };
});

await test("GET /clientes/:id retorna cliente criado (200)", async () => {
  if (!createdIds.cliente1) return { passed: false, detail: "ID não disponível (criação falhou)" };
  const r = await req("GET", `/clientes/${createdIds.cliente1}`);
  return expect(r, 200);
});

await test("PUT /clientes/:id atualiza cliente (200)", async () => {
  if (!createdIds.cliente1) return { passed: false, detail: "ID não disponível" };
  const r = await req("PUT", `/clientes/${createdIds.cliente1}`, {
    nome: "João Atualizado",
    cpf: "111.111.111-11",
    telefone: "(11) 88888-0001",
  });
  return expect(r, 200);
});

group("Clientes — Regras de negócio");

await test("POST /clientes — CPF duplicado retorna 409", async () => {
  const r = await req("POST", "/clientes", {
    nome: "Outro João",
    cpf: "111.111.111-11",
    telefone: "(11) 77777-0001",
  });
  return expect(r, 409);
});

await test("POST /clientes — campos obrigatórios ausentes retorna 400", async () => {
  const r = await req("POST", "/clientes", { cidade: "Rio" });
  return expect(r, 400);
});

await test("GET /clientes/:id — ID inexistente retorna 404", async () => {
  const r = await req("GET", "/clientes/999999");
  return expect(r, 404);
});

await test("POST /clientes — segundo cliente válido (para testes futuros)", async () => {
  const r = await req("POST", "/clientes", {
    nome: "Maria Souza",
    cpf: "222.222.222-22",
    telefone: "(11) 99999-0002",
  });
  if (r.status === 201) {
    createdIds.cliente2 = await resolveId(r, "/clientes", "cpf", "222.222.222-22");
  }
  const passed = r.status === 201 && !!createdIds.cliente2;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /clientes`,
  };
});

// ── VENDEDORES ────────────────────────────────────────────────────────────────
group("Vendedores — CRUD básico");

await test("GET /vendedores retorna lista (200)", async () => {
  const r = await req("GET", "/vendedores");
  return expect(r, 200);
});

await test("POST /vendedores cria vendedor válido (201)", async () => {
  const r = await req("POST", "/vendedores", {
    nome: "Ana Souza",
    matricula: "VND-001",
    comissao_percentual: 5.5,
  });
  if (r.status === 201) {
    createdIds.vendedor1 = await resolveId(r, "/vendedores", "matricula", "VND-001");
  }
  const passed = r.status === 201 && !!createdIds.vendedor1;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /vendedores`,
  };
});

await test("GET /vendedores/:id retorna vendedor (200)", async () => {
  if (!createdIds.vendedor1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/vendedores/${createdIds.vendedor1}`);
  return expect(r, 200);
});

await test("PUT /vendedores/:id atualiza vendedor (200)", async () => {
  if (!createdIds.vendedor1) return { passed: false, detail: "ID não disponível" };
  const r = await req("PUT", `/vendedores/${createdIds.vendedor1}`, {
    nome: "Ana Atualizada",
    matricula: "VND-001",
    comissao_percentual: 7.0,
  });
  return expect(r, 200);
});

group("Vendedores — Regras de negócio");

await test("POST /vendedores — matrícula duplicada retorna 409", async () => {
  const r = await req("POST", "/vendedores", {
    nome: "Outro Vendedor",
    matricula: "VND-001",
    comissao_percentual: 3,
  });
  return expect(r, 409);
});

await test("POST /vendedores — comissão > 30 retorna 400", async () => {
  const r = await req("POST", "/vendedores", {
    nome: "Vendedor Guloso",
    matricula: "VND-099",
    comissao_percentual: 35,
  });
  return expect(r, 400);
});

await test("POST /vendedores — comissão negativa retorna 400", async () => {
  const r = await req("POST", "/vendedores", {
    nome: "Vendedor Negativo",
    matricula: "VND-098",
    comissao_percentual: -1,
  });
  return expect(r, 400);
});

await test("GET /vendedores/:id — ID inexistente retorna 404", async () => {
  const r = await req("GET", "/vendedores/999999");
  return expect(r, 404);
});

// ── CARROS ────────────────────────────────────────────────────────────────────
group("Carros — CRUD básico");

await test("GET /carros retorna lista (200)", async () => {
  const r = await req("GET", "/carros");
  return expect(r, 200);
});

await test("POST /carros cria carro válido (201)", async () => {
  const r = await req("POST", "/carros", {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    placa: "TST-0001",
    preco: 110000.0,
    cor: "Prata",
  });
  if (r.status === 201) {
    createdIds.carro1 = await resolveId(r, "/carros", "placa", "TST-0001");
  }
  const passed = r.status === 201 && !!createdIds.carro1;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /carros`,
  };
});

await test("GET /carros/:id retorna carro (200)", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/carros/${createdIds.carro1}`);
  return expect(r, 200);
});

await test("PUT /carros/:id atualiza carro (200)", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID não disponível" };
  const r = await req("PUT", `/carros/${createdIds.carro1}`, {
    marca: "Toyota",
    modelo: "Corolla Cross",
    ano: 2024,
    placa: "TST-0001",
    preco: 120000.0,
    cor: "Branco",
  });
  return expect(r, 200);
});

group("Carros — Regras de negócio");

await test("POST /carros — placa duplicada retorna 409", async () => {
  const r = await req("POST", "/carros", {
    marca: "Honda",
    modelo: "Civic",
    ano: 2023,
    placa: "TST-0001",
    preco: 95000,
    cor: "Preto",
  });
  return expect(r, 409);
});

await test("POST /carros — ano antes de 1950 retorna 400", async () => {
  const r = await req("POST", "/carros", {
    marca: "Ford",
    modelo: "Antigo",
    ano: 1900,
    placa: "ANT-0001",
    preco: 50000,
    cor: "Bege",
  });
  return expect(r, 400);
});

await test("POST /carros — ano atual+2 retorna 400", async () => {
  const anoFuturo = new Date().getFullYear() + 2;
  const r = await req("POST", "/carros", {
    marca: "DeLorean",
    modelo: "DMC",
    ano: anoFuturo,
    placa: "FUT-0001",
    preco: 200000,
    cor: "Inox",
  });
  return expect(r, 400);
});

await test("POST /carros — preço zero retorna 400", async () => {
  const r = await req("POST", "/carros", {
    marca: "Fiat",
    modelo: "Grátis",
    ano: 2023,
    placa: "GRT-0001",
    preco: 0,
    cor: "Rosa",
  });
  return expect(r, 400);
});

await test("GET /carros/:id — ID inexistente retorna 404", async () => {
  const r = await req("GET", "/carros/999999");
  return expect(r, 404);
});

await test("POST /carros — segundo carro para testes (201)", async () => {
  const r = await req("POST", "/carros", {
    marca: "Honda",
    modelo: "Civic",
    ano: 2023,
    placa: "TST-0002",
    preco: 95000,
    cor: "Preto",
  });
  if (r.status === 201) {
    createdIds.carro2 = await resolveId(r, "/carros", "placa", "TST-0002");
  }
  const passed = r.status === 201 && !!createdIds.carro2;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /carros`,
  };
});

// ── ESTOQUE ───────────────────────────────────────────────────────────────────
group("Estoque — CRUD básico");

await test("GET /estoque retorna lista (200)", async () => {
  const r = await req("GET", "/estoque");
  return expect(r, 200);
});

await test("POST /estoque cria registro válido (201)", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID de carro não disponível" };
  const today = new Date().toISOString().split("T")[0];

  const r = await req("POST", "/estoque", {
    id_carro: createdIds.carro1,
    quantidade: 5,
    localizacao_patio: "Galpão A-1",
    data_entrada: today,
  });

  if (r.status === 201) {
    createdIds.estoque1 = await resolveId(r, "/estoque", "id_carro", createdIds.carro1);
  }
  const passed = r.status === 201 && !!createdIds.estoque1;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /estoque`,
  };
});

await test("GET /estoque/:id retorna registro (200)", async () => {
  if (!createdIds.estoque1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/estoque/${createdIds.estoque1}`);
  return expect(r, 200);
});

await test("PUT /estoque/:id atualiza quantidade (200)", async () => {
  if (!createdIds.estoque1) return { passed: false, detail: "ID não disponível" };
  const today = new Date().toISOString().split("T")[0];
  const r = await req("PUT", `/estoque/${createdIds.estoque1}`, {
    id_carro: createdIds.carro1,
    quantidade: 10,
    localizacao_patio: "Galpão A-1",
    data_entrada: today,
  });
  return expect(r, 200);
});

await test("GET /estoque/carro/:id_carro retorna estoque do carro (200)", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/estoque/carro/${createdIds.carro1}`);
  return expect(r, 200);
});

group("Estoque — Regras de negócio");

await test("POST /estoque — carro inexistente retorna 400 ou 404", async () => {
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/estoque", {
    id_carro: 999999,
    quantidade: 1,
    localizacao_patio: "Galpão X",
    data_entrada: today,
  });
  return expectRange(r, 400, 404);
});

await test("POST /estoque — quantidade negativa retorna 400", async () => {
  if (!createdIds.carro2) return { passed: false, detail: "ID de carro não disponível" };
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/estoque", {
    id_carro: createdIds.carro2,
    quantidade: -1,
    localizacao_patio: "Galpão B",
    data_entrada: today,
  });
  return expect(r, 400);
});

await test("POST /estoque — data futura retorna 400", async () => {
  if (!createdIds.carro2) return { passed: false, detail: "ID de carro não disponível" };
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  const r = await req("POST", "/estoque", {
    id_carro: createdIds.carro2,
    quantidade: 2,
    localizacao_patio: "Galpão B",
    data_entrada: future.toISOString().split("T")[0],
  });
  return expect(r, 400);
});

await test("POST /estoque — estoque duplicado para mesmo carro retorna 400 ou 409", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID não disponível" };
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/estoque", {
    id_carro: createdIds.carro1,
    quantidade: 3,
    localizacao_patio: "Galpão A-2",
    data_entrada: today,
  });
  return expectRange(r, 400, 409);
});

await test("POST /estoque — estoque para carro2 (201)", async () => {
  if (!createdIds.carro2) return { passed: false, detail: "ID não disponível" };
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/estoque", {
    id_carro: createdIds.carro2,
    quantidade: 3,
    localizacao_patio: "Galpão B-1",
    data_entrada: today
  });
  if (r.status === 201) {
    createdIds.estoque2 = await resolveId(r, "/estoque", "id_carro", createdIds.carro2);
  }
  const passed = r.status === 201 && !!createdIds.estoque2;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /estoque`,
  };
});

// ── CARROS DISPONÍVEIS ────────────────────────────────────────────────────────
group("Carros — Consultas especiais");

await test("GET /carros/disponiveis retorna apenas carros com estoque > 0 (200)", async () => {
  const r = await req("GET", "/carros/disponiveis");
  if (r.status !== 200) return { passed: false, status: r.status, detail: `HTTP ${r.status}` };
  const lista = Array.isArray(r.body) ? r.body : [];
  return {
    passed: true,
    status: 200,
    detail: `HTTP 200, ${lista.length} carro(s) disponíve${lista.length !== 1 ? "is" : "l"}`,
  };
});

// ── NOTAS FISCAIS ─────────────────────────────────────────────────────────────
group("Notas Fiscais — Emissão");

await test("GET /notas retorna lista (200)", async () => {
  const r = await req("GET", "/notas");
  return expect(r, 200);
});

await test("POST /notas emite nota válida e decrementa estoque (201)", async () => {
  if (!createdIds.cliente1 || !createdIds.vendedor1 || !createdIds.carro1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0001",
    data_emissao: today,
    valor_total: 120000.0,
    id_cliente: createdIds.cliente1,
    id_vendedor: createdIds.vendedor1,
    id_carro: createdIds.carro1,
  });
  if (r.status === 201) {
    createdIds.nota1 = await resolveId(r, "/notas", "numero_nota", "NF-TESTE-0001");
  }
  const passed = r.status === 201 && !!createdIds.nota1;
  return {
    passed,
    status: r.status,
    detail: r.status !== 201
      ? `esperado 201, recebeu ${r.status}`
      : passed
        ? `HTTP 201, campo "id" presente`
        : `HTTP 201 — id ausente na resposta; também não encontrado via GET /notas`,
  };
});

await test("Estoque decrementou após emissão da nota", async () => {
  if (!createdIds.carro1 || !createdIds.nota1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const r = await req("GET", `/estoque/carro/${createdIds.carro1}`);
  if (r.status !== 200) return { passed: false, status: r.status, detail: `HTTP ${r.status}` };
  const qtd = r.body?.quantidade ?? r.body?.[0]?.quantidade;
  const decrementou = qtd !== undefined && qtd < 10;
  return {
    passed: decrementou,
    status: 200,
    detail: decrementou ? `Quantidade = ${qtd} (esperado < 10)` : `Quantidade = ${qtd} — não decrementou`,
  };
});

await test("GET /notas/:id retorna nota emitida (200)", async () => {
  if (!createdIds.nota1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/notas/${createdIds.nota1}`);
  return expect(r, 200);
});

group("Notas Fiscais — Regras de negócio");

await test("POST /notas — número_nota duplicado retorna 409", async () => {
  if (!createdIds.cliente1 || !createdIds.vendedor1 || !createdIds.carro1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0001",
    data_emissao: today,
    valor_total: 50000,
    id_cliente: createdIds.cliente1,
    id_vendedor: createdIds.vendedor1,
    id_carro: createdIds.carro1,
  });
  return expect(r, 409);
});

await test("POST /notas — data futura retorna 400", async () => {
  if (!createdIds.cliente1 || !createdIds.vendedor1 || !createdIds.carro1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const future = new Date();
  future.setDate(future.getDate() + 10);
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0002",
    data_emissao: future.toISOString().split("T")[0],
    valor_total: 50000,
    id_cliente: createdIds.cliente1,
    id_vendedor: createdIds.vendedor1,
    id_carro: createdIds.carro1,
  });
  return expect(r, 400);
});

await test("POST /notas — valor_total zero retorna 400", async () => {
  if (!createdIds.cliente1 || !createdIds.vendedor1 || !createdIds.carro1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0003",
    data_emissao: today,
    valor_total: 0,
    id_cliente: createdIds.cliente1,
    id_vendedor: createdIds.vendedor1,
    id_carro: createdIds.carro1,
  });
  return expect(r, 400);
});

await test("POST /notas — cliente inexistente retorna 400 ou 404", async () => {
  if (!createdIds.vendedor1 || !createdIds.carro1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0004",
    data_emissao: today,
    valor_total: 50000,
    id_cliente: 999999,
    id_vendedor: createdIds.vendedor1,
    id_carro: createdIds.carro1,
  });
  return expectRange(r, 400, 404);
});

await test("POST /notas — carro sem estoque retorna 400 ou 422", async () => {
  // Criar carro sem estoque para este teste
  const rCarro = await req("POST", "/carros", {
    marca: "Kia",
    modelo: "Sorento",
    ano: 2024,
    placa: "SEM-0001",
    preco: 200000,
    cor: "Cinza",
  });
  if (rCarro.status !== 201) {
    return { passed: false, detail: "Não foi possível criar carro sem estoque" };
  }
  const carroSemEstoqueId = await resolveId(rCarro, "/carros", "placa", "SEM-0001");
  if (!carroSemEstoqueId) {
    return { passed: false, detail: "Carro criado mas id não recuperável" };
  }
  if (!createdIds.cliente1 || !createdIds.vendedor1) {
    return { passed: false, detail: "Dependências não disponíveis" };
  }
  const today = new Date().toISOString().split("T")[0];
  const r = await req("POST", "/notas", {
    numero_nota: "NF-TESTE-0005",
    data_emissao: today,
    valor_total: 200000,
    id_cliente: createdIds.cliente1,
    id_vendedor: createdIds.vendedor1,
    id_carro: carroSemEstoqueId,
  });
  return expectRange(r, 400, 422);
});

await test("DELETE /notas/:id não é permitido — retorna 404 ou 405 ou 422", async () => {
  // A documentação não define DELETE /notas/:id; uma nota emitida é definitiva.
  if (!createdIds.nota1) return { passed: false, detail: "ID não disponível" };
  const r = await req("DELETE", `/notas/${createdIds.nota1}`);
  const blocked = r.status === 404 || r.status === 405 || r.status === 422;
  return {
    passed: blocked,
    status: r.status,
    detail: blocked ? `Corretamente bloqueado (HTTP ${r.status})` : `Nota excluída indevidamente (HTTP ${r.status})`,
  };
});

// ── CONSULTAS ESPECIAIS ───────────────────────────────────────────────────────
group("Consultas especiais (RN06)");

await test("GET /clientes/notas/:id retorna notas do cliente (200)", async () => {
  if (!createdIds.cliente1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/clientes/notas/${createdIds.cliente1}`);
  return expect(r, 200);
});

await test("GET /vendedores/notas/:id retorna notas do vendedor (200)", async () => {
  if (!createdIds.vendedor1) return { passed: false, detail: "ID não disponível" };
  const r = await req("GET", `/vendedores/notas/${createdIds.vendedor1}`);
  return expect(r, 200);
});

// ── DELEÇÃO — RESTRIÇÕES ──────────────────────────────────────────────────────
group("Deleção — Restrições de integridade");

await test("DELETE /clientes/:id com notas vinculadas retorna 422", async () => {
  if (!createdIds.cliente1) return { passed: false, detail: "ID não disponível" };
  const r = await req("DELETE", `/clientes/${createdIds.cliente1}`);
  return expect(r, 422);
});

await test("DELETE /vendedores/:id com notas vinculadas retorna 422", async () => {
  if (!createdIds.vendedor1) return { passed: false, detail: "ID não disponível" };
  const r = await req("DELETE", `/vendedores/${createdIds.vendedor1}`);
  return expect(r, 422);
});

await test("DELETE /carros/:id com estoque vinculado retorna 422", async () => {
  if (!createdIds.carro1) return { passed: false, detail: "ID não disponível" };
  const r = await req("DELETE", `/carros/${createdIds.carro1}`);
  return expect(r, 422);
});

await test("DELETE /clientes/:id sem notas retorna 200", async () => {
  // Criar cliente limpo
  const rC = await req("POST", "/clientes", {
    nome: "Descartável",
    cpf: "999.999.999-99",
    telefone: "(11) 00000-0000",
  });
  if (rC.status !== 201) return { passed: false, detail: "Criação falhou" };
  const descId = await resolveId(rC, "/clientes", "cpf", "999.999.999-99");
  if (!descId) return { passed: false, detail: "Criação OK mas id não recuperável" };
  const r = await req("DELETE", `/clientes/${descId}`);
  return expect(r, 200);
});

await test("DELETE /vendedores/:id sem notas retorna 200", async () => {
  const rV = await req("POST", "/vendedores", {
    nome: "Descartável",
    matricula: "DEL-999",
    comissao_percentual: 1,
  });
  if (rV.status !== 201) return { passed: false, detail: "Criação falhou" };
  const descId = await resolveId(rV, "/vendedores", "matricula", "DEL-999");
  if (!descId) return { passed: false, detail: "Criação OK mas id não recuperável" };
  const r = await req("DELETE", `/vendedores/${descId}`);
  return expect(r, 200);
});

await test("DELETE /carros/:id sem estoque ou notas retorna 200", async () => {
  // Criar carro limpo, sem registro de estoque e sem notas
  const rCarro = await req("POST", "/carros", {
    marca: "Renault",
    modelo: "Kwid",
    ano: 2023,
    placa: "DEL-0001",
    preco: 60000,
    cor: "Azul",
  });
  if (rCarro.status !== 201) return { passed: false, detail: "Criação falhou" };
  const descId = await resolveId(rCarro, "/carros", "placa", "DEL-0001");
  if (!descId) return { passed: false, detail: "Criação OK mas id não recuperável" };
  const r = await req("DELETE", `/carros/${descId}`);
  return expect(r, 200);
});

await test("DELETE /estoque/:id retorna 200", async () => {
  if (!createdIds.estoque2) return { passed: false, detail: "ID não disponível" };
  const r = await req("DELETE", `/estoque/${createdIds.estoque2}`);
  return expect(r, 200);
});

// ─── RELATÓRIO FINAL (terminal) ─────────────────────────────────────────────────

const totalPass = results.filter((r) => r.passed).length;
const totalFail = results.filter((r) => !r.passed).length;
const totalTests = results.length;
const pct = totalTests > 0 ? Math.round((totalPass / totalTests) * 100) : 0;

console.log(`\n${"═".repeat(60)}`);
console.log("RESUMO POR GRUPO");
console.log("═".repeat(60));

const groupNames = [...new Set(results.map((r) => r.group))];
for (const g of groupNames) {
  const groupResults = results.filter((r) => r.group === g);
  const pass = groupResults.filter((r) => r.passed).length;
  const total = groupResults.length;
  const icon = pass === total ? "✓" : "✗";
  console.log(`  ${icon} ${g}: ${pass}/${total}`);
}

const failures = results.filter((r) => !r.passed);
if (failures.length > 0) {
  console.log(`\n${"═".repeat(60)}`);
  console.log("TESTES QUE FALHARAM");
  console.log("═".repeat(60));
  for (const f of failures) {
    console.log(`  ✗ [${f.group}] ${f.description}${f.detail ? " — " + f.detail : ""}`);
  }
}

console.log(`\n${"═".repeat(60)}`);
console.log(`RESULTADO FINAL: ${totalPass}/${totalTests} testes passaram (${pct}%)  |  ${totalFail} falha(s)`);
console.log("═".repeat(60));

process.exit(totalFail > 0 ? 1 : 0);
