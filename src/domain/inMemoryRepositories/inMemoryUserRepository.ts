import { Prisma, User, Role } from "@prisma/client";
import { UserRepository } from "../repositories/userRepository";
import cuid from "cuid";

export class InMemoryUserRepository implements UserRepository {
    items: User[] = []

    async register(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: cuid(),
            org_id: null,
            role: Role.USER,
            ...data
        }

        this.items.push(user)

        return user
    }

    async getById(id: string): Promise<User | null> {
        const user = this.items.find(user => user.id === id)

        return user ?? null
    }
}