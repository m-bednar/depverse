import { Injector } from '../Injector';
import { Class } from '../types/Class';

export function Injectable(injector: Injector = Injector.default) {
    return (target: Class) => {
        injector.addInjectable(target);
    };
}
