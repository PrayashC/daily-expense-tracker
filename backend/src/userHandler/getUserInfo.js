import { usersCollection } from '../db.js';

const getUser =  async (req, res) => {
    try {
      const users = await usersCollection.find({}).toArray();
      res.json(users);
      console.log("getting...");
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };

export default getUser;