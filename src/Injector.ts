import { Class } from './types/Class';

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
        return new cls(...constructorArgs);
    }

    /**
     * Injects dependencies into given instance.
     * @param instance Instance, where dependencies will be injected.
     * @returns Same instance as passed, but with injected dependencies.
     */
    public inject<T>(instance: T): T {
        const blacklistedTypes = ['Object', 'Function', 'String', 'Number', 'Symbol', 'BigInt'];
        return instance;
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
