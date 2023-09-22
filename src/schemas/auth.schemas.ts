import { Auth } from "@/protocols/auth.protocols";
import Joi from "joi";

export const authSchema = Joi.object<Auth>({
    email: Joi.string().email().min(9).max(64).required(),
    password: Joi.string().min(3).max(255).required()
});