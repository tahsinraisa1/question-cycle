import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface User extends Document {
  username: string;
  regionId: ObjectId;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  regionId: { type: Schema.Types.ObjectId, required: true },
});

const User = mongoose.model<User>("User", userSchema);

export const getUserById = async (
  id: ObjectId
): Promise<User | null | undefined> => {
  try {
    console.log(id);
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    console.error("Error retrieving regions:", error);
  }
};
