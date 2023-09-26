import { CustomError } from "@/protocols/customError.protocols";
import httpStatus from "http-status";

export function badRequest(message: string = "entity is not valid"): CustomError {
    return new CustomError(
        "badRequest",
        message,
        httpStatus.BAD_REQUEST
    );
}
export function unauthorized(entity?: string): CustomError {
    const message = !!entity ? `incorrect ${entity}` : "access denied!";
    return new CustomError(
        "unauthorized",
        message,
        httpStatus.UNAUTHORIZED
    );
}
export function notFound(entity: string = "entity"): CustomError {
    return new CustomError(
        "notFound",
        `${entity} does not exist`,
        httpStatus.NOT_FOUND
    );
}
export function conflict(entity: string = "entity"): CustomError {
    return new CustomError(
        "conflict",
        `${entity} already exists`,
        httpStatus.CONFLICT
    );
}
export function unprocessableEntity(entity?: string | Array<string>): CustomError {
    let message: string;

    if (entity == null) {
        message = "entity is not valid";
    } else if (typeof entity === "string") {
        message = `${entity} is not valid`;
    } else {
        message = entity.join("\n");
    }
    return new CustomError(
        "unprocessableEntity",
        message,
        httpStatus.UNPROCESSABLE_ENTITY
    );
}
export function internalServerError(message: string | void): CustomError {
    if (message == null) message = "internal server error";
    return new CustomError(
        "internalServerError",
        message,
        httpStatus.INTERNAL_SERVER_ERROR
    );
}
const customErrors = {
    badRequest,
    unauthorized,
    notFound,
    conflict,
    unprocessableEntity,
    internalServerError
};
export default customErrors;