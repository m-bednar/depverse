
# Depverse Dependency Injector 💉

Deprverse is simple to use and efficient dependency injection manager, that is mainly focused to provide decorator-style dependency injection, but also provides way to inject dependecies in classic functional programming.

**Published as:**  
[npm package 📦](https://www.npmjs.com/package/depverse)

## Advantages of Depverse

- **Open source**
    - You can easily make your own PR or post issue, if you think there is bug or functionality missing.
    - You can explore, how Depverse works inside.
- **Simple**
    - Depverse is aiming to be simple to use, without unnecessary features, that hardly anyone uses.
- **Efficient**
    - Small *(only 1 external dependency)*, efficient and with clean API, that's it!
- **Tested**
    - Unit and integration testing is used to ensure us about Depverse working the way it should.
- **Mockable dependencies**
    - With Depverse you can mock your injectables to be used in tests!

## Examples 

### Common use of dependency injection

```typescript
import { Injectable, Inject, AutoInject } from 'depverse';

@Injectable()
export class HttpService {

    public get(url: string) {
        return fetch(url);
    }

}

@AutoInject()       // This modifies constructor, so when new instance is created, dependencies are automatically injected
class HttpApiCaller {

    @Inject()
    private httpService!: HttpService;

    public getAllDogs() {
        return this.httpService.get('/api/dogs');
    }

}
```  


### Using interface instead of specific type

Sometimes, we want our properties to have type of interface rather than specific implementation. This is sometimes problem for DI managers, because it does not know, which type to instanciate. Howerev, Depverse has solution for that:

```typescript
import { Injectable, Inject, AutoInject  } from 'depverse';

interface IHttpService {
    get(url: string): Promise<any>;
}

@Injectable()
class HttpService implements IHttpService {

    public get(url: string) {
        return fetch(url);
    }

}

@AutoInject()
class HttpApiCaller {

    @Inject(HttpService)
    private httpService!: IHttpService; // Hides implementing type

    public getAllDogs() {
        return this.httpService.get('/api/dogs');
    }

}
```

### Injectables using another injectables

When one injectable relates to another one, you can easily inject one into another, just beware of circular dependency, which can occur when used recklessly. Depverse does not handle circular dependency errors to reduce overhead.

**ConfigService.ts**

```typescript
import { Injectable, Inject } from 'depverse';
import { createConnection } from 'mysql';
import { config } from 'dotenv';

@Injectable()
class ConfigService {

    public readonly config: Record<string, any>;

    constructor() {
        this.config = dotenv.config().parsed;
    }

}

@Injectable()
class DatabaseService {

    @Inject()
    private configService!: ConfigService;

    public connect() {
        return createConnection({
            host: this.configService.config.DB_HOST,
            user: this.configService.config.DB_USER,
            password: this.configService.config.DB_PASSWORD
        });
    }

}
```

### Mocking injectables

Sometimes you need to replace your production solution with something more suitable for testing. That's where Depverse `InjectableMock` comes in play. With this decorator, you can simply replace your dependencies with mocks when testing. Only thing you need to do is set `process.env.USE_INJECTABLE_MOCKS = true` or use `injector.constructWithMocks()` function instead of `injector.construct()`.

```typescript 
import { InjectableMock, Injectable, Inject } from 'depverse';

@Injectable()
class HttpService {

    public get(url: string) {
        return fetch(url);
    }

}

@InjectableMock(HttpService)
class HttpServiceMock {

    public get(url: string) {
        return [];
    }

}

@AutoInject()
class HttpApiCaller {

    @Inject(HttpService)
    private httpService!: IHttpService; // Hides implementing type

    public getAllDogs() {
        return this.httpService.get('/api/dogs');
    }

}

```

**Then when used in tests:**
```typescript

const httpApiCaller = Injector.constructWithMocks(HttpApiCaller);
httpApiCaller.getAllDogs();                     // Calls HttpServiceMock instead of HttpService

// OR

process.env.USE_INJECTABLE_MOCKS = true;        // Do only once in each of your tests file
const httpApiCaller = new HttpApiCaller();
httpApiCaller.getAllDogs();                     // Calls HttpServiceMock 

```
