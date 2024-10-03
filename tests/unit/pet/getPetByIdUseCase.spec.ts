import { describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "../../../src/domain/inMemoryRepositories/inMemoryPetRepository";
import { Personality, Size, Species } from "@prisma/client";
import { GetPetByIdUseCase } from "../../../src/domain/useCases/pet/getPetByIdUseCase";
import { ResourceNotFoundError } from "../../../src/errors/ResourceNotFoundError";

let repository = new InMemoryPetRepository();
let sut = new GetPetByIdUseCase(repository);

describe("Unity testing getPetByIdUseCase", async () => {
	it("Should be able to get a pet by its Id", async () => {
		const pet = await repository.register({
            id: "1",
			name: "Rex",
			age: 3,
			color: "Brown",
			species: Species.DOG,
			size: Size.MEDIUM,
			personality: Personality.CALM,
			org_id: "1",
		});

        const response = await sut.execute({id: "1"});

		expect(response.pet).toBeDefined();

		expect(response.pet!.id).toEqual(expect.any(String));
	});

	it("Should return null if no pet was found", async () => {
		await expect((await sut.execute({id: "2"})).pet).toBeNull()
	})
});
