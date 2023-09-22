import { Router } from "express";
import authRouter from "@/routers/auth.routes";
import playerRouter from "@/routers/player.routes";

const router = Router();
router
    .use("/auth", authRouter)
    .use("/players", playerRouter);

export default router;