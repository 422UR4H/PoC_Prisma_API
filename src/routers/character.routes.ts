import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { characterSchema } from "@/schemas/character.schemas";
import { create, readById, readByNick, readAll, count, update, deleteById, find } from "@/controllers/character.controllers";

const router = Router();
router
    .post("/", validateAuth, validateSchema(characterSchema), create)
    .get("/", readAll)
    .get("/by-id/:id", validateAuth, readById)
    .get("/by-nick/:nick", validateAuth, readByNick)
    .get("/find-by", find)
    .get("/count", count)
    .put("/:id", validateAuth, validateSchema(characterSchema), update)
    .delete("/:id", validateAuth, deleteById);

export default router;