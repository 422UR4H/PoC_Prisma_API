import { UpdatePlayer } from "@/protocols/player.protocols";
import playerRepository from "@/repositories/player.repository";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function find(nick: string, mail: string) {
    return playerRepository.find(nick, mail);
}

export function update(id: number, player: UpdatePlayer) {
    player.birthday = dayjs(player.birthday, "DD-MM-YYYY");
    return playerRepository.update(id, player, dayjs());
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