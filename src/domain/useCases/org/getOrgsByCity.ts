import { z } from "zod";
import { OrgRepository } from "../../repositories/orgRepository";
import { InvalidDataError } from "../../../errors/InvalidDataError";

export class getOrgsByCityUseCase {
    constructor(private repository: OrgRepository) {}

    async execute(city: string) {
        const citySchema = z.string();

        const parsed = citySchema.safeParse(city);

        if(!parsed.success) {
            throw new InvalidDataError(parsed.error.errors[0].message);
        }
        
        return this.repository.getOrgsByCity(parsed.data);
    }
}