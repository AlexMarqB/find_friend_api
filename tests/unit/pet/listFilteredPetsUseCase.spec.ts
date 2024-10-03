import { describe, it, expect, beforeEach } from "vitest";
import { Org, Species, Size, Personality } from "@prisma/client";
import { ListFilteredPetsUseCase } from "../../../src/domain/useCases/pet/listFilteredPetsUseCase";
import { PetRepository } from "../../../src/domain/repositories/petRepository";
import { InMemoryPetRepository } from "../../../src/domain/inMemoryRepositories/inMemoryPetRepository";

describe("Unity testing listFilteredPetsUseCase", () => {
	let sut: ListFilteredPetsUseCase;
	let petRepository: PetRepository;

	beforeEach(() => {
		petRepository = new InMemoryPetRepository();
		sut = new ListFilteredPetsUseCase(petRepository);
	});

	it("Should list pets based on filters", async () => {
		const org: Org = {
			id: "1",
			name: "Animal Shelter",
			city: "Petville",
			state: "RS",
			phone: "555-1234",
			email: "contact@animalshelter.org"
		};

		await petRepository.register({
			name: "Rex",
			age: 3,
			color: "Brown",
			species: Species.DOG,
			size: Size.MEDIUM,
			personality: Personality.CALM,
			org_id: org.id,
		});

		await petRepository.register({
			name: "Garfield",
			age: 3,
			color: "Orange",
			species: Species.CAT,
			size: Size.LARGE,
			personality: Personality.ACTIVE,
			org_id: org.id,
		});

		const filters = { species: Species.DOG };
		const response = await sut.execute({ orgs: [org], filters });

		expect(response.pets).toHaveLength(1);
		expect(response.pets[0]).toEqual(
			expect.objectContaining({
				name: "Rex",
				age: 3,
			})
		);
	});

	it("Should return an empty list if no pets match the filters", async () => {
		const org: Org = {
			id: "1",
			name: "Animal Shelter",
			city: "Petville",
			state: "RS",
			phone: "555-1234",
			email: "contact@animalshelter.org"
		};

		const filters = { species: Species.CAT, size: Size.SMALL };
		const response = await sut.execute({ orgs: [org], filters });

		expect(response.pets).toHaveLength(0);
	});
});