import prisma from "@/database/db.connection";
import { CreatePlayer, PlayerProfile, UpdatePlayer } from "@/protocols/player.protocols";
import { Player } from "@prisma/client";
import { Dayjs } from "dayjs";

const LIMIT = 8;

export async function create(player: CreatePlayer): Promise<Player> {
    const { nick, name, email, password, description, avatarUrl, birthday } = player;
    const newPlayer = await prisma.player.create({
        data: { nick, name, email, password, description, avatarUrl, birthday }
    });
    return newPlayer;
    // return clientDB.query<Number>(`
    //     INSERT INTO players
    //         (nick, name, email, password, description, "avatarUrl", birthday)
    //     VALUES ($1, $2, $3, $4, $5, $6, $7)
    //     ON CONFLICT DO NOTHING
    //     RETURNING id;`,
    //     [nick, name, email, password, description, avatarUrl, birthday]
    // );
}

export function readByEmail(email: string): Promise<Player | null> {
    return prisma.player.findUnique({
        where: { email }
    });
    // return clientDB.query<Player>(`
    //     SELECT * FROM players
    //     WHERE email = $1;`,
    //     [email]
    // );
}

export function find(nick: string, email: string) {
    return prisma.player.findMany({
        select: { nick: true, email: true },
        where: {
            nick: {
                contains: nick || undefined,
                mode: "insensitive"
            },
            email: {
                contains: email || undefined,
                mode: "insensitive"
            }
        },
        orderBy: { nick: "asc", email: "asc" },
        take: LIMIT
    });
    // return clientDB.query<Player>(`
    //     SELECT nick, email
    //     FROM players
    //     WHERE nick ILIKE COALESCE($1, nick)
    //         OR email ILIKE COALESCE($2, email)
    //     ORDER BY nick, email
    //     LIMIT $3;`,
    //     [`%${nick}%`, `%${email}%`, LIMIT]
    // );
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
    // return clientDB.query<Player>(`
    //     SELECT * FROM players
    //     WHERE id = $1;`,
    //     [id]
    // );
}

export function update(id: number, player: UpdatePlayer, updatedAt: Dayjs): Promise<Player> {
    const { name, description, avatarUrl, birthday } = player;
    return prisma.player.update({
        data: { name, description, avatarUrl, birthday },
        where: { id }
    });
    // return clientDB.query<Player>(`
    //     UPDATE players
    //         SET name = $2,
    //             description = $3,
    //             "avatarUrl" = $4,
    //             birthday = $5,
    //             "updatedAt" = $6
    //     WHERE id = $1
    //     RETURNING *;`,
    //     [id, name, description, avatarUrl, birthday, updatedAt]
    // );
}

export function deleteById(id: number): Promise<Player> {
    return prisma.player.delete({
        where: { id }
    });
    // return clientDB.query<Player>(`
    //     DELETE FROM players
    //     WHERE id = $1
    //     RETURNING *;`,
    //     [id]
    // );
}

export function count(): Promise<number> {
    return prisma.player.count();
    // return clientDB.query<Number>(`
    //     SELECT COUNT(*) FROM players;
    // `);
}

const playerRepository = {
    readById, readByEmail, find, findNickOrEmail,
    create, update, deleteById, count
};
export default playerRepository;