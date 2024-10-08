import { Org } from "@prisma/client";
import { OrgRepository } from "../../repositories/orgRepository";

interface GetOrgByIdUseCaseRequest {
    id: string
}

interface GetOrgByIdUseCaseResponse {
    org: Org | null
}

export class GetOrgByIdUseCase {
    constructor(private repository: OrgRepository) {}

    async execute({id}: GetOrgByIdUseCaseRequest): Promise<GetOrgByIdUseCaseResponse> {
        const org = await this.repository.getById(id)

        return {
            org
        }
    }
}