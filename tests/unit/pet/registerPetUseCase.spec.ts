import { ResourceNotFoundError } from "../../../src/errors/ResourceNotFoundError";
import { RegisterPetUseCase } from "../../../src/domain/useCases/pet/registerPetUseCase";
import { Species, Size, Personality } from "@prisma/client";
import { beforeEach, describe, expect, it } from "vitest";
import { PetRepository } from "../../../src/domain/repositories/petRepository";
import { OrgRepository } from "../../../src/domain/repositories/orgRepository";
import { InMemoryPetRepository } from "../../../src/domain/inMemoryRepositories/inMemoryPetRepository";
import { InMemoryOrgRepository } from "../../../src/domain/inMemoryRepositories/inMemoryOrgRepository";

describe("Unity testing registerPetUseCase", () => {
    let sut: RegisterPetUseCase;
    let petRepository: PetRepository;
    let orgRepository: OrgRepository;

    beforeEach(() => {
        petRepository = new InMemoryPetRepository();
        orgRepository = new InMemoryOrgRepository();
        sut = new RegisterPetUseCase(petRepository, orgRepository);
    });

    it("Should register a pet", async () => {
        const org = await orgRepository.register("1", {
            name: "Animal Shelter",
            city: "Petville",
            state: "RS",
            phone: "555-1234",
            email: "contact@animalshelter.org"
        });

        const response = await sut.execute({
            name: "Rex",
            age: 3,
            color: "Brown",
            species: Species.DOG,
            size: Size.MEDIUM,
            personality: Personality.CALM,
            org_id: org.id,
        });

        expect(response.pet).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: "Rex",
                age: 3,
                color: "Brown",
                species: Species.DOG,
                size: Size.MEDIUM,
                personality: Personality.CALM,
            })
        );
    });

    it("Should not be able to register a pet if the org does not exist", async () => {
        await expect(sut.execute({
            name: "Rex",
            age: 3,
            color: "Brown",
            species: Species.DOG,
            size: Size.MEDIUM,
            personality: Personality.CALM,
            org_id: "non-existent-org-id",
        })).rejects.toThrow(ResourceNotFoundError);
    });
});