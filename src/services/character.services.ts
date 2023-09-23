import customErrors from "@/errors/customErrors";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";
import characterRepository from "@/repositories/character.repository";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function create(playerId: number, character: CreateCharacter) {
    return characterRepository.create(playerId, character);
}

export function find(nick: string) {
    return characterRepository.find(nick);
}

export async function update(id: number, playerId: number, character: UpdateCharacter) {
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

export function count() {
    return characterRepository.count();
}

const characterService = {
    create, update, deleteById, find, count
}
export default characterService;