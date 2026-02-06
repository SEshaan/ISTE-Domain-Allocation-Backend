import type {UserInterface} from '../types/user.js';

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
        }
    }
}

export {};