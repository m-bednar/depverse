import 'reflect-metadata';
import { Injector } from '../Injector';
import { Class } from '../types/Class';

/**
 * Class decorator mutating constructor of given class to inject itself with dependencies on construction.
 * @returns Decorator function.
 */
export function AutoInject(injector: Injector = Injector.default) {
    return (target: Class) => {
        let constructingMethod = injector.construct.bind(injector);
        if (process.env.USE_INJECTABLE_MOCKS === 'true') {
            constructingMethod = injector.constructWithMocks.bind(injector);
        }
        function autoInjectConstructor(...args: any) {
            return constructingMethod(target, ...args);
        }
        autoInjectConstructor.prototype = target.prototype;
        return <any>autoInjectConstructor;
    }
}
