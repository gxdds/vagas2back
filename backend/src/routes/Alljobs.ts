import express from 'express';
import AllJobs from '../models/Alljobs';

const router = express.Router();

// Rota para buscar todas as vagas
router.get('/', async (req, res) => {
  try {
    const jobs = await AllJobs.findAll();
    res.json(jobs);
  } catch (err) {
    console.error('Erro ao buscar vagas:', err);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

// Rota para contar o número de vagas
router.get('/count', async (req, res) => {
  try {
    const count = await AllJobs.count();
    res.json({ count });
  } catch (err) {
    console.error('Erro ao contar vagas:', err);
    res.status(500).json({ error: 'Erro ao contar vagas' });
  }
});

export default router;
