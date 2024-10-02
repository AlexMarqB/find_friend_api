import { Prisma, User } from "@prisma/client";

export interface UserRepository {
    register(data: Prisma.UserCreateInput): Promise<User>;
    getById(id: string): Promise<User | null>;
}
