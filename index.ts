import express, { Application } from "express";
import dotenv from "dotenv";
import { mainApp } from "./mainApp";
import { db } from "./config/db";
dotenv.config();

const readPort = process.env.MY_PORT;
const port: number = parseInt(readPort!);

const app: Application = express();

mainApp(app);
const server = app.listen(process.env.PORT || port, () => {
  db();
});

process.on("uncaughtException", (error: Error) => {
  console.log("Shutting down server because of uncaughtException Error");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Shutting down server because of unhandledRejection Error");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
