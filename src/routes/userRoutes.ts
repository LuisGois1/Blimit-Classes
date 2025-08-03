import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  getAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  softDeleteUser
} from '../repositories/userRepository';
import { authMiddleware } from '../middleware/authMiddleware';


dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const router = Router();


router.post('/users', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    deletedAt: null
  });

  res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
});


router.get('/users', (req: Request, res: Response) => {
  const includeDeleted = req.query.includeDeleted === 'true';
  const users = getAllUsers(includeDeleted);
  res.json(users);
});


router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = findUserById(id);
  if (!user || user.deletedAt) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.json(user);
});


router.put('/users/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;

  let updatedData: any = { name, email };
  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  const updated = updateUser(id, updatedData);
  if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });

  res.json({ message: 'Usuário atualizado com sucesso', user: updated });
});


router.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = softDeleteUser(id);
  if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });

  res.json({ message: 'Usuário deletado com sucesso', user: deleted });
});


router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user || user.deletedAt) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY as jwt.Secret,
    { expiresIn: EXPIRES_IN } as SignOptions
  );

  res.json({ message: 'Login bem-sucedido', token });
});


router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Perfil acessado com sucesso', user: (req as any).user });
});

export default router;
