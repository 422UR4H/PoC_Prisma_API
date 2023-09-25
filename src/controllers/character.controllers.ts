import { Request, Response } from "express";
import { Character, Player } from "@prisma/client";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";
import characterService from "@/services/character.services";
import customErrors from "@/errors/customErrors";
import httpStatus from "http-status";
import dayjs from "dayjs";


export async function create(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.player;
    const character = req.body as CreateCharacter;

    character.birthday = new Date(dayjs(character.birthday, "DD-MM-YYYY").toString());
    const result = await characterService.create(id, character);

    res.status(httpStatus.CREATED).send(result);
}

export async function readById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw customErrors.badRequest("id is not valid");

    const { id: playerId } = res.locals.player as Player;
    const result = await characterService.readById(id, playerId);

    res.send(result);
}

export async function readByNick(req: Request, res: Response): Promise<void> {
    const { nick } = req.params;
    if (!nick) throw customErrors.badRequest("nick is not valid");

    const { id: playerId } = res.locals.player as Player;
    const result = await characterService.readByNick(nick, playerId);

    res.send(result);
}

export async function readAll(req: Request, res: Response): Promise<void> {
    const id = Number(res.locals.player.id);
    if (!id) throw customErrors.badRequest("id is not valid");

    const characters = await characterService.readAll(id);
    res.send(characters);
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw customErrors.badRequest("id is required");

    const playerId = res.locals.player.id;
    const character = req.body as UpdateCharacter;
    const updatedcharacter = await characterService.update(id, playerId, character);

    if (updatedcharacter == null) throw customErrors.conflict("nick or email");
    res.send(updatedcharacter);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const playerId = res.locals.player.id;
    const deletedCharacter = await characterService.deleteById(id, playerId);

    if (deletedCharacter == null) throw customErrors.notFound("character");
    res.send(deletedCharacter);
}

export async function find(req: Request, res: Response): Promise<void> {
    const nick = req.query.nick as string;
    const result = await characterService.find(nick);
    res.send(result);
}

export async function count(_req: Request, res: Response): Promise<void> {
    const count = await characterService.count();
    res.send({ count });
}

const characterController = {
    create, find, update, deleteById, count
}
export default characterController;