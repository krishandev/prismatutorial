import {Router} from 'express'
import { createComment, deleteComment, getAllComments, showComment, updateComment } from '../Controller/CommentController.js';

const router=Router();

router.get("/", getAllComments);
router.post("/", createComment);
router.get("/:id", showComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
