import { Class } from '../types/Class';

export class InjectableMockMissingError extends Error {

    constructor(injectedType: Class, missingInjectable: Class) {
        super(`Injectable mock of '${missingInjectable.name}' is missing when trying to inject to type '${injectedType.name}'`);
    }

}

