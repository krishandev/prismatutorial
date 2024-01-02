import {Router} from 'express'
import { createUser, deleteUser, fetchUsers, singleUser, updateUser } from '../Controller/UserController.js';

const router=Router();

router.get("/", fetchUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/:id", singleUser);
router.delete("/:id", deleteUser);

export default router;