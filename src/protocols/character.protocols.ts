import { Character } from "@prisma/client";
import { SystemProperties } from "./user.protocols";

export type CreateCharacter = Omit<Character, SystemProperties | "playerId">;
export type UpdateCharacter = CreateCharacter;