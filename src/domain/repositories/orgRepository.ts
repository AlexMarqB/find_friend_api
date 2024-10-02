import { Prisma, Pet, Personality, Species, Size, Org } from "@prisma/client";

export interface filterProps {
	personality: Personality;
	age: number;
	species: Species;
	color: String;
	size: Size;
}

export interface OrgRepository {
	register(userId: string, data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
    listOrgsByCity(city: string): Promise<Org[]>;
}
