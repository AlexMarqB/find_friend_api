import { Org, States } from "@prisma/client";
import { OrgRepository } from "../../repositories/orgRepository";
import { ResourceNotFoundError } from "../../../errors/ResourceNotFoundError";
import { _bcrypt } from "../../../lib/bcrypt";

interface RegisterOrgRequest {
    id?: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    city: string;
    state: States;
}

interface RegisterOrgResponse {
    org: Org
}

export class RegisterOrgUseCase {
    constructor(private repository: OrgRepository) {}
        
    async execute({id, name, phone, email, password, city, state}: RegisterOrgRequest): Promise<RegisterOrgResponse> {
        const hashPassword = await _bcrypt.hash(password, 10)

        const org = await this.repository.register({
            id,
            name,
            phone,
            email,
            password: hashPassword,
            city,
            state
        })

        return {
            org
        }
    }
}