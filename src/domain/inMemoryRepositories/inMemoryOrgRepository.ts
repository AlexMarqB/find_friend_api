import { Org, Prisma } from "@prisma/client";
import cuid from "cuid";
import { OrgRepository } from "../repositories/orgRepository";

export class InMemoryOrgRepository implements OrgRepository {
    items: Org[] = []

    async register(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = {
            id: cuid(),
            ...data
        }

        this.items.push(org)

        return org
    }

    async getById(id: string): Promise<Org | null> {
        const org = this.items.find(org => org.id === id)

        return org ?? null
    }

    async listOrgsByCity(city: string): Promise<Org[]> {
        const orgs = this.items.filter(org => org.city.includes(city))

        return orgs
    }
}