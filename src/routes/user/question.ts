import type {Request, Response} from "express";
import {Questionarre} from "../../models/question.js"
import mongoose from "mongoose";
import { Response as ResponseModel} from "../../models/answer.js";
import { User } from "../../models/user.js";
import { submitResponseSchema } from "../../validation/user/question.js";

export const getQuestionnareByDomain = async (req: Request<{ domainId: string }>,res: Response) => {
  try {
    const { domainId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(domainId)) {
      return res.status(400).json({ message: "Invalid domain ID" });
    }

    const questionarre = await Questionarre.findOne({ domainId })
      .populate("mcqQuestions")
      .populate("textQuestions");

    if (!questionarre) {
      return res.status(404).json({
        message: "Questionnaire not found for this domain"
      });
    }

    if (questionarre.dueDate < new Date()) {
      return res.status(403).json({
        message: "Questionnaire due date is over"
      });
    }

    return res.status(200).json({
      message: "Questionnaire fetched successfully",
      data: questionarre
    });

  } catch (error) {
    console.error("Error fetching questionnaire:\n", error);
    return res.status(500).json({
      message: "Error while fetching questionnaire"
    });
  }
};


//Submit Response function not unit tested
export const submitResponse = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const validation = submitResponseSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid data provided",
        errors: validation.error,
      });
    }

    const { questionarreId, mcqAnswers, textAnswers } = validation.data;

    const questionarre = await Questionarre.findById(questionarreId);
    if (!questionarre) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    if (questionarre.dueDate < new Date()) {
      return res.status(403).json({ message: "Submission deadline has passed" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has applied for the domain associated with this questionnaire
    const hasApplied = user.selectedDomainIds.some((id: any) => 
      id.toString() === questionarre.domainId.toString()
    );

    if (!hasApplied) {
      return res.status(403).json({ 
        message: "You must apply for the domain before submitting responses" 
      });
    }

    const response = await ResponseModel.findOneAndUpdate(
      { userId: user._id, questionarreId },
      { mcqAnswers, textAnswers, submittedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Response submitted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error submitting response:\n", error);
    return res.status(500).json({ message: "Error while submitting response" });
  }
};
