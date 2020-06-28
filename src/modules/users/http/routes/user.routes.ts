import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router
  .get('/:id', userController.show)
  .get('/', userController.index)
  .post('/', userController.create)
  .put('/', userController.update)
  .delete('/', userController.delete);

export default router;
