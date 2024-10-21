// backend/src/routes/userdata.ts
import express from 'express';
import UserData from '../models/userData';
import User from '../models/User';

const router = express.Router();

// Criar dados específicos do usuário
router.post('/create', async (req, res) => {
  const { userId, data } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const userData = await UserData.create({ userId, data });
    res.json(userData);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar dados para o usuário.' });
  }
});

// Obter todos os dados específicos de um usuário
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await UserData.findAll({ where: { userId } });
    res.json(userData);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao buscar dados do usuário.' });
  }
});

export default router;
