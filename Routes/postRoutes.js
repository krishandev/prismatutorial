import {Router} from 'express'
import { createPost, deletePost, getAllPosts, searchPost, showPost, updatePost } from '../Controller/PostController.js';

const router=Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/search", searchPost);
router.get("/:id", showPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;