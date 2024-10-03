import { Org, Pet } from "@prisma/client";
import { filterProps, PetRepository } from "../../repositories/petRepository";

interface ListFilteredPetsRequest {
    orgs: Org[];
    filters: filterProps
}

interface ListFilteredPetsResponse {
    pets: Pet[]
}

export class ListFilteredPetsUseCase {
    constructor(private repository: PetRepository) {}

    async execute({orgs, filters}: ListFilteredPetsRequest): Promise<ListFilteredPetsResponse> {
        const pets = await this.repository.listFilteredPets(orgs, filters)

        return {
            pets
        }
    }
}