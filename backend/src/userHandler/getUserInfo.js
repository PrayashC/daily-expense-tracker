import { usersCollection } from '../db.js';

const getUser =  async (req, res) => {
  const { userId } = req.params;
    try {
      const users = await usersCollection.findOne({userId: userId})
      res.json({
        message: "User Information fetched successfully.",
        users
      });
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  };

export default getUser;