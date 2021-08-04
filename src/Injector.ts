import { Class } from './types/Class';

export class Injector {

   /**
    * Constructs new instance from given class with all dependencies already injected.
    * @param cls Class to be constructed.
    * @param constructorArgs Arguments, that will be passed to constructor.
    * @returns Instance of passed class with all dependencies injected.
    */
   construct<T>(cls: Class<T>, ...constructorArgs: any): T {
      return new cls(...constructorArgs);
   }

   /**
    * Injects dependencies into given instance.
    * @param instance Instance, where dependencies will be injected. 
    * @returns Same instance as passed, but with injected dependencies.
    */
   inject<T>(instance: T): T {
      return instance;
   }

}
