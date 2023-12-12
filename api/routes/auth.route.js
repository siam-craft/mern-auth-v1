import express from "express";
import { singup, signin, signinGoole } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", singup);
router.post("/signin", signin);
router.post("/google", signinGoole);

export default router;
