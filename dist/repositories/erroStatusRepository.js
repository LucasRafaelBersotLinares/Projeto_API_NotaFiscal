"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroStatusRepository = void 0;
const erroStatus_1 = require("../models/erroStatus");
class ErroStatusRepository {
    static instance;
    erroStatusList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ErroStatusRepository();
        }
        return this.instance;
    }
    insereErro(status) {
        const newStatus = new erroStatus_1.ErroStatus(status);
        this.erroStatusList[0] = newStatus;
    }
    mostraErro() {
        return this.erroStatusList[0].status;
    }
}
exports.ErroStatusRepository = ErroStatusRepository;
//# sourceMappingURL=erroStatusRepository.js.map