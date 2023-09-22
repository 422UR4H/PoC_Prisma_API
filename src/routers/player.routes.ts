import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { updatePlayerSchema } from "@/schemas/player.schemas";
import { update, deleteById, find, count } from "@/controllers/player.controllers";

const router = Router();
router
    .get("/count", count)
    .get("/find-by", validateAuth, find)
    .patch("/", validateAuth, validateSchema(updatePlayerSchema), update)
    .delete("/", validateAuth, deleteById);

export default router;