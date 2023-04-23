import { Router } from 'express';
import { newUserControllers } from '../controllers/newUsers.controllers';
import { validationEmailExist } from '../middlewares/validationEmail.middleware';
import { loginControllers } from '../controllers/login.controllers';
import { getUserByIdControllers } from '../controllers/getUserByToken.controllers';
import { validationTokenMiddleware } from '../middlewares/validationToken.middleware';
import { getAllUsersControllers } from '../controllers/getAllUsers.controllers';
import { updateUserControllers } from '../controllers/updateUser.controllers';
import { deleteUserControllers } from '../controllers/deleteUser.controllers';
import { verifyUserExist } from '../middlewares/verifyUserExist.middleware';
import { activeUserControllers } from '../controllers/activeUser.controllers';
import { verifyActiveUser } from '../middlewares/varifyActiveUser.middleware';

export const userRouter = Router();

export const loginRouter = Router();

userRouter.post('', validationEmailExist, newUserControllers);
loginRouter.post('', loginControllers);
userRouter.get('', validationTokenMiddleware, getAllUsersControllers);
userRouter.get('/profile', validationTokenMiddleware, getUserByIdControllers);
userRouter.patch(
  '/:id',
  validationTokenMiddleware,
  verifyUserExist,
  verifyActiveUser,
  updateUserControllers
);
userRouter.delete(
  '/:id',
  validationTokenMiddleware,
  verifyUserExist,
  verifyActiveUser,
  deleteUserControllers
);
userRouter.put(
  '/:id/recover',
  validationTokenMiddleware,
  verifyUserExist,
  verifyActiveUser,
  activeUserControllers
);
