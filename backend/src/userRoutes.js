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
import GetExpense from './expenseHandler/getExpense.js';

const router = express.Router();

router.get('/userInfo/:userId',verifyToken, getUser);
router.get('/check-auth', verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});


router.post('/signup', SignupValidator, Signup);
router.post('/login', Login);
router.delete('/delete/:username', Delete);
router.put('/update/:userId', UpdateValidator, Update);
router.post('/createdb', ExpenseDb);
router.post('/insertdate', InsDate);
router.post('/insertexpense', InsExpense);
router.delete('/deleteexpense/:expend', DeleteExpense);
router.patch('/updateexpense/:userId/:date/:expend', UpdateExpense);
router.get('/getexpense/:userId/:date', GetExpense)

export default router;

