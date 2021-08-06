import { InjectableMissingError } from './errors/InjectableMissingError';
import { UninjectableTypeError } from './errors/UninjectableTypeError';
import { MetadataKeys } from './MetadataKeys';
import { Class } from './types/Class';
import { Instance } from './types/Instance';

export class Injector {

    public static readonly default = new Injector();

    private readonly injectables = new Map<Class, any>();

    /**
     * Constructs new instance from given class with all dependencies already injected.
     * @param cls Class to be constructed.
     * @param constructorArgs Arguments, that will be passed to constructor.
     * @returns Instance of passed class with all dependencies injected.
     */
    public construct<T>(cls: Class<T>, ...constructorArgs: any): T {
        const instance: any = new cls(...constructorArgs);
        this.inject(instance);
        return instance;
    }

    /**
     * Injects dependencies into given instance.
     * @param instance Instance, where dependencies will be injected.
     * @returns Same instance as passed, but with injected dependencies.
     */
    public inject<T extends Instance>(instance: T) {
        const uninjectableTypes = ['Object', 'Function', 'String', 'Number', 'Symbol', 'BigInt'];
        const metadata: any[] = Reflect.getMetadata(MetadataKeys.Inject, instance.constructor) ?? [];
        for (const { key, propType } of metadata) {
            if (uninjectableTypes.includes(propType)) {
                throw new UninjectableTypeError(instance.constructor, propType);
            }
            if (!this.injectables.has(propType)) {
                throw new InjectableMissingError(instance.constructor, propType);
            }
            instance[key] = this.injectables.get(propType)
        }
    }

    public addInjectable<T>(cls: Class<T>) {
        if (this.injectables.has(cls)) {
            throw Error(`Class ${cls.name} already added as injectable.`);
        }
        const instance = this.construct(cls);
        this.injectables.set(cls, instance);
    }

    public getAllInjectables() {
        return [ ...this.injectables.keys() ];
    }

    public clearAllInjectables() {
        this.injectables.clear();
    }
    
}
