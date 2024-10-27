import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastCycle: { type: Number },
});

const Region = mongoose.model("Region", regionSchema);

export const getAllRegions = async () => {
  try {
    const regions = await Region.find({});
    return regions;
  } catch (error) {
    console.error("Error retrieving regions:", error);
  }
};
