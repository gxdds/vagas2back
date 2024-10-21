import express from 'express';
import authMiddleware from '../middleware/auth';
import Profile from '../models/profile';

const router = express.Router();

router.use(authMiddleware); // Garante que o usuário está autenticado

// Rota para salvar o perfil do usuário
router.post('/', async (req, res) => {
  const userId = req.user?.id; // O ID do usuário autenticado
  const { name, what_to_look_for, stacks, work_preference } = req.body;

  try {
    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      // Se o perfil já existe, atualiza os campos
      profile = await profile.update({
        name,
        what_to_look_for,
        stacks,
        work_preference,
      });
    } else {
      // Se o perfil não existe, cria um novo
      profile = await Profile.create({
        userId,
        name,
        what_to_look_for,
        stacks,
        work_preference,
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err); // Loga o erro para depuração
    res.status(500).json({ error: 'Erro ao salvar perfil do usuário' });
  }
});

// Rota para buscar o perfil do usuário
router.get('/', async (req, res) => {
  const userId = req.user?.id; // O ID do usuário autenticado

  try {
    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    res.json(profile); // Retorna o perfil encontrado
  } catch (err) {
    console.error(err); // Loga o erro para depuração
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
  }
});

export default router;
