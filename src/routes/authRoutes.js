

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser,
);
router.post(
  '/auth/login',
  celebrate({ body: loginUserSchema }),
  loginUser,
);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);

export default router;



// import { Router } from 'express';
// import { celebrate } from 'celebrate';
// import { registerUser, loginUser, refreshUserSession, logoutUser,} from '../controllers/authController.js';
// import {
//   registerUserSchema,
//   loginUserSchema,
// } from '../validations/authValidation.js';
// console.log('registerUserSchema:', registerUserSchema);
// console.log('typeof:', typeof registerUserSchema);
// console.log('isJoi:', registerUserSchema && registerUserSchema.type);
// const router = Router();

// router.post('/auth/register', celebrate(registerUserSchema), registerUser);
// router.post('/auth/login', celebrate(loginUserSchema), loginUser);
// router.post('/auth/refresh', refreshUserSession);
// router.post('/auth/logout', logoutUser);

// export default router;
