import type {Request, Response} from "express";

export const getInterviews = async (req: Request, res: Response) => {
    res.status(501).json({message: "Not implemented"});
}