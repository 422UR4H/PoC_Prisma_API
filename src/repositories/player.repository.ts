import prisma from "@/database/db.connection";
import { LIMIT } from "@/utils/constants.utils";
import { Player } from "@prisma/client";
import { CreatePlayer, UpdatePlayer } from "@/protocols/player.protocols";


export function create(player: CreatePlayer): Promise<Player> {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    return prisma.player.create({
        data: { nick, name, email, password, description, avatarUrl, birthday }
    });
}

export function readByEmail(email: string): Promise<Player | null> {
    return prisma.player.findUnique({ where: { email } });
}

export function findByNickOrEmail(nick: string, email: string) {
    return prisma.player.findMany({
        where: { OR: [{ nick }, { email }] }
    });
}

export function readById(id: number): Promise<Player | null> {
    return prisma.player.findUnique({ where: { id } });
}

export function update(id: number, player: UpdatePlayer): Promise<Player> {
    const { name, description, avatarUrl, birthday } = player;
    return prisma.player.update({
        data: { name, description, avatarUrl, birthday },
        where: { id }
    });
}

export function updateAuth(id: number, email: string, password: string): Promise<Player> {
    return prisma.player.update({
        data: { email, password },
        where: { id }
    });
}

export function deleteById(id: number): Promise<Player> {
    return prisma.player.delete({ where: { id } });
}

export function count(): Promise<number> {
    return prisma.player.count();
}

export function find(nick: string, email: string) {
    return prisma.player.findMany({
        select: { nick: true, email: true },
        where: {
            OR: [{
                nick: {
                    contains: nick || undefined,
                    mode: "insensitive"
                }
            }, {
                email: {
                    contains: email || undefined,
                    mode: "insensitive"
                }
            }]
        },
        orderBy: [{ nick: "asc" }, { email: "asc" }],
        take: LIMIT
    });
}

const playerRepository = {
    readById, readByEmail, find, findByNickOrEmail,
    create, update, updateAuth, deleteById, count
};
export default playerRepository;