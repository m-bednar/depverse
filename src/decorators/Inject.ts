import 'reflect-metadata';
import { MetadataKeys } from '../MetadataKeys';
import { Class } from '../types/Class';

/**
 * Property decorator marking property, which value should be injected by Injector.
 * @param typeAlias Type used as injecting type instead of actual type of property.
 * @returns Decorator function.
 */
export function Inject(typeAlias?: Class) {
    return (target: Record<PropertyKey, any>, key: string) => {
        const propType = typeAlias ?? Reflect.getMetadata('design:type', target, key);
        const metadata = Reflect.getMetadata(MetadataKeys.Inject, target.constructor) ?? [];
        metadata.push({ key, propType });
        Reflect.defineMetadata(MetadataKeys.Inject, metadata, target.constructor);
    }
}
