import 'reflect-metadata';
import { MetadataKeys } from '../MetadataKeys';

/**
 * Property decorator marking property, which value should be injected by Injector.
 * @returns Decorator function.
 */
export function Inject() {
    return (target: Record<PropertyKey, any>, key: string) => {
        const propType = Reflect.getMetadata('design:type', target, key);
        const metadata = Reflect.getMetadata(MetadataKeys.Inject, target.constructor) || [];
        metadata.push({ key, propType });
        Reflect.defineMetadata(MetadataKeys.Inject, metadata, target.constructor);
    }
}
