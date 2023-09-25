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
    const result = await playerRepository.findByNickOrEmail(nick, email);

    if (result.length > 0) {
        throw customErrors.conflict(generateErrorMessage(result, nick, email));
    }
    const hash = bcrypt.hashSync(password, 10);
    playerUser.password = hash;
    playerUser.birthday = new Date(dayjs(birthday, "DD-MM-YYYY").toString());
    
    return userRepository.create(playerUser);
}

export async function signIn(email: string, password: string): Promise<{ token: string, player: PlayerProfile }> {
    const player: Player | null = await playerRepository.readByEmail(email);

    if (player == null) throw customErrors.notFound("email");
    if (!bcrypt.compareSync(password, player.password)) {
        throw customErrors.unauthorized("password");
    }
    const { password: _password, ...playerProfile } = player;
    const token = jwt.sign(
        { id: player.id },
        process.env.JWT_SECRET || process.env.SECRET_KEY || "test",
        { expiresIn: 24 * 60 * 60 * 7 }
    );
    return { token, player: playerProfile };
}

export async function update(id: number, email: string, password: string, newPassword: string | null) {
    const player = await playerRepository.readById(id) as AuthUser;

    if (player == null) throw customErrors.unauthorized();
    if (!bcrypt.compareSync(password, player.password)) {
        throw customErrors.unauthorized("password");
    }
    if (player.email !== email) {
        const otherPlayer: Player | null = await playerRepository.readByEmail(email);

        if (otherPlayer != null) throw customErrors.conflict("email");
    }
    
    let hash = player.password;
    if (typeof newPassword === "string" && !bcrypt.compareSync(newPassword, player.password)) {
        hash = bcrypt.hashSync(newPassword, 10);
    }
    const result = await playerRepository.updateAuth(id, email, hash);
    return result;
}

const authService = {
    signUp, signIn, update
};
export default authService;



function generateErrorMessage(result: Array<Player>, nick: string, email: string): string {
    const entities = [];
    if (result[0].nick === nick) entities.push("nick");
    if (result[0].email === email) entities.push("email");

    let message = entities[0];
    if (entities.length > 1) message = entities.join(" and ");

    return message;
}