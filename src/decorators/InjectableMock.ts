import { Injector } from '../Injector';
import { Class } from '../types/Class';

export function InjectableMock<T extends object>(mocked: Class<T>, injector: Injector = Injector.default) {
    return (target: Class<T>) => {
        injector.addInjectableMock<T>(mocked, target);
    };
}
