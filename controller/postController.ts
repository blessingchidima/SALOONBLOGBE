import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import postModel from "../model/userModel";
import authModel from "../model/authModel";
import mongoose from "mongoose";

export const createPost = async (
  req: any,
  res: Response,
): Promise<Response> => {
  try {
    const { authID } = req.params;
    const { title, content, category } = req.body;

    const user: any = await authModel.findById(authID);

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path!,
    );

    const post: any = await postModel.create({
      title,
      content,
      category,
      image: secure_url,
      imageID: public_id,
      user: user,
    });

    user?.post?.push(new mongoose.Types.ObjectId(post._id!));
    user?.save();

    return res.status(201).json({
      message: "post created",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create post",
    });
  }
};

export const readPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const post = await postModel.find();

    return res.status(200).json({
      message: "read Post",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};

export const readOnePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { postID } = req.params;
    const post = await postModel.findById(postID);

    return res.status(200).json({
      message: "read Post",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};

export const readUserPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { authID } = req.params;
    const post = await authModel.findById(authID).populate({
      path: "post",
      options: {
        sort: {
          createAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "read Post",
      data: post?.post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};

export const UpdateOnePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { title, content } = req.body;
    const { postID } = req.params;
    const post = await postModel.findByIdAndUpdate(
      postID,
      { title, content },
      { new: true },
    );

    return res.status(201).json({
      message: "read Post",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { authID, postID } = req.params;

    const auth: any = await authModel.findById(authID);
    const post: any = await postModel.findById(postID);

    if (auth) {
      post?.likes?.push(new mongoose.Types.ObjectId(auth._id!));
      post?.save();

      return res.status(201).json({
        message: "post",
        length: post,
        data: post,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to  Posts",
    });
  }
};




export const deleteOnePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { postID } = req.params;
    const post = await postModel.findByIdAndDelete(postID);

    return res.status(201).json({
      message: "read Post",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};
