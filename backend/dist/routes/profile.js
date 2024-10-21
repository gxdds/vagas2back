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
const auth_1 = __importDefault(require("../middleware/auth"));
const profile_1 = __importDefault(require("../models/profile"));
const router = express_1.default.Router();
router.use(auth_1.default); // Garante que o usuário está autenticado
// Rota para salvar o perfil do usuário
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // O ID do usuário autenticado
    const { name, what_to_look_for, stacks, work_preference } = req.body;
    try {
        let profile = yield profile_1.default.findOne({ where: { userId } });
        if (profile) {
            // Se o perfil já existe, atualiza os campos
            profile = yield profile.update({
                name,
                what_to_look_for,
                stacks,
                work_preference,
            });
        }
        else {
            // Se o perfil não existe, cria um novo
            profile = yield profile_1.default.create({
                userId,
                name,
                what_to_look_for,
                stacks,
                work_preference,
            });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err); // Loga o erro para depuração
        res.status(500).json({ error: 'Erro ao salvar perfil do usuário' });
    }
}));
// Rota para buscar o perfil do usuário
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // O ID do usuário autenticado
    try {
        const profile = yield profile_1.default.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ error: 'Perfil não encontrado.' });
        }
        res.json(profile); // Retorna o perfil encontrado
    }
    catch (err) {
        console.error(err); // Loga o erro para depuração
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
    }
}));
exports.default = router;
