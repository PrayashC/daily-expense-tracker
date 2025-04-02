import express from 'express';
import getUser from './userHandler/getUserInfo.js';
import Signup from './userHandler/userSignup.js';
import { SignupValidator } from './middlewares/userValidator.js';
import Login from './userHandler/userLogin.js';
import Delete from './userHandler/userDelete.js';
import Update from './userHandler/userUpdate.js';


const router = express.Router();

router.get('/', getUser);
router.post('/signup', SignupValidator, Signup);
router.get('/login', Login);
router.delete('/delete/:username', Delete);
router.put('/update/:username', Update);

export default router;

