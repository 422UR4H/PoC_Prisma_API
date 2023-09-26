import { Router } from "express";
import validateAuth from "@/middlewares/validateAuth";
import validateSchema from "@/middlewares/validateSchema";
import { characterSchema } from "@/schemas/character.schemas";
import { create, readById, readByNick, readAll, count, update, deleteById, find } from "@/controllers/character.controllers";

const router = Router();
router
    .get("/", readAll)
    .get("/count", count)
    .get("/find-by", find)
    .all("/*", validateAuth)
    .get("/by-id/:id", readById)
    .get("/by-nick/:nick", readByNick)
    .post("/", validateSchema(characterSchema), create)
    .patch("/:id", validateSchema(characterSchema), update)
    .delete("/:id", deleteById);

export default router;