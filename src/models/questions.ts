import mongoose, { ObjectId, Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  regionId: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  isAssigned: { type: Boolean },
  answers: {
    type: [String],
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export const getQuestionsByRegion = async (regionId: ObjectId) => {
  try {
    const questions = await Question.find({ regionId });
    return questions;
  } catch (error) {
    console.error("Error retrieving Questions:", error);
  }
};

export const getUnassignedQuestionsByRegion = async (regionId: ObjectId) => {
  try {
    const questions = await Question.findOne({
      regionId,
      isAssigned: { $ne: true },
    });
    return questions;
  } catch (error) {
    console.error("Error retrieving Questions:", error);
  }
};

export const getQuestion = async (id: ObjectId) => {
  try {
    const question = await Question.findById({
      _id: id,
    });
    return question;
  } catch (error) {
    console.error("Error retrieving Questions:", error);
  }
};
