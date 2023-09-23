import { Request, Response } from "express";
import { Player } from "@prisma/client";
import { CreatePlayer } from "@/protocols/player.protocols";
import { Auth, UpdateAuth } from "@/protocols/auth.protocols";
import authService from "@/services/auth.services";
import httpStatus from "http-status";
import customErrors from "@/errors/customErrors";

export async function signUp(req: Request, res: Response): Promise<void> {
    const player = req.body as CreatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result: Player = await authService.signUp(player);
    if (result == null) throw customErrors.conflict("nick or email of player");

    res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as Auth;
    const { token, player } = await authService.signIn(email, password);

    res.send({ token, player });
}

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.player;
    const { email, password, newPassword } = req.body as UpdateAuth;
    const player = await authService.update(id, email, password, newPassword);

    const { password: _password, ...updatedPlayer } = player;
    res.send(updatedPlayer);
}

const authController = {
    signUp, signIn, update
}
export default authController;