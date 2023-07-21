import mongoose from "mongoose";

export interface iAuth {
  userName?: string;
  email?: string;
  password?: string;
  post?: [];
}

interface iAuthData extends iAuth, mongoose.Document {}

const authModel = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    post: [
      { 
        type: mongoose.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<iAuthData>("users", authModel);
