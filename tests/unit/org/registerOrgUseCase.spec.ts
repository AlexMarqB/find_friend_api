import { ResourceNotFoundError } from "../../../src/errors/ResourceNotFoundError";
import { Species, Size, Personality } from "@prisma/client";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgRepository } from "../../../src/domain/repositories/orgRepository";
import { InMemoryOrgRepository } from "../../../src/domain/inMemoryRepositories/inMemoryOrgRepository";
import { RegisterOrgUseCase } from "../../../src/domain/useCases/org/registerOrgUseCase";
import { InvalidDataError } from "../../../src/errors/InvalidDataError";

describe("Unity testing registerPetUseCase", () => {
	let sut: RegisterOrgUseCase;
	let repository: OrgRepository;

	beforeEach(() => {
		repository = new InMemoryOrgRepository();
		sut = new RegisterOrgUseCase(repository);
	});

	it("Should register a org", async () => {
		const response = await sut.execute({
			id: "1",
			name: "Animal Shelter",
            cnpj: "12.345.678/0001-95",
			city: "Petville",
			state: "RS",
			phone: "555-1234",
			email: "contact@animalshelter.org",
			password: "123456",
		});

		expect(response.org).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: "Animal Shelter",
				city: "Petville",
				state: "RS",
			})
		);
	});

	it("Should not be able to register a org with the same cnpj as others", async () => {
        await sut.execute({
			id: "1",
			name: "Animal Shelter",
            cnpj: "12.345.678/0001-95",
			city: "Petville",
			state: "RS",
			phone: "555-1234",
			email: "contact@animalshelter.org",
			password: "123456",
		});

		await expect(
			await sut.execute({
                id: "2",
                name: "Animal Shelter 2",
                cnpj: "12.345.678/0001-95",
                city: "São Paulo",
                state: "SP",
                phone: "16 9 9999-9999",
                email: "emprise@animalhome.org",
                password: "123456",
            })
		).rejects.toBeInstanceOf(InvalidDataError);
	});
});
