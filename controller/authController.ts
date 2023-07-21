import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary";

export const createUser = async (
  req: any,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file?.path!,
    );

    const user = await authModel.create({
      email,
      password: hash,
      userName,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(201).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create user",
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await authModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user?.password!);

      if (checkPassword!) {
        return res.status(201).json({
          message: "user created",
          data: user._id,
        });
      } else {
        return res.status(404).json({
          message: "User's password is not correct'",
        });
      }
    } else {
      return res.status(404).json({
        message: "User doesn't exit",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create user",
    });
  }
};



export const updateOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userName } = req.body;
    const { userID } = req.params;
    const user = await authModel.findByIdAndUpdate(
      userID,
      {
        userName,
      },
      { new: true },
    );

    return res.status(201).json({
      message: "update user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to update user",
    });
  }
};

export const ViewOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);

    return res.status(200).json({
      message: "view user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to view user",
    });
  }
};

export const deleteOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user = await authModel.findByIdAndDelete(userID);

    return res.status(201).json({
      message: "user deleted",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to delete user",
    });
  }
};
