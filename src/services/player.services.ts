import { UpdatePlayer } from "@/protocols/player.protocols";
import playerRepository from "@/repositories/player.repository";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function find(nick: string, email: string) {
    return playerRepository.find(nick, email);
}

export async function update(id: number, player: UpdatePlayer) {
    player.birthday = new Date(dayjs(player.birthday, "DD-MM-YYYY").toString());
    const result = await playerRepository.update(id, player, dayjs());
    return result;
}

export function deleteById(id: number) {
    return playerRepository.deleteById(id);
}

export function count() {
    return playerRepository.count();
}

const playerService = {
    update, deleteById, find, count
}
export default playerService;