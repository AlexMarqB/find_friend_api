import { Personality, Pet, Prisma, Size, Species } from "@prisma/client";
import { PetRepository } from "../../repositories/petRepository";
import { OrgRepository } from "../../repositories/orgRepository";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";

interface RegisterPetRequest {
    id?: string;
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
    constructor(private repository: PetRepository, private orgRepository: OrgRepository) {}
        
    async execute({name, age, color, species, size, personality, org_id}: RegisterPetRequest): Promise<RegisterPetResponse> {

        const org = await this.orgRepository.getById(org_id)

        console.log(org)

        if(!org) {
            throw new ResourceNotFoundError()
        }
        
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