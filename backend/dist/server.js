"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const profile_1 = __importDefault(require("./routes/profile"));
const auth_1 = __importDefault(require("./routes/auth"));
const Alljobs_1 = __importDefault(require("./routes/Alljobs"));
const favoriteJobs_1 = __importDefault(require("./routes/favoriteJobs"));
const user_1 = __importDefault(require("./routes/user")); // Importa a rota de usuários
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
    res.send('Rota de teste funcionando!');
});
// Rotas principais
app.use('/api/profile', profile_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/allJobs', Alljobs_1.default);
app.use('/api/favoriteJobs', favoriteJobs_1.default);
app.use('/api/user', user_1.default); // Usa a rota de usuários
database_1.default.sync().then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000');
    });
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});
