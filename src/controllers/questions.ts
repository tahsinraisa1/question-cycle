import { Request, Response } from "express";
import { getRunningCycleByRegion } from "../models/cycles";
import { ObjectId } from "mongoose";
import { getUserById } from "../models/users";
import { getQuestion } from "../models/questions";

export const getQuestions = async (req: Request, res: Response) => {
  const { regionId } = req.params as any;

  // Filter questions based on regionId and current date
  const currentCycle = await getRunningCycleByRegion(regionId);

  if (!currentCycle?.questionId) {
    res.status(404).send({ message: "No active cycle found." });
    return;
  }

  const filteredQuestions = await getQuestion(currentCycle?.questionId);

  if (!filteredQuestions) {
    res.status(404).send({ message: "No questions found for your region." });
    return;
  }

  res.status(200).send({ questions: filteredQuestions });
};

export const getQuestionsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params as any;

  const user = await getUserById(userId);
  if (!user) {
    res.status(401).send({ message: "User not found!" });
    return;
  }
   const currentCycle = await getRunningCycleByRegion(user.regionId);

   if (!currentCycle?.questionId) {
     res.status(404).send({ message: "No active cycle found." });
     return;
   }
 
   const filteredQuestions = await getQuestion(currentCycle?.questionId);

  if (!filteredQuestions) {
    res.status(404).send({ message: "No questions found for your region." });
    return;
  }

  res.status(200).send({ question: filteredQuestions });
};
