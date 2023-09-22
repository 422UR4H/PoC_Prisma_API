import { CreatePlayer } from "@/protocols/player.protocols";
import { Player } from "@prisma/client";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export async function signUp(player: CreatePlayer): Promise<Player>{
    const { nick, email, password, birthday } = player;
    
    const result = await playerRepository.findNickOrEmail(nick, email);
    console.log(result)
    if (result.length > 0) throw customErrors.conflict("nick or email");

    const hash = bcrypt.hashSync(password, 10);
    player.password = hash;
    player.birthday = new Date(dayjs(birthday, "DD-MM-YYYY").toString());

    return playerRepository.create(player);
}

export async function signIn(email: string, password: string): Promise<{token: string, player: Player}> {
    const player: Player | null = await playerRepository.readByEmail(email);
    if (player == null) throw customErrors.notFound("email");

    if (!bcrypt.compareSync(password, player.password)) {
        throw customErrors.unauthorized("password");
    }
    const token = jwt.sign(
        { id: player.id },
        process.env.JWT_SECRET || process.env.SECRET_KEY || "test",
        { expiresIn: 24 * 60 * 60 * 7 }
    );
    return { token, player };
}

const authService = {
    signUp, signIn
};
export default authService;