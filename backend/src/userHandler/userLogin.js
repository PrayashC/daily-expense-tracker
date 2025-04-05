import { usersCollection, jwtSecret } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    const user = await usersCollection.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wrong password!' 
      });
    }

    
    const token = jwt.sign(
      { 
        userId: user._id.toString(), 
        username: user.username 
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    
    res.status(200).json({ 
      success: true,
      message: 'Login successful',
      token, 
      user: { 
        id: user._id, 
        username: user.username 
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in',
      error: err.message 
    });
  }
};

export default Login;