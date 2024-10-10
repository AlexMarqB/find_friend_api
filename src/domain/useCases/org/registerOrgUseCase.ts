import { Prisma, State, Country } from "@prisma/client";
import { OrgRepository } from "../../repositories/orgRepository";
import { formatCnpj, isValidCNPJ } from "../../../utils/cnpj";
import { InvalidDataError } from "../../../errors/InvalidDataError";
import { z } from "zod";

export class RegisterOrgUseCase {
    constructor(private repository: OrgRepository) {}

    async execute(data: Prisma.OrgUncheckedCreateInput) {
        const registerOrgSchema = z.object({
            city: z.string(),
            cnpj: z.string(),
            email: z.string().email(),
            name: z.string(),
            password: z.string(),
            phone: z.string(),
            state: z.nativeEnum(State),
            country: z.nativeEnum(Country).optional()
        })

        const parsed = registerOrgSchema.safeParse(data);

        if(!parsed.success) {
            throw new InvalidDataError(parsed.error.errors[0].message);
        }
        
        const {cnpj, ...props} = parsed.data;

        if(!isValidCNPJ(cnpj)) {
            throw new InvalidDataError("CNPJ inválido");
        }

        if(await this.repository.getOrgByCnpj(cnpj)) {
            throw new InvalidDataError("Organização já cadastrada");
        }
        
        return this.repository.registerOrg({cnpj: formatCnpj(cnpj), ...props});
    }
}