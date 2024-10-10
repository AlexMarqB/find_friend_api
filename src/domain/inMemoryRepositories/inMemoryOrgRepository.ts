import { Country, Org, Prisma } from "@prisma/client";
import { OrgRepository } from "../repositories/orgRepository";

export class InMemoryOrgRepository implements OrgRepository {
    private items: Org[] = [];

    async registerOrg(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const {city, cnpj, email, name, password, phone, state, country } = data;

        const org = {
            cnpj,
            city,
            email,
            name,
            password,
            phone,
            state,
            country: country ?? Country.BR
        }

        this.items.push(org);
        return org;
        
    }

    async getOrgByCnpj(cnpj: string): Promise<Org | null> {
        return this.items.find((org) => org.cnpj === cnpj) || null;
        
    }

    async getOrgsByCity(city: string): Promise<Org[]> {
        return this.items.filter((org) => org.city.includes(city));
    }

}