import { Router } from "express";
import { signup } from "../controllers/auth";

const router = Router();

router.put('/signup', signup)

export default router