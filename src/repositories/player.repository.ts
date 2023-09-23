import prisma from "@/database/db.connection";
import { CreatePlayer, UpdatePlayer } from "@/protocols/player.protocols";
import { Player } from "@prisma/client";

const LIMIT = 8;

export async function create(player: CreatePlayer): Promise<Player> {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    const newPlayer = await prisma.player.create({
        data: { nick, name, email, password, description, avatarUrl, birthday }
    });
    return newPlayer;
}

export function readByEmail(email: string): Promise<Player | null> {
    return prisma.player.findUnique({
        where: { email }
    });
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

export function findNickOrEmail(nick: string, email: string) {
    return prisma.player.findMany({
        where: { OR: [{ nick }, { email }] }
    });
}

export function readById(id: number): Promise<Player | null> {
    return prisma.player.findUnique({
        where: { id }
    });
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
    return prisma.player.delete({
        where: { id }
    });
}

export function count(): Promise<number> {
    return prisma.player.count();
}

const playerRepository = {
    readById, readByEmail, find, findNickOrEmail,
    create, update, updateAuth, deleteById, count
};
export default playerRepository;