import { usersCollection } from '../db.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; 

const Signup = async (req, res) => {
    try{
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hasing Password
      const userId = uuidv4();

      await usersCollection.insertOne({_id: userId, username: username, password: hashedPassword}); // Inserting custom uid
      res.status(200).json({success: true, message: 'User created successfully' });
    } catch(err) {
      console.error('Signup Error:', err);
      res.status(500).json({success: false, message: 'Error creating user', error: err.message });
    }
}

export default Signup;