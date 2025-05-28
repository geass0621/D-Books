import { Router } from "express";
import { isUserAuth } from "../middleware/isUserAuth";

const router = Router();

router.get("/checkout", isUserAuth)

export default router;