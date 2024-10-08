
export class InvalidDataError extends Error {
    constructor(message: string = "Invalid data provided") {
        super(message);
    }
}