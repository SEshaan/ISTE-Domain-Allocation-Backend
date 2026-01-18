import dotenv from 'dotenv';
import type {Request, Response, NextFunction} from 'express';
dotenv.config();

const APP_API_KEY = process.env.APP_API_KEY;

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== APP_API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
} 