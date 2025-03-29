import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.ATLAS_URI);

let usersCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('MongoDB connected!');
    usersCollection = client.db('daily-expense-tracker').collection('users');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.get('/', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
    console.log(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/signup', async (req, res) => {
  try{
    const { data } = req.body;
    await usersCollection.insertOne(data);
    res.status(200).json({ message: 'Form data received successfully' });
  } catch(e) {
    res.status(500).json({ error: 'upload data failed' });
  }
})

// app.delete('/delete', async (req, res) => {
//   try{
//     const { username } = req.body;
//     await usersCollection.deleteOne({username: username})
//     res.send("DELETE Request Called,", `${username}`, "deleted")
//   } catch(e) {
//     res.status(500).json({ error: 'delete data failed' });
//   }
// })
      

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
