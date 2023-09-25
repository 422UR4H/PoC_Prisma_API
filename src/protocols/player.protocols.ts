import { Player } from "@prisma/client";
import { UserSymbol, SystemProperties } from "./user.protocols";


export type CreatePlayer = Omit<Player, SystemProperties | "userId">;
export type UpdatePlayer = Omit<Player, SystemProperties | UserSymbol | "nick">;
export type PlayerProfile = Omit<Player, "password">;