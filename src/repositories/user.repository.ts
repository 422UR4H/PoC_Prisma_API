import prisma from "@/database/db.connection";
import { PlayerUser } from "@/protocols/user.protocols";

function create(playerUser: PlayerUser) {
    const { nick, name, email, password, description, avatarUrl, birthday } = playerUser;
    return prisma.user.create({
        data: {
            email, password,
            player: { create: { nick, name, description, avatarUrl, birthday } }
        }
    });
}

export const userRepository = {
    create
}