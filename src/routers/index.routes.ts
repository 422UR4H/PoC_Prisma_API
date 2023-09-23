import { Router } from "express";
import authRouter from "@/routers/auth.routes";
import playerRouter from "@/routers/player.routes";
import characterRouter from "@/routers/character.routes";

const router = Router();
router
    .use("/auth", authRouter)
    .use("/players", playerRouter)
    .use("/characters", characterRouter);

export default router;