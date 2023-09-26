import { Request, Response } from "express";
import { Character, Player, User } from "@prisma/client";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";
import characterService from "@/services/character.services";
import customErrors from "@/errors/customErrors";
import httpStatus from "http-status";
import dayjs from "dayjs";


export async function create(req: Request, res: Response): Promise<void> {
    const { id } = res.locals.user as User;
    const character = req.body as CreateCharacter;

    character.birthday = new Date(dayjs(character.birthday, "DD-MM-YYYY").toString());
    const result = await characterService.create(id, character);

    res.status(httpStatus.CREATED).send(result.Character[0]);
}

export async function readById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw customErrors.badRequest("id is not valid");

    const { id: userId } = res.locals.user as User;
    const result = await characterService.readById(id, userId);

    res.send(result);
}

export async function readByNick(req: Request, res: Response): Promise<void> {
    const { nick } = req.params;
    if (!nick) throw customErrors.badRequest("nick is not valid");

    const { id: userId } = res.locals.user as User;
    const result = await characterService.readByNick(nick, userId);

    res.send(result);
}

export async function readAll(req: Request, res: Response): Promise<void> {
    const id = Number(res.locals.user.id);
    if (!id) throw customErrors.badRequest("id is not valid");

    const characters = await characterService.readAll(id);
    res.send(characters);
}

export async function update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    if (!id) throw customErrors.badRequest("id is not valid");

    const userId = res.locals.user.id as number;
    const character = req.body as UpdateCharacter;
    const updatedcharacter = await characterService.update(id, userId, character);

    if (updatedcharacter == null) throw customErrors.conflict("nick or email");
    res.send(updatedcharacter);
}

export async function deleteById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = res.locals.user.id;
    const deletedCharacter = await characterService.deleteById(id, userId);

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