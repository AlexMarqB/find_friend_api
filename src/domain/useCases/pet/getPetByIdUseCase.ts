import { Pet } from "@prisma/client";
import { PetRepository } from "../../repositories/petRepository";

interface GetPetByIdUseCaseRequest {
    id: string
}

interface GetPetByIdUseCaseResponse {
    pet: Pet | null
}

export class GetPetByIdUseCase {
    constructor(private repository: PetRepository) {}

    async execute({id}: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
        const pet = await this.repository.getById(id)

        return {
            pet
        }
    }
}