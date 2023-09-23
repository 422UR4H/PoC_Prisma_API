import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { characterSchema } from "@/schemas/character.schemas";
import { find, count, update, deleteById } from "@/controllers/character.controllers";

const router = Router();
router
    .post("/", validateAuth, validateSchema(characterSchema), find)
    .get("/", validateAuth, count)
    .put("/:id", validateAuth, validateSchema(characterSchema), update)
    .delete("/:id", validateAuth, deleteById);

export default router;