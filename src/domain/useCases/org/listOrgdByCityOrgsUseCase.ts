import { Org } from "@prisma/client"
import { OrgRepository } from "../../repositories/orgRepository"


interface ListFilteredOrgsRequest {
    city:  string
}

interface ListFilteredOrgsResponse {
    orgs: Org[]
}

export class ListFilteredOrgsUseCase {
    constructor(private repository: OrgRepository) {}

    async execute({city}: ListFilteredOrgsRequest): Promise<ListFilteredOrgsResponse> {
        const orgs = await this.repository.listOrgsByCity(city)

        return {
            orgs
        }
    }
}