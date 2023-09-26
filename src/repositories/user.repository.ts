import prisma from "@/database/db.connection";
import { PlayerUser } from "@/protocols/user.protocols";
import { LIMIT } from "@/utils/constants.utils";
import { User } from "@prisma/client";

function create(playerUser: PlayerUser) {
    const { nick, name, email, password, description, avatarUrl, birthday } = playerUser;
    return prisma.user.create({
        data: {
            email, password,
            player: { create: { nick, name, description, avatarUrl, birthday } }
        }
    });
}

function readByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
        include: { player: true }
    });
}

function readById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
}

function update(id: number, email: string, password: string): Promise<User> {
    return prisma.user.update({
        data: { email, password },
        where: { id }
    });
}

export function findByNickOrEmail(nick: string, email: string) {
    return prisma.user.findFirst({
        where: { OR: [{ email }, { player: { nick } }] },
        select: {
            email: true,
            player: {
                select: { nick: true }
            }
        }
    });
}

export function find(nick: string, email: string) {
    return prisma.user.findMany({
        select: { email: true },
        where: {
                email: {
                    contains: email || undefined,
                    mode: "insensitive"
                }
        },
        orderBy: { email: "asc" },
        take: LIMIT
    });
}

export const userRepository = {
    create, readByEmail, readById, update, findByNickOrEmail, find
}