import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import customErrors from "@/errors/customErrors";

export default function validateSchema(schema: ObjectSchema<any>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw customErrors.unprocessableEntity(error.details.map(d => d.message));
        next();
    }
}