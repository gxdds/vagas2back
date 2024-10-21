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
// backend/src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Rota de Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Verifique se o usuário existe
    const user = yield User_1.default.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    // Verifique se a senha está correta
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    // Gere o token JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    // Envie o token para o frontend
    res.json({ token });
}));
// Rota de Registro
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Verifique se o usuário já existe
        const userExists = yield User_1.default.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'E-mail já está em uso.' });
        }
        // Criptografa a senha
        const password_hash = yield bcrypt_1.default.hash(password, 10);
        // Cria o usuário
        const user = yield User_1.default.create({ username, email, password_hash });
        // Gere o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // Envie o token para o frontend
        res.status(201).json({ token });
    }
    catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
}));
exports.default = router;
