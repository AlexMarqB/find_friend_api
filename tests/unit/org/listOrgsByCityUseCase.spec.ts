import { Org, States } from "@prisma/client";
import { OrgRepository } from "../../../src/domain/repositories/orgRepository";
import { InMemoryOrgRepository } from "../../../src/domain/inMemoryRepositories/inMemoryOrgRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListOrgdByCityOrgsUseCase } from "../../../src/domain/useCases/org/listOrgdByCityOrgsUseCase";

describe("Unity testing listOrgsByCityUseCase", () => {
    let sut: ListOrgdByCityOrgsUseCase;
    let orgRepository: OrgRepository;

    beforeEach(() => {
        orgRepository = new InMemoryOrgRepository();
        sut = new ListOrgdByCityOrgsUseCase(orgRepository);
    });

    it("Should list organizations based on city filters", async () => {
        const org: Org = {
            id: "1",
            name: "Animal Shelter",
            city: "Petville",
            state: "RS",
            phone: "555-1234",
            email: "contact@animalshelter.org",
            password: "123456"
        };

        await orgRepository.register(org);

        const response = await sut.execute({ city: "Petville" });

        expect(response.orgs).toHaveLength(1);
        expect(response.orgs[0]).toEqual(
            expect.objectContaining({
                city: "Petville",
            })
        );
    });

    it("Should return an empty list if no organizations match the city filter", async () => {
        const org: Org = {
            id: "1",
            name: "Animal Shelter",
            city: "Petville",
            state: "RS",
            phone: "555-1234",
            email: "contact@animalshelter.org",
            password: "123456"
        };

        await orgRepository.register(org);

        const response = await sut.execute({ city: "Nonexistent City" });

        expect(response.orgs).toHaveLength(0);
    });
});