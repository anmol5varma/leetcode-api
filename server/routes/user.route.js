import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.get('', UserController.getAllUsers);
router.get('/role', UserController.getRole);
router.post('/', UserController.addUser);
router.put('/password', UserController.updatePassword);
router.delete('/', UserController.deleteUser);

export default router;
