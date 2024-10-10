import { Genre, Prisma, Size } from "@prisma/client";
import { PetRepository } from "../../repositories/petRepository";
import { OrgRepository } from "../../repositories/orgRepository";
import { InvalidDataError } from "../../../errors/InvalidDataError";
import { formatCnpj, isValidCNPJ } from "../../../utils/cnpj";
import { z } from "zod";

export class RegisterPetUseCase {
    constructor(
        private repository: PetRepository,
        private orgRepository: OrgRepository
    ) {}

    async execute(data: Prisma.PetUncheckedCreateInput) {
        const registerPetSchema = z.object({
            id: z.string().optional(),
            age: z.number(),
            color: z.string(),
            genre: z.nativeEnum(Genre),
            name: z.string(),
            org_cnpj: z.string(),
            personality: z.string(),
            size: z.nativeEnum(Size),
            species: z.string(),
            adopted: z.boolean().optional()
        });

        const parsed = registerPetSchema.safeParse(data);

        if (!parsed.success) {
            throw new InvalidDataError();
        }

        const { org_cnpj, ...props } = parsed.data;

        if (!isValidCNPJ(org_cnpj)) {
            throw new InvalidDataError();
        }

        const formatedCnpj = formatCnpj(org_cnpj);

        if (!await this.orgRepository.getOrgByCnpj(formatedCnpj)) {
            throw new InvalidDataError();
        }

        return this.repository.registerPet({ org_cnpj: formatedCnpj, ...props });
    }
}