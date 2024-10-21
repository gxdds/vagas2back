import express from 'express';
import authMiddleware from '../middleware/auth'; // Middleware de autenticação
import FavoriteJob from '../models/favoriteJobs';
import AllJobs from '../models/Alljobs';

const router = express.Router();

// Aplica o middleware de autenticação
router.use(authMiddleware);

router.post('/', async (req, res) => {
  const userId = req.user?.id;
  const { job_id } = req.body;

  try {
    const favoriteJob = await FavoriteJob.findOne({ where: { user_id: userId, job_id } });

    if (favoriteJob) {
      await favoriteJob.destroy(); // Remove dos favoritos se já existe
      return res.json({ message: 'Vaga removida dos favoritos' });
    } else {
      await FavoriteJob.create({ user_id: userId, job_id });
      return res.json({ message: 'Vaga favoritada' });
    }
  } catch (error) {
    console.error('Erro ao favoritar/desfavoritar a vaga:', error);
    return res.status(500).json({ error: 'Erro ao favoritar/desfavoritar a vaga' });
  }
});

// Rota para listar as vagas favoritas do usuário
router.get('/', async (req, res) => {
  const userId = req.user?.id;

  try {
    const favoriteJobs = await FavoriteJob.findAll({
      where: { user_id: userId },
      include: [{ model: AllJobs, as: 'AllJob' }],
    });

    // Definindo o tipo corretamente para fav
    res.json(favoriteJobs.map(fav => fav.AllJob));
  } catch (error) {
    console.error('Erro ao buscar vagas favoritas:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas favoritas' });
  }
});

export default router;
