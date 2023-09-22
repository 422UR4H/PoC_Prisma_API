import { CreatePlayer } from "@/protocols/player.protocols";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function signUp(player: CreatePlayer): Promise<any> {
    const { password, birthday } = player;
    if (typeof password !== "string") {
        throw customErrors.unprocessableEntity("password");
    }
    const hash = bcrypt.hashSync(password, 10);
    player.password = hash;
    player.birthday = dayjs(birthday, "DD-MM-YYYY");

    return playerRepository.create(player);
}

export async function signIn(email: string, password: string): Promise<any> {
    const result = await playerRepository.readByEmail(email);
    if (result.rowCount <= 0) throw customErrors.notFound("email");

    const player = result.rows[0];
    if (typeof player.password !== "string") {
        throw customErrors.internalServerError();
    }
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