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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = __importDefault(require("../middleware/auth"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.use(auth_1.default);
// Rota para obter detalhes do usuário
router.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // O `req.user` é definido pelo middleware de autenticação
        const user = yield User_1.default.findByPk(userId, {
            attributes: ['username', 'email']
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
    }
}));
// Rota para trocar a senha do usuário
router.post('/change-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        // Verifique se a senha atual está correta
        const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha atual incorreta.' });
        }
        // Criptografa a nova senha
        const newPasswordHash = yield bcrypt_1.default.hash(newPassword, 10);
        // Atualiza a senha no banco de dados
        user.password_hash = newPasswordHash;
        yield user.save();
        res.status(200).json({ message: 'Senha alterada com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao trocar a senha:', error);
        res.status(500).json({ error: 'Erro ao trocar a senha.' });
    }
}));
// Nova rota para trocar o e-mail do usuário
router.post('/change-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { currentPassword, newEmail } = req.body;
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        // Verifique se a senha atual está correta
        const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha atual incorreta.' });
        }
        // Verifique se o novo e-mail já está em uso
        const emailExists = yield User_1.default.findOne({ where: { email: newEmail } });
        if (emailExists) {
            return res.status(400).json({ error: 'E-mail já está em uso.' });
        }
        // Atualiza o e-mail no banco de dados
        user.email = newEmail;
        yield user.save();
        res.status(200).json({ message: 'E-mail alterado com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao trocar o e-mail:', error);
        res.status(500).json({ error: 'Erro ao trocar o e-mail.' });
    }
}));
exports.default = router;
