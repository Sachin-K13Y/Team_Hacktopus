import express from 'express'
import { Login, Register, Logout} from '../Controllers/user.controller.js';
 import { authenticateUser, hasToken } from '../Utils/verifyToken.js';

const userRoutes = express.Router();

userRoutes.post('/sign-up', Register);
userRoutes.post('/sign-in', Login);
userRoutes.post('/test', hasToken, (req, res) => {
  res.json({ message: 'Token is valid' });
});
userRoutes.post('/logout', Logout);
//  userRoutes.get('/profile', authenticateUser, Userprofile);

export default userRoutes;
