import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

function omitSenha(user) {
  const { senha, ...rest } = user;
  return rest;
}

export async function createUser({ nome, email, senha }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const conflict = new Error('Email already in use');
    conflict.code = 'EMAIL_CONFLICT';
    throw conflict;
  }

  const hashedSenha = await bcrypt.hash(senha, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      nome,
      email,
      senha: hashedSenha,
    },
  });

  return omitSenha(user);
}

export async function listUsers() {
  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'asc' },
  });

  return users.map(omitSenha);
}

export async function getUserById(id) {
  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });

  if (!user) {
    const notFound = new Error('User not found');
    notFound.code = 'NOT_FOUND';
    throw notFound;
  }

  return omitSenha(user);
}

export async function updateUser(id, data) {
  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });

  if (!user) {
    const notFound = new Error('User not found');
    notFound.code = 'NOT_FOUND';
    throw notFound;
  }

  if (data.email && data.email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      const conflict = new Error('Email already in use');
      conflict.code = 'EMAIL_CONFLICT';
      throw conflict;
    }
  }

  const updateData = { ...data };

  if (data.senha) {
    updateData.senha = await bcrypt.hash(data.senha, SALT_ROUNDS);
  }

  const updated = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return omitSenha(updated);
}

export async function deleteUser(id) {
  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });

  if (!user) {
    const notFound = new Error('User not found');
    notFound.code = 'NOT_FOUND';
    throw notFound;
  }

  const deleted = await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return omitSenha(deleted);
}
