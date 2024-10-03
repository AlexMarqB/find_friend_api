import { Personality, Pet, Prisma, Size, Species } from "@prisma/client";
import { PetRepository } from "../../repositories/petRepository";

interface RegisterPetRequest {
    name: string;
    age: number;
    color: string;
    species: Species;
    size: Size;
    personality: Personality;
    org_id: string;
}

interface RegisterPetResponse {
    pet: Pet
}

export class RegisterPetUseCase {
    constructor(private repository: PetRepository) {}
        
    async execute({name, age, color, species, size, personality, org_id}: RegisterPetRequest): Promise<RegisterPetResponse> {
        
        const pet = await this.repository.register({
            name,
            age,
            color,
            species,
            size,
            personality,
            org_id
        })

        return {
            pet
        }
    }
}