import mongoose from "mongoose";

interface iPost {
  email:string;
  userName:string
  phoneNumber:number;
  review: string;
}

interface iPostData extends iPost, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    userName: {
      type: String,
    },
    review: {
      type: String,
    },
   
   user: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iPostData>("posts", userModel);
