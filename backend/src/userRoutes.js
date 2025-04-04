import express from 'express';
import verifyToken from './middlewares/tokenVerification.js';
import getUser from './userHandler/getUserInfo.js';
import Signup from './userHandler/userSignup.js';
import { SignupValidator } from './middlewares/userValidator.js';
import Login from './userHandler/userLogin.js';
import Delete from './userHandler/userDelete.js';
import Update from './userHandler/userUpdate.js';
import { UpdateValidator } from './middlewares/userValidator.js';
import ExpenseDb from './userHandler/createExpenseDb.js';
import InsDate from './expenseHandler/insertDate.js';
import InsExpense from './expenseHandler/insertExpenses.js';
import DeleteExpense from './expenseHandler/deleteExpense.js';
import UpdateExpense from './expenseHandler/updateExpense.js';

const router = express.Router();

router.get('/', getUser);
router.post('/signup', SignupValidator, Signup);
router.post('/login', Login);
router.delete('/delete/:username', Delete);
router.put('/update/:username', UpdateValidator, Update);
router.post('/createdb', ExpenseDb);
router.post('/insertdate', InsDate);
router.post('/insertexpense', InsExpense);
router.delete('/deleteexpense/:expend', DeleteExpense);
router.patch('/updateexpense/:userId/:date/:expend', UpdateExpense);

export default router;

