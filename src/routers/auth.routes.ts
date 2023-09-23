import { Router } from "express";
import { authSchema, updateAuthSchema } from "@/schemas/auth.schemas";
import { playerSchema } from "@/schemas/player.schemas";
import validateSchema from "@/middlewares/validateSchema";
import authController from "@/controllers/auth.controllers";
import validateAuth from "@/middlewares/validateAuth";

const router = Router();
router
    .post("/sign-up", validateSchema(playerSchema), authController.signUp)
    .post("/sign-in", validateSchema(authSchema), authController.signIn)
    .put("/", validateAuth, validateSchema(updateAuthSchema), authController.update);

export default router;