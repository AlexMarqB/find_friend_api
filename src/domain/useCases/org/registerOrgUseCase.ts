import { Org, States } from "@prisma/client";
import { OrgRepository } from "../../repositories/orgRepository";
import { _bcrypt } from "../../../lib/bcrypt";
import { isValidCNPJ } from "../../../utils/validateCnpj";
import { InvalidDataError } from "../../../errors/InvalidDataError";

interface RegisterOrgRequest {
	id?: string;
	name: string;
	cnpj: string;
	phone: string;
	email: string;
	password: string;
	city: string;
	state: States;
}

interface RegisterOrgResponse {
	org: Org;
}

export class RegisterOrgUseCase {
	constructor(private repository: OrgRepository) {}

	async execute({
		id,
		name,
		phone,
		email,
		cnpj,
		password,
		city,
		state,
	}: RegisterOrgRequest): Promise<RegisterOrgResponse> {
		const hashPassword = await _bcrypt.hash(password, 10);

		if (!isValidCNPJ(cnpj)) {
			throw new InvalidDataError("Invalid CNPJ");
		}

        const orgExists = await this.repository.getByCnpj(cnpj);

        if(orgExists) {
            throw new InvalidDataError("CNPJ already in use");
        }

		const org = await this.repository.register({
			id,
			name,
			cnpj,
			phone,
			email,
			password: hashPassword,
			city,
			state,
		});

		return {
			org,
		};
	}
}
