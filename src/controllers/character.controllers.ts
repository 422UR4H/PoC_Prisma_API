import { Request, Response } from "express";
import { Character } from "@prisma/client";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";
import characterService from "@/services/character.services";
import customErrors from "@/errors/customErrors";
import httpStatus from "http-status";


export async function create(req: Request, res: Response): Promise<void> {
    const character = req.body as CreateCharacter;
    if (!character) throw customErrors.unprocessableEntity("character");

    const { id } = res.locals.player;
    const result: Character = await characterService.create(id, character);
    if (result == null) throw customErrors.conflict("nick or email of character");

    res.sendStatus(httpStatus.CREATED);
}

export async function find(req: Request, res: Response): Promise<void> {
    const nick = req.query.nick as string;
    const result = await characterService.find(nick);
    res.send(result);
}

export async function update(req: Request, res: Response): Promise<void> {
    const playerId = res.locals.player.id;
    const id = Number(req.params.id);
    if (!id) throw customErrors.badRequest("id is required");

    const character = req.body as UpdateCharacter;
    if (!character) throw customErrors.unprocessableEntity("character");

    const updatedcharacter = await characterService.update(id, playerId, character);
    if (updatedcharacter == null) throw customErrors.conflict("nick or email");

    res.send(updatedcharacter);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const playerId = res.locals.player.id;
    const id = Number(req.params.id);
    const deletedCharacter = await characterService.deleteById(id, playerId);

    if (deletedCharacter == null) throw customErrors.notFound("character");
    res.send(deletedCharacter);
}

export async function count(_req: Request, res: Response): Promise<void> {
    const count = await characterService.count();
    res.send({ count });
}

const characterController = {
    update, deleteById, find, count
}
export default characterController;