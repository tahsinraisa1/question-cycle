import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { CycleData } from "../types/models";

interface Cycle extends Document {
  regionId: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  questionId: Schema.Types.ObjectId;
  cycleNumber: Number;
}

const cycleSchema = new mongoose.Schema<Cycle>({
  cycleNumber: { type: Number, required: true },
  regionId: {
    type: Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Cycle = mongoose.model<Cycle>("Cycle", cycleSchema);

export const createCycle = async ({
  cycleNumber,
  regionId,
  questionId,
  startDate,
  endDate,
}: CycleData) => {
  try {
    const cycle = await Cycle.create({
      cycleNumber,
      regionId,
      questionId,
      startDate,
      endDate,
    });
    return cycle;
  } catch (error) {
    console.error("Error creating cycle:", error);
  }
};

export const getRunningCycleByRegion = async (
  regionId: ObjectId
): Promise<Cycle | null | undefined> => {
  try {
    console.log(regionId);
    const currentDate = new Date().toISOString();
    const cycle = await Cycle.findOne({
      regionId,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });
    return cycle;
  } catch (error) {
    console.error("Error fetching cycle:", error);
  }
};
