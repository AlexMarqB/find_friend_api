import { Org, Pet, Prisma } from "@prisma/client";
import { filterProps, PetRepository } from "../repositories/petRepository";
import cuid from "cuid";

export class InMemoryPetRepository implements PetRepository {
    items:Pet[] = []

    async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = {
            id: cuid(),
            adopted: false, // default value for adopted
            ...data
        }

        this.items.push(pet)

        return pet
    }

    async listFilteredPets(orgs: Org[], filters: filterProps): Promise<Pet[]> {
        const pets = orgs.flatMap(org => 
            this.items.filter(pet => {
                return pet.org_id === org.id &&
                    (!filters.personality || pet.personality === filters.personality) &&
                    (!filters.age || pet.age === filters.age) &&
                    (!filters.species || pet.species === filters.species) &&
                    (!filters.color || pet.color === filters.color) &&
                    (!filters.size || pet.size === filters.size)
            })
        )
    
        return pets
    }

    async getById(id: string): Promise<Pet | null> {
        const pet = this.items.find(pet => pet.id === id)

        return pet ?? null
    }
}