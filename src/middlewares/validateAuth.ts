import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { PlayerProfile } from "@/protocols/player.protocols";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import httpStatus from "http-status";
import dotenv from "dotenv";
import { UserProfile } from "@/protocols/user.protocols";
import { userRepository } from "@/repositories/user.repository";
import { User } from "@prisma/client";

dotenv.config();

export default function validateAuth(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token || token.includes(' ')) throw customErrors.unauthorized("Bearer token");

    try {
        const secret = process.env.JWT_SECRET || process.env.SECRET_KEY || "test";
        jwt.verify(token, secret, async (error: VerifyErrors, decoded: JwtPayload) => {
            if (error) return res.status(httpStatus.UNAUTHORIZED).send("token is not valid");

            const user: User | null = await userRepository.readById(decoded.id);
            if (user == null) return res.status(httpStatus.UNAUTHORIZED).send("user does not exist");

            const { password, ...userProfile } = user;
            res.locals.user = userProfile as UserProfile;
            return next();
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}