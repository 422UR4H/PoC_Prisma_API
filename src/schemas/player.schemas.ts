import { CreatePlayer, UpdatePlayer } from "@/protocols/player.protocols";
import JoiBase, { Root } from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate) as Root;

export const playerSchema = Joi.object<CreatePlayer>({
    nick: Joi.string().min(4).max(16).required(),
    name: Joi.string().min(4).max(32).required(),
    email: Joi.string().email().min(9).max(64).required(),
    password: Joi.string().max(255).required(),
    description: Joi.string().max(255),
    avatarUrl: Joi.string().uri(),
    birthday: Joi.date().format('DD-MM-YYYY').less('now').required()
});

export const updatePlayerSchema = Joi.object<UpdatePlayer>({
    name: Joi.string().min(4).max(32).required(),
    description: Joi.string().max(255),
    avatarUrl: Joi.string().uri(),
    birthday: Joi.date().format('DD-MM-YYYY').less('now').required()
});