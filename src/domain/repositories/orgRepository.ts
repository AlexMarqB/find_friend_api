import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
    registerOrg(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
    getOrgByCnpj(cnpj: string): Promise<Org | null>;
    getOrgsByCity(city: string): Promise<Org[]>;
}