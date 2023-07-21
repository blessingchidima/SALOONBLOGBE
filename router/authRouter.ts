import express, { Router } from "express";
import {
  ViewOneUser,
  createUser,
  deleteOneUser,
  signInUser,
  updateOneUser,

} from "../controller/authController";
import { upload } from "../config/multer";

const router: Router = express.Router();

router.route("/sign-in").post(signInUser);
router.route("/register").post(upload, createUser);

router.route("/:userID/user-detail").get(ViewOneUser);
router.route("/:userID/update-user").patch(updateOneUser);
router.route("/:userID/delete-user").delete(deleteOneUser);

export default router;
