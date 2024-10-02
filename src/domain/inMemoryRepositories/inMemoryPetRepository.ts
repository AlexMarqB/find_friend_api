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
        const pets = orgs.flatMap(org => this.items.filter(pet => {
            return pet.org_id === org.id &&
                pet.personality === filters.personality &&
                pet.age === filters.age &&
                pet.species === filters.species &&
                pet.color === filters.color &&
                pet.size === filters.size
        }))

        return pets
    }

    async getDetails(id: string): Promise<Pet | null> {
        const pet = this.items.find(pet => pet.id === id)

        return pet ?? null
    }
}