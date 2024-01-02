import { Router } from "express";
import UserRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js'
import commentRoutes from './commentRoutes.js'

const router=Router();

router.use("/api/user", UserRoutes);
router.use("/api/post", postRoutes);
router.use("/api/comment", commentRoutes);

export default router;

