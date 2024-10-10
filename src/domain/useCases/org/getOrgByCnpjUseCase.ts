import { z } from "zod";
import { InvalidDataError } from "../../../errors/InvalidDataError";
import { formatCnpj, isValidCNPJ } from "../../../utils/cnpj";
import { OrgRepository } from "../../repositories/orgRepository";

export class getOrgByCnpjUseCase {

    constructor(private repository: OrgRepository) {}

    async execute(cnpj: string) {
        const cnpjSchema = z.string();

        const parsed = cnpjSchema.safeParse(cnpj);

        if(!parsed.success) {
            throw new InvalidDataError(parsed.error.errors[0].message);
        }

        
        if(!isValidCNPJ(parsed.data)) {
            throw new InvalidDataError("CNPJ inválido");
        }

        const format = formatCnpj(parsed.data);

        return this.repository.getOrgByCnpj(formatCnpj(format));
    }
}