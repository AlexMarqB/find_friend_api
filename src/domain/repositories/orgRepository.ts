import { Prisma, Org } from "@prisma/client";

export interface OrgRepository {
	register(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
	getById(id: string): Promise<Org | null>;
    listOrgsByCity(city: string): Promise<Org[]>;
}
