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
const auth_1 = __importDefault(require("../middleware/auth")); // Middleware de autenticação
const favoriteJobs_1 = __importDefault(require("../models/favoriteJobs"));
const Alljobs_1 = __importDefault(require("../models/Alljobs"));
const router = express_1.default.Router();
// Aplica o middleware de autenticação
router.use(auth_1.default);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { job_id } = req.body;
    try {
        const favoriteJob = yield favoriteJobs_1.default.findOne({ where: { user_id: userId, job_id } });
        if (favoriteJob) {
            yield favoriteJob.destroy(); // Remove dos favoritos se já existe
            return res.json({ message: 'Vaga removida dos favoritos' });
        }
        else {
            yield favoriteJobs_1.default.create({ user_id: userId, job_id });
            return res.json({ message: 'Vaga favoritada' });
        }
    }
    catch (error) {
        console.error('Erro ao favoritar/desfavoritar a vaga:', error);
        return res.status(500).json({ error: 'Erro ao favoritar/desfavoritar a vaga' });
    }
}));
// Rota para listar as vagas favoritas do usuário
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const favoriteJobs = yield favoriteJobs_1.default.findAll({
            where: { user_id: userId },
            include: [{ model: Alljobs_1.default, as: 'AllJob' }],
        });
        // Definindo o tipo corretamente para fav
        res.json(favoriteJobs.map(fav => fav.AllJob));
    }
    catch (error) {
        console.error('Erro ao buscar vagas favoritas:', error);
        res.status(500).json({ error: 'Erro ao buscar vagas favoritas' });
    }
}));
exports.default = router;
