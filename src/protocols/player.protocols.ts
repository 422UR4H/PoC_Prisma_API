import { Player } from "@prisma/client";
import { AuthSymbol, SystemProperties } from "./auth.protocols";


export type CreatePlayer = Omit<Player, SystemProperties>;
export type UpdatePlayer = Omit<Player, SystemProperties | AuthSymbol | "nick">;
export type PlayerProfile = Omit<Player, "password">;