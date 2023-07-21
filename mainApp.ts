import express, { Application } from "express";
import cors from "cors";
import auth from "./router/authRouter";
import post from "./router/postRouter";
// import comment from "./router/commentRouter";

export const mainApp = (app: Application) => {
  app
    .use(cors())
    .use(express.json())

    .use("/api/v1/auth", auth)
    .use("/api/v1/post", post)
    // .use("/api/v1/comment", comment);
};
