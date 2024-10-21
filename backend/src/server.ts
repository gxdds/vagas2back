// src/server.ts

import express from 'express';
import cors from 'cors';
import sequelize from './database';
import profileRoutes from './routes/profile';
import authRoutes from './routes/auth';
import allJobsRoutes from './routes/Alljobs';
import favoriteJobsRoutes from './routes/favoriteJobs';
import userRoutes from './routes/user'; // Importa a rota de usuários
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste para verificar se o servidor está funcionando
app.get('/test', (req, res) => {
  res.send('Rota de teste funcionando!');
});

// Rotas principais
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/allJobs', allJobsRoutes);
app.use('/api/favoriteJobs', favoriteJobsRoutes);
app.use('/api/user', userRoutes); // Usa a rota de usuários

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado.');
  app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
  });
}).catch((err) => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});
