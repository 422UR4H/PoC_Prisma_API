import { Router } from "express";
import { userSchema, updateUserSchema, userPlayerSchema } from "@/schemas/user.schemas";
import validateSchema from "@/middlewares/validateSchema";
import authController from "@/controllers/auth.controllers";
import validateAuth from "@/middlewares/validateAuth";

const router = Router();
router
    .post("/sign-up", validateSchema(userPlayerSchema), authController.signUp)
    .post("/sign-in", validateSchema(userSchema), authController.signIn)
    .put("/", validateAuth, validateSchema(updateUserSchema), authController.update);

export default router;