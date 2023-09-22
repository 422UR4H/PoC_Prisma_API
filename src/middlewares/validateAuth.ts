import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import playerRepository from "@/repositories/player.repository";
import customErrors from "@/errors/customErrors";
import httpStatus from "http-status";
import dotenv from "dotenv";

dotenv.config();

export default function validateAuth(req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", '');
    if (!token || token.includes(' ')) throw customErrors.unauthorized("Bearer token");

    try {
        const secret = process.env.JWT_SECRET || process.env.SECRET_KEY || "test";
        jwt.verify(token, secret, async (error: VerifyErrors, decoded: JwtPayload) => {
            if (error) return res.status(httpStatus.UNAUTHORIZED).send("token is not valid");

            const user = (await playerRepository.readById(decoded.id))?.rows[0];
            if (!user) return res.status(httpStatus.UNAUTHORIZED).send("player does not exist");

            delete user.password;
            res.locals.user = user;
            return next();
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}