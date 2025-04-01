import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; 
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.ATLAS_URI);

let usersCollection, expensesCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB connected!');
    usersCollection = client.db('daily-expense-tracker').collection('users');
    expensesCollection = client.db('daily-expense-tracker').collection('expenses');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.get('/', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
    console.log("getting...");
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/signup', [
  // Username validation
  body('username')
    .notEmpty().withMessage('Username is required')
    .custom(async (username) => {
      // Check if username already exists
      const userExists = await usersCollection.findOne({ username });
      if (userExists) {
        throw new Error('Username is already taken');
      }
      return true;
    }),

  // Password validation 1 digit, 1 uppercase, minimum 6 chars
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one digit')
  ], async (req, res) => {
  // Access the validation erros
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array() 
    });
  }
  
  try{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hasing Password
    const userId = uuidv4();
    await usersCollection.insertOne({_id: userId, username: username, password: hashedPassword}); // Inserting custom uid
    res.status(200).json({ message: 'User created successfully' });
  } catch(e) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
})


app.get('/login', async (req, res) => {
  try{
    const { username, password } = req.body;
    
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password); // Comparing Hashed password
    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Wrong password!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
})

app.delete('/delete/:username', [
  body('username').notEmpty().withMessage('Username is required')
], async (req, res) => {
  try{
    const { username } = req.params;
    await usersCollection.deleteOne({username: username})
    res.send(`User, ${username} deleted`)
  } catch(e) {
    res.status(500).json({ error: 'delete user failed' });
  }
})

app.put('/update/:username', [ 
  body('username').notEmpty().withMessage('Username is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one digit')
  ], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array() 
    });
  } 
  try {
    const { username } = req.params;
    const { newUsername, newPassword} = req.body; 

    const result = await usersCollection.updateOne(
      { username: username }, 
      { $set: { username: newUsername, password: newPassword } } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: `User ${username} updated successfully.` });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/addexpense/:uid', async (req, res) => {
  try{
    const { uid } = req.params;
    await expensesCollection.insertOne({_id: uid})
    res.send(`User, ${username} deleted`)
  } catch(e) {
    res.status(500).json({ error: 'delete user failed' });
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
