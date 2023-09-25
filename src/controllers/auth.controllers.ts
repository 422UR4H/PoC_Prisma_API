import { Request, Response } from "express";
import { AuthUser, PlayerUser, UpdateUser } from "@/protocols/user.protocols";
import authService from "@/services/auth.services";
import httpStatus from "http-status";
import customErrors from "@/errors/customErrors";

export async function signUp(req: Request, res: Response): Promise<void> {
    const player = req.body as PlayerUser;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result = await authService.signUp(player);
    if (result == null) throw customErrors.conflict("nick or email of player");

    res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as AuthUser;
    const { token, playerUser } = await authService.signIn(email, password);

    res.send({ token, playerUser });
}

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const { email, password, newPassword } = req.body as UpdateUser;
    const player = await authService.update(id, email, password, newPassword);

    const { password: _password, ...updatedPlayer } = player;
    res.send(updatedPlayer);
}

const authController = {
    signUp, signIn, update
}
export default authController;