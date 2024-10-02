import { Org, Prisma } from "@prisma/client";
import cuid from "cuid";
import { OrgRepository } from "../repositories/orgRepository";

export class InMemoryPetRepository implements OrgRepository {
    items: Org[] = []

    async register(userId: string, data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = {
            id: cuid(),
            user_id: userId,
            ...data
        }

        this.items.push(org)

        return org
    }

    async listOrgsByCity(city: string): Promise<Org[]> {
        const orgs = this.items.filter(org => org.city === city)

        return orgs
    }
}