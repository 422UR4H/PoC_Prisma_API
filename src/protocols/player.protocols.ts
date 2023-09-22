import dayjs, { Dayjs } from "dayjs";
import { Player } from "@prisma/client";
import { AuthSymbol } from "./auth.protocols";

// export type Player = {
//     id: number,
//     nick: string,
//     name: string,
//     email: string,
//     password?: string,
//     avatarUrl: string,
//     description: string,
//     birthday: Date | Dayjs,
//     createdAt: Date | Dayjs,
//     updatedAt: Date | Dayjs
// };

type SystemProperties = "id" | "createdAt" | "updatedAt";
export type CreatePlayer = Omit<Player, SystemProperties>;
export type UpdatePlayer = Omit<Player, SystemProperties | AuthSymbol | "nick">;

export type PlayerProfile = Omit<Player, "password">;