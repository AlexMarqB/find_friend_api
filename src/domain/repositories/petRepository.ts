import { Prisma, Pet, Size, Genre, Org } from "@prisma/client";

export interface FilterProps {
    name?: string;
    genre?: Genre;
    personality?: string;
    age?: number;
    species?: string;
    color?: string;
    size?: Size;
}

export interface PetRepository {
    registerPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    getPetById(id: string): Promise<Pet | null>;
    getPetsByFilter(filteredOrgs: Org[], filters: FilterProps): Promise<Pet[]>;
}