import type {Request, Response} from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    res.status(501).json({message: "Not implemented"});
}

export const getUser = async (req: Request, res: Response) => {
    res.status(501).json({message: "Not implemented"});
}

export const getUserByDomain = async (req: Request, res: Response) => {
    res.status(501).json({message: "Not implemented"});
}