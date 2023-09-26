import prisma from "@/database/db.connection";
import { LIMIT } from "@/utils/constants.utils";
import { Character } from "@prisma/client";
import { CreateCharacter, UpdateCharacter } from "@/protocols/character.protocols";


export function create(playerId: number, character: CreateCharacter) {
    // return prisma.character.create({
    //     data: {
    //         nick, name, birthday, playerId
    //     }
    // });
    // return prisma.character.create({
    //     data: {
    //         nick, name, birthday,
    //         player: {
    //             connect: { id: playerId }
    //         }
    //     },
    // });
    return prisma.player.update({
        where: { id: playerId },
        data: { Character: { create: character } },
        select: { Character: { where: { nick: character.nick } } },
    });
}

export function readAll(playerId: number): Promise<Array<Character>> {
    return prisma.character.findMany({ where: { playerId } });
}

export function readByNick(nick: string): Promise<Character | null> {
    return prisma.character.findUnique({ where: { nick } });
}

export function readById(id: number): Promise<Character | null> {
    return prisma.character.findUnique({ where: { id } });
}

export function update(id: number, character: UpdateCharacter): Promise<Character> {
    const { name, briefDescription, avatarUrl, backgroundImgUrl, birthday } = character;
    return prisma.character.update({
        data: { name, briefDescription, avatarUrl, backgroundImgUrl, birthday },
        where: { id }
    });
}

export function deleteById(id: number): Promise<Character> {
    return prisma.character.delete({ where: { id } });
}

export function count(): Promise<number> {
    return prisma.character.count();
}

export function find(nick: string) {
    return prisma.character.findMany({
        select: { nick: true },
        where: {
            nick: {
                contains: nick || undefined,
                mode: "insensitive"
            }
        },
        orderBy: { nick: "asc" },
        take: LIMIT
    });
}

const characterRepository = {
    create, readAll, readById, readByNick,
    update, deleteById, count, find
};
export default characterRepository;