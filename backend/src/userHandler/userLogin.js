import { usersCollection, jwtSecret } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Login = async (req, res) => {
  try{
    const { username, password } = req.body;
    const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: "1h" });
    
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password); // Comparing Hashed password
    if (match) {
      res.status(200).json({ 
        success: true,
        message: 'Login successful',
        user: { id: user._id, username: username }});
        token;
    } else {
      res.status(400).json({ success: false, message: 'Wrong password!' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in', error: err });
  }
}

export default Login;