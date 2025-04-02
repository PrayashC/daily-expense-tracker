import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI);

let usersCollection, expensesCollection;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('MongoDB connected!');
    usersCollection = client.db('daily-expense-tracker').collection('users');
    expensesCollection = client.db('daily-expense-tracker').collection('expenses');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export { connectToDatabase, usersCollection, expensesCollection };