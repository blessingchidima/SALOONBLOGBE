import express, { Router } from "express";
import {
  UpdateOnePost,
  createPost,
  deleteOnePost,
  readOnePost,
  readPost,
  readUserPost,
 
  
} from "../controller/postController";
import { upload } from "../config/multer";

const router: Router = express.Router();

router.route("/:authID/create").post(upload, createPost);
router.route("/posts").get(readPost);
router.route("/:postID/post-detail").get(readOnePost);
router.route("/:authID/read-user-post").get(readUserPost);
router.route("/:postID/update-post").patch(UpdateOnePost);
router.route("/:postID/delete-post").delete(deleteOnePost);



export default router;
// router