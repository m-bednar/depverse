
import { Class } from "../types/Class";

export class UninjectableTypeError extends Error {

    constructor(injectedType: Class, uninjectedType: Class) {
        super(`Uninjectable type '${uninjectedType.name}' found while injecting '${injectedType.name}'`);
    }

}
