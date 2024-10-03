import { Prisma, Pet, Personality, Species, Size, Org } from "@prisma/client";

export interface filterProps {
	personality?: Personality;
	age?: number;
	species?: Species;
	color?: String;
	size?: Size;
}

export interface PetRepository {
	register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    listFilteredPets(orgs: Org[], filters: filterProps): Promise<Pet[]>;
    getById(id: string): Promise<Pet | null>;
}
