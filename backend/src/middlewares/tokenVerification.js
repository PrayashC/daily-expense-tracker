import jwt from 'jsonwebtoken';
import { jwtSecret } from '../db.js';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: 'Authorization header missing' 
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export default verifyToken;