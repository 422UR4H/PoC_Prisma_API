import customErrors from "@/errors/customErrors";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";
import characterRepository from "@/repositories/character.repository";
import { Character } from "@prisma/client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export async function create(playerId: number, character: CreateCharacter) {
    const result = await characterRepository.readByNick(character.nick);
    if (result != null) throw customErrors.conflict("nick of character");

    return characterRepository.create(playerId, character);
}

export async function readById(id: number, playerId: number): Promise<Character> {
    const character = await characterRepository.readById(id);

    if (character == null) throw customErrors.notFound("character");
    if (character.playerId !== playerId) throw customErrors.unauthorized("character id");
    return character;
}

export async function readByNick(nick: string, playerId: number): Promise<Character> {
    const character = await characterRepository.readByNick(nick);

    if (character == null) throw customErrors.notFound("character");
    if (character.playerId !== playerId) throw customErrors.unauthorized("character id");
    return character;
}

export function readAll(id: number): Promise<Character[]> {
    return characterRepository.readAll(id);
}

export async function update(id: number, playerId: number, character: UpdateCharacter): Promise<Character> {
    const result = await characterRepository.readById(id);

    if (!result) throw customErrors.notFound("character");
    if (result.playerId !== playerId) throw customErrors.unauthorized("id param");

    character.birthday = new Date(dayjs(character.birthday, "DD-MM-YYYY").toString());
    return characterRepository.update(id, character);
}

export async function deleteById(id: number, playerId: number) {
    const result = await characterRepository.readById(id);

    if (!result) throw customErrors.notFound("character");
    if (result.playerId !== playerId) throw customErrors.unauthorized("id param");
    return characterRepository.deleteById(id);
}

export function find(nick: string) {
    return characterRepository.find(nick);
}

export function count() {
    return characterRepository.count();
}

const characterService = {
    create, readById, readByNick, readAll,
    update, deleteById,
    find, count
}
export default characterService;