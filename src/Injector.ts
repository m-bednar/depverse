import { InjectableMissingError } from './errors/InjectableMissingError';
import { InjectableMockMissingError } from './errors/InjectableMockMissingError';
import { UninjectableTypeError } from './errors/UninjectableTypeError';
import { MetadataKeys } from './MetadataKeys';
import { Class } from './types/Class';
import { Instance } from './types/Instance';

export class Injector {

    public static readonly default = new Injector();

    private readonly injectables = new Map<Class, object>();
    private readonly mocks = new Map<Class, object>();

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
     * Constructs new instance from given class with mocked dependencies injected.
     * @param cls Class to be constructed.
     * @param constructorArgs Arguments, that will be passed to constructor.
     * @returns Instance of passed class with all mocked dependencies injected.
     */
    public constructWithMocks<T>(cls: Class<T>, ...constructorArgs: any): T {
        const instance: any = new cls(...constructorArgs);
        this.injectWithMocks(instance);
        return instance;
    }

    /**
     * Injects dependencies into given instance.
     * @param instance Instance, where dependencies will be injected.
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

    /**
     * Injects mocked dependencies into given instance.
     * @param instance Instance, where dependencies will be injected.
     */
    public injectWithMocks<T extends Instance>(instance: T) {
        const uninjectableTypes = ['Object', 'Function', 'String', 'Number', 'Symbol', 'BigInt'];
        const metadata: any[] = Reflect.getMetadata(MetadataKeys.Inject, instance.constructor) ?? [];
        for (const { key, propType } of metadata) {
            if (uninjectableTypes.includes(propType)) {
                throw new UninjectableTypeError(instance.constructor, propType);
            }
            if (!this.mocks.has(propType)) {
                throw new InjectableMockMissingError(instance.constructor, propType);
            }
            instance[key] = this.mocks.get(propType)
        }
    }

    public addInjectable<T extends object>(cls: Class<T>) {
        if (this.injectables.has(cls)) {
            throw Error(`Class ${cls.name} already added as injectable.`);
        }
        const instance = this.construct(cls);
        this.injectables.set(cls, instance);
    }

    public addInjectableMock<T extends object>(mockedCls: Class<T>, cls: Class<T>) {
        if (this.mocks.has(mockedCls)) {
            throw Error(`Class ${cls.name} already added as injectable mock.`);
        }
        const instance = this.construct(cls);
        this.mocks.set(mockedCls, instance);
    }

    public getAllInjectables() {
        return [ ...this.injectables.keys() ];
    }

    public clearAllInjectables() {
        this.injectables.clear();
    }
    
}
