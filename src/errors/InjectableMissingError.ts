import { Class } from "../types/Class";

export class InjectableMissingError extends Error {

    constructor(injectedType: Class, missingInjectable: Class) {
        super(`Injectable '${missingInjectable.name}' is missing when trying to inject to type '${injectedType.name}'`);
    }

}
