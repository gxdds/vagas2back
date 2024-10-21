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
// backend/src/routes/userdata.ts
const express_1 = __importDefault(require("express"));
const userData_1 = __importDefault(require("../models/userData"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Criar dados específicos do usuário
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, data } = req.body;
    try {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        const userData = yield userData_1.default.create({ userId, data });
        res.json(userData);
    }
    catch (err) {
        res.status(400).json({ error: 'Erro ao criar dados para o usuário.' });
    }
}));
// Obter todos os dados específicos de um usuário
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userData = yield userData_1.default.findAll({ where: { userId } });
        res.json(userData);
    }
    catch (err) {
        res.status(400).json({ error: 'Erro ao buscar dados do usuário.' });
    }
}));
exports.default = router;
