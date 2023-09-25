import { AuthUser, PlayerUser, UpdateUser } from "@/protocols/user.protocols";
import Joi, { Root } from "joi";
import JoiDate from "@joi/date";

const JoiDateExtended = Joi.extend(JoiDate);

export const userSchema = Joi.object<AuthUser>({
    email: Joi.string().email().min(9).max(64).required(),
    password: Joi.string().min(3).max(255).required()
});

export const updateUserSchema = Joi.object<UpdateUser>({
    email: Joi.string().email().min(9).max(64).required(),
    password: Joi.string().min(3).max(255).required(),
    newPassword: Joi.string().min(3).max(255)
});

export const userPlayerSchema = Joi.object<PlayerUser>({
    nick: Joi.string().min(4).max(16).required(),
    name: Joi.string().min(4).max(32).required(),
    email: Joi.string().email().min(9).max(64).required(),
    password: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(255),
    avatarUrl: Joi.string().uri(),
    birthday: JoiDateExtended.date().format('DD-MM-YYYY').less('now').required()
});