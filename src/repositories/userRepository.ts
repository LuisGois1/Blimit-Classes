import { User } from '../models/User';
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../data/users.json');

function readUsers(): User[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export function getAllUsers(includeDeleted: boolean): User[] {
  const users = readUsers();
  return includeDeleted ? users : users.filter(u => u.deletedAt === null);
}

export function findUserById(id: number): User | undefined {
  return readUsers().find(user => user.id === id);
}

export function findUserByEmail(email: string): User | undefined {
  return readUsers().find(user => user.email === email && user.deletedAt === null);
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const users = readUsers();
  const id = users.length ? users[users.length - 1].id + 1 : 1;

  const newUser: User = {
    ...user,
    id
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function updateUser(id: number, data: Partial<User>): User | null {
  const users = readUsers();
  const index = users.findIndex(u => u.id === id && u.deletedAt === null);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  writeUsers(users);
  return users[index];
}

export function softDeleteUser(id: number): User | null {
  const users = readUsers();
  const index = users.findIndex(u => u.id === id && u.deletedAt === null);
  if (index === -1) return null;

  users[index].deletedAt = new Date();
  writeUsers(users);
  return users[index];
}
