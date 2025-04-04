import jwt from 'jsonwebtoken';
import { jwtSecret } from '../db.js';

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });
  
    jwt.verify(token.split(" ")[1], jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = decoded;
      next();
    });
};

export default verifyToken;