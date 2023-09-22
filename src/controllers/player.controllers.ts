import { Request, Response } from "express";
import { UpdatePlayer } from "@/protocols/player.protocols";
import playerService from "@/services/player.services";
import customErrors from "@/errors/customErrors";

export async function find(req: Request, res: Response): Promise<void> {
    const nick = req.query.nick as string;
    const email = req.query.email as string;
    const result = await playerService.find(nick, email);
    res.send(result);
}

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const player = req.body as UpdatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const updatedPlayer = await playerService.update(id, player);
    if (updatedPlayer == null) throw customErrors.conflict("nick or email");

    const { password, ...playerProfile } = updatedPlayer;
    res.send(playerProfile);
}

export async function deleteById(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const deletedPlayer = await playerService.deleteById(id);
    if (deletedPlayer == null) throw customErrors.notFound("player");

    const { password, ...playerProfile } = deletedPlayer;
    res.send(playerProfile);
}

export async function count(_req: Request, res: Response): Promise<void> {
    const count = await playerService.count();
    res.send(count);
}

const playerController = {
    update, deleteById, find, count
}
export default playerController;