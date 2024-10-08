import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "../../../src/domain/inMemoryRepositories/inMemoryOrgRepository";
import { GetOrgByIdUseCase } from "../../../src/domain/useCases/org/getOrgByIdUseCase";
import { ResourceNotFoundError } from "../../../src/errors/ResourceNotFoundError";



describe("Unity testing getOrgByIdUseCase", async () => {
    let repository = new InMemoryOrgRepository();
    let sut = new GetOrgByIdUseCase(repository);

    beforeEach(() => {
        repository = new InMemoryOrgRepository();
        sut = new GetOrgByIdUseCase(repository);
    });
    
	it("Should be able to get an organization by its Id", async () => {
		const org = await repository.register({
			id: "1",
			name: "Animal Shelter",
			city: "Petville",
			state: "RS",
			email: "contact@email.com",
			password: "123456",
			phone: "123-456-7890",
		});

		const response = await sut.execute({ id: "1" });

		expect(response.org).toBeDefined();
		expect(response.org!.id).toEqual(expect.any(String));
	});

	it("Should return null if no organization was found", async () => {
		await expect((await sut.execute({ id: "2" })).org).rejects.toBeInstanceOf(
			ResourceNotFoundError
		);
	});
});
