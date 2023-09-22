import { Request, Response } from "express";
import { CreatePlayer } from "@/protocols/player.protocols";
import { Auth } from "@/protocols/auth.protocols";
import authService from "@/services/auth.services";
import httpStatus from "http-status";
import customErrors from "@/errors/customErrors";

export async function signUp(req: Request, res: Response): Promise<void> {
    const player = req.body as CreatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result = await authService.signUp(player);
    if (result.rowCount <= 0) throw customErrors.conflict("nick or email of player");

    res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as Auth;
    const { token, player } = await authService.signIn(email, password);
    res.send({ token, player });
}

const authController = {
    signUp, signIn
}
export default authController;