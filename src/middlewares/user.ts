import type {Request, Response, NextFunction} from 'express';
import { User } from '../models/user.js';
import type { UserInterface } from '../types/user.js';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: UserInterface | undefined = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: No user information provided' });
        }

        const userFound = await User.findOne({email: user.email});
        if (!userFound) {
            return res.status(403).json({ message: 'Forbidden: User is not signed up' });
        }   

        next();
    } catch (err) {
        console.error('Error verifying user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
