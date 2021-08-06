import { Class } from "./Class";

export type Instance<T extends object = Record<PropertyKey, any>> = T & { constructor: Class<T> };
