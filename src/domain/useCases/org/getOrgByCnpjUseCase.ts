import { Org } from "@prisma/client";
import { OrgRepository } from "../../repositories/orgRepository";

interface GetOrgByCnpjUseCaseRequest {
    cnpj: string
}

interface GetOrgByCnpjUseCaseResponse {
    org: Org | null
}

export class GetOrgByCnpjUseCase {
    constructor(private repository: OrgRepository) {}

    async execute({cnpj}: GetOrgByCnpjUseCaseRequest): Promise<GetOrgByCnpjUseCaseResponse> {
        const org = await this.repository.getByCnpj(cnpj)

        return {
            org
        }
    }
}