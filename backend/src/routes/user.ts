import express from 'express';
import bcrypt from 'bcrypt';
import authMiddleware from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

router.use(authMiddleware);

// Rota para obter detalhes do usuário
router.get('/me', async (req, res) => {
  try {
    const userId = req.user.id;  // O `req.user` é definido pelo middleware de autenticação
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email']
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar detalhes do usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
  }
});

// Rota para trocar a senha do usuário
router.post('/change-password', async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    // Criptografa a nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Atualiza a senha no banco de dados
    user.password_hash = newPasswordHash;
    await user.save();

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error('Erro ao trocar a senha:', error);
    res.status(500).json({ error: 'Erro ao trocar a senha.' });
  }
});

// Nova rota para trocar o e-mail do usuário
router.post('/change-email', async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newEmail } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifique se a senha atual está correta
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha atual incorreta.' });
    }

    // Verifique se o novo e-mail já está em uso
    const emailExists = await User.findOne({ where: { email: newEmail } });
    if (emailExists) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    // Atualiza o e-mail no banco de dados
    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: 'E-mail alterado com sucesso.' });
  } catch (error) {
    console.error('Erro ao trocar o e-mail:', error);
    res.status(500).json({ error: 'Erro ao trocar o e-mail.' });
  }
});

export default router;
