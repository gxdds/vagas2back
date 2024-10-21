"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Alljobs_1 = __importDefault(require("../models/Alljobs"));
const router = express_1.default.Router();
// Rota para buscar todas as vagas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Alljobs_1.default.findAll();
        res.json(jobs);
    }
    catch (err) {
        console.error('Erro ao buscar vagas:', err);
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
}));
// Rota para contar o número de vagas
router.get('/count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Alljobs_1.default.count();
        res.json({ count });
    }
    catch (err) {
        console.error('Erro ao contar vagas:', err);
        res.status(500).json({ error: 'Erro ao contar vagas' });
    }
}));
exports.default = router;
