// backend/src/routes/auth.ts
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verifique se o usuário existe
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Verifique se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Gere o token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  // Envie o token para o frontend
  res.json({ token });
});

// Rota de Registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifique se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    // Criptografa a senha
    const password_hash = await bcrypt.hash(password, 10);

    // Cria o usuário
    const user = await User.create({ username, email, password_hash });

    // Gere o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // Envie o token para o frontend
    res.status(201).json({ token });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});


export default router;
