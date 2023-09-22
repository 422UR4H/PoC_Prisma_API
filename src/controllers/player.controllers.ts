import { Request, Response } from "express";
import { UpdatePlayer } from "@/protocols/player.protocols";
import playerService from "@/services/player.services";
import customErrors from "@/errors/customErrors";

export async function find(req: Request, res: Response): Promise<void> {
    const nick = req.query.nick as string;
    const email = req.query.email as string;
    const result = await playerService.find(nick, email);
    res.send(result.rows);
}

export async function update(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const player = req.body as UpdatePlayer;
    if (!player) throw customErrors.unprocessableEntity("player");

    const result = await playerService.update(id, player);
    if (result.rowCount <= 0) throw customErrors.conflict("nick or email");

    const updatedPlayer = result.rows[0];
    delete updatedPlayer.password;

    res.send(updatedPlayer);
}

export async function deleteById(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user;
    const result = await playerService.deleteById(id);
    if (result.rowCount <= 0) throw customErrors.notFound("player");

    const deletedPlayer = result.rows[0];
    delete deletedPlayer.password;

    res.send(deletedPlayer);
}

export async function count(_req: Request, res: Response): Promise<void> {
    const result = await playerService.count();
    res.send(result.rows[0]);
}

const playerController = {
    update, deleteById, find, count
}
export default playerController;