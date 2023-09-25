import { User } from "@prisma/client";
import { CreatePlayer } from "./player.protocols";

export type UserSymbol = "email" | "password";

export type AuthUser = Omit<User, "id">;
export type UserProfile = Omit<User, "password">;

export interface UpdateUser extends AuthUser {
    newPassword: string | null
}
export type PlayerUser = AuthUser & CreatePlayer;

export type SystemProperties = "id" | "createdAt" | "updatedAt";