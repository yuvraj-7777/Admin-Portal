

import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: No Bearer token provided" });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

      
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        
        
        const user = await UserModel.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized: User is not an admin" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("isAdmin middleware error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default isAdmin;
