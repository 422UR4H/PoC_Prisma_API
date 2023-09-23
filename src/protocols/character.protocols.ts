import { Character } from "@prisma/client";
import { SystemProperties } from "./auth.protocols";

export type CreateCharacter = Omit<Character, SystemProperties | "playerId">;
export type UpdateCharacter = CreateCharacter;