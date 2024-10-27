import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import { assignQuestions } from "./crons/rotateCycle";
import mongoose from "mongoose";
import { getQuestions, getQuestionsForUser } from './controllers/questions';

dotenv.config();
const app = express();
const port = 3000;
mongoose
  .connect(process.env.MONGO_DB_URI as string)
  .then((res) => console.log("db connected"))
  .catch((err) => console.log("error connecting db, ", err));

assignQuestions();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, root route!");
});

app.get("/questions/region/:regionId", getQuestions);
app.get("/questions/user/:userId", getQuestionsForUser);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
