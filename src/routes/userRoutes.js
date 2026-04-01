import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { validateCreateUser, validateUpdateUser } from '../middlewares/validateUser.js';

const router = Router();

router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.listUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
