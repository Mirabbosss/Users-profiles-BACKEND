import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../../controllers/users";
import { upload } from './../../config/upload';

const router: Router = Router();

router.get('/', getAllUsers as any)
router.get('/:id', getUserById as any)
router.post('/', upload.single("profilePhoto"), createUser as any)

export default router;