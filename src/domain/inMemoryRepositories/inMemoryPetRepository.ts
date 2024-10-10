import { Org, Pet, Prisma } from "@prisma/client";
import { FilterProps, PetRepository } from "../repositories/petRepository";
import cuid from "cuid";


export class InMemoryPetRepository implements PetRepository {
    private items: Pet[] = [];

    async registerPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const {id, age, color, genre, name, org_cnpj, personality, size, species, adopted} = data

        const pet = {
            id: id ?? cuid(),
            age,
            color,
            genre,
            name,
            org_cnpj,
            personality,
            size,
            species,
            adopted: adopted ?? false
        }

        this.items.push(pet);

        return pet;
    }

    async getPetById(id: string): Promise<Pet | null> {
        return this.items.find((pet) => pet.id === id) || null;
    }

    async getPetsByFilter(filteredOrgs: Org[], filters: FilterProps): Promise<Pet[]> {
        return this.items.filter((pet) => {
            return filteredOrgs.some((org) => org.cnpj === pet.org_cnpj) && // Verifica a correspondência do CNPJ
                (!filters.name || pet.name === filters.name) &&               // Verifica o filtro por nome
                (!filters.genre || pet.genre === filters.genre) &&            // Verifica o filtro por gênero
                (!filters.personality || pet.personality === filters.personality) && // Verifica personalidade
                (!filters.age || pet.age === filters.age) &&                  // Verifica idade
                (!filters.species || pet.species === filters.species) &&      // Verifica espécie
                (!filters.color || pet.color === filters.color) &&            // Verifica cor
                (!filters.size || pet.size === filters.size);                 // Verifica tamanho
        });
    }
}