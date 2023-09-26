import { Player, User } from "@prisma/client";
import { PlayerProfile } from "@/protocols/player.protocols";
import { AuthUser, PlayerUser } from "@/protocols/user.protocols";
import { userRepository } from "@/repositories/user.repository";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);


export async function signUp(playerUser: PlayerUser): Promise<User> {
    const { nick, email, password, birthday } = playerUser as PlayerUser;
    const result = await userRepository.findByNickOrEmail(nick, email);

    if (result != null) {
        const keyValues: KeyValues = {
            email: result.email,
            nick: result.player?.nick
        }
        throw customErrors.conflict(generateErrorMessage(keyValues, nick, email));
    }
    const hash = bcrypt.hashSync(password, 10);
    playerUser.password = hash;
    playerUser.birthday = new Date(dayjs(birthday, "DD-MM-YYYY").toString());

    return userRepository.create(playerUser);
}

export async function signIn(email: string, password: string) {
    const playerUser = await userRepository.readByEmail(email);

    if (playerUser == null) throw customErrors.notFound("email");
    if (!bcrypt.compareSync(password, playerUser.password)) {
        throw customErrors.unauthorized("password");
    }
    const { password: _password, ...playerUserProfile } = playerUser;
    const token = jwt.sign(
        { id: playerUser.id },
        process.env.JWT_SECRET || process.env.SECRET_KEY || "test",
        { expiresIn: 24 * 60 * 60 * 7 }
    );
    return { token, playerUser: playerUserProfile };
}

export async function update(id: number, email: string, password: string, newPassword: string | null) {
    const user = await userRepository.readById(id);

    if (user == null) throw customErrors.unauthorized();
    if (!bcrypt.compareSync(password, user.password)) {
        throw customErrors.unauthorized("password");
    }
    if (user.email !== email) {
        const otherUser: User | null = await userRepository.readByEmail(email);

        if (otherUser != null) throw customErrors.conflict("email");
    }

    let hash = user.password;
    if (typeof newPassword === "string" && !bcrypt.compareSync(newPassword, user.password)) {
        hash = bcrypt.hashSync(newPassword, 10);
    }
    const result = await userRepository.update(id, email, hash);
    return result;
}

export function find(nick: string, email: string) {
    return userRepository.find(nick, email);
}

const authService = {
    signUp, signIn, update, find
};
export default authService;


type KeyValues = {
    email: string | undefined,
    nick: string | undefined
}
function generateErrorMessage(result: KeyValues, nick: string, email: string): string {
    const entities = [];
    console.log(result)
    if (result.nick === nick) entities.push("nick");
    if (result.email === email) entities.push("email");

    let message = entities[0];
    if (entities.length > 1) message = entities.join(" and ");

    return message;
}