import { usersCollection } from '../db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; 

const Signup = async (req, res) => {
        try{
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hasing Password
      const userId = uuidv4();
      await usersCollection.insertOne({_id: userId, username: username, password: hashedPassword}); // Inserting custom uid
      res.status(200).json({ message: 'User created successfully' });
    } catch(e) {
      res.status(500).json({ message: 'Error creating user', error: err });
    }
}

export default Signup;