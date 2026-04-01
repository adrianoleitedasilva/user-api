import { z } from 'zod';

const createUserSchema = z.object({
  nome: z
    .string({ required_error: 'nome is required' })
    .min(3, 'nome must be at least 3 characters'),
  email: z
    .string({ required_error: 'email is required' })
    .email('email must be a valid email address'),
  senha: z
    .string({ required_error: 'senha is required' })
    .min(8, 'senha must be at least 8 characters'),
});

const updateUserSchema = z
  .object({
    nome: z.string().min(3, 'nome must be at least 3 characters').optional(),
    email: z.string().email('email must be a valid email address').optional(),
    senha: z.string().min(8, 'senha must be at least 8 characters').optional(),
    status: z.enum(['ativo', 'inativo'], { message: 'status must be "ativo" or "inativo"' }).optional(),
  })
  .strict();

export function validateCreateUser(req, res, next) {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  req.body = result.data;
  next();
}

export function validateUpdateUser(req, res, next) {
  const result = updateUserSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  req.body = result.data;
  next();
}
