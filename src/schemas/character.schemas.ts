import { CreateCharacter } from "@/protocols/character.protocols";
import Joi, { Root } from "joi";
import JoiDate from "@joi/date";

const JoiExtended = Joi.extend(JoiDate) as Root;

export const characterSchema = Joi.object<CreateCharacter>({
    // nick: Joi.string().min(4).max(16).required(), // FIXME: treat update nick
    name: Joi.string().min(4).max(32).required(),
    exp: Joi.number().integer().min(0), // FIXME: limit max number too
    avatarUrl: Joi.string().uri(),
    backgroundImgUrl: Joi.string().uri(),
    briefDescription: Joi.string().max(255),
    birthday: JoiExtended.date().format('DD-MM-YYYY').less('now').required()
});