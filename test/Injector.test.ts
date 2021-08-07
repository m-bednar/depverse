import { expect } from 'chai';
import { Inject, Injector } from '../src';

describe('Injector', () => {

    class Dep1 {
        public x = 0;
    }
    
    class Dep2 {
        public y = 'dep2';
    }

    class Dep1Mock implements Dep1 {
        public x = 1;
        public mocked = true;
    }
    
    class Dep2Mock implements Dep2 {
        public y = 'mock';
        public mocked = true;
    }
    
    function makeClass() {
        class Cls {
            constructor(public readonly arg?: number) {}
    
            @Inject()
            public dep1!: Dep1;
    
            @Inject()
            public dep2!: Dep2;
    
            @Inject()
            public dep1Twin!: Dep1;
        }
        return Cls;
    }

    let injector: Injector;

    beforeEach(() => {
        injector = new Injector();
    });

    describe('construct()', () => {

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector.addInjectable(Dep1);
                injector.addInjectable(Dep2);
            });

            it('should return instance with all injected dependencies', () => {
                const cls = makeClass();
                const instance = injector.construct(cls);
                expect(instance).to.be.an('object').and.to.have.property('dep1').instanceOf(Dep1);
                expect(instance).to.be.an('object').and.to.have.property('dep2').instanceOf(Dep2);
                expect(instance).to.be.an('object').and.to.have.property('dep1Twin', instance.dep1);
            });

            it('should pass arguments to the constructor', () => {
                const cls = makeClass();
                const instance = injector.construct(cls, 42);
                expect(instance).to.be.an('object').and.to.have.property('arg', 42);
            });
        });

        context('when dependency is missing', () => {

            beforeEach(() => {
                injector.addInjectable(Dep1);
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                expect(injector.construct.bind(injector, cls)).to.throw();
            });

        });
    });

    describe('constructWithMocks()', () => { 

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector.addInjectableMock(Dep1, Dep1Mock);
                injector.addInjectableMock(Dep2, Dep2Mock);
            });

            it('should return instance with all injected dependencies', () => {
                const cls = makeClass();
                const instance = injector.constructWithMocks(cls);
                expect(instance).to.be.an('object').and.to.have.property('dep1').instanceOf(Dep1Mock);
                expect(instance).to.be.an('object').and.to.have.property('dep2').instanceOf(Dep2Mock);
                expect(instance).to.be.an('object').and.to.have.property('dep1Twin', instance.dep1);
            });

            it('should pass arguments to the constructor', () => {
                const cls = makeClass();
                const instance = injector.constructWithMocks(cls, 42);
                expect(instance).to.be.an('object').and.to.have.property('arg', 42);
            });

        });

        context('when dependency is missing', () => {

            beforeEach(() => {
                injector.addInjectableMock(Dep1, Dep1Mock);
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                expect(injector.constructWithMocks.bind(injector, cls)).to.throw();
            });

        });

    });

    describe('inject()', () => {

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector.addInjectable(Dep1);
                injector.addInjectable(Dep2);
            });

            it('should inject all dependencies', () => {
                const cls = makeClass();
                const instance: any = new cls();
                injector.inject(instance);
                expect(instance.dep1).to.be.instanceOf(Dep1);
                expect(instance.dep2).to.be.instanceOf(Dep2);
                expect(instance.dep1Twin).to.be.instanceOf(Dep1);
            });

        });

        context('when dependency is missing', () => {

            beforeEach(() => {
                injector.addInjectable(Dep1);
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                const instance: any = new cls();
                expect(injector.inject.bind(injector, instance)).to.throw();
            });

        });

    });

    describe('injectWithMocks()', () => { 

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector.addInjectableMock(Dep1, Dep1Mock);
                injector.addInjectableMock(Dep2, Dep2Mock);
            });

            it('should inject all dependencies', () => {
                const cls = makeClass();
                const instance: any = new cls();
                injector.injectWithMocks(instance);
                expect(instance.dep1).to.be.instanceOf(Dep1Mock);
                expect(instance.dep2).to.be.instanceOf(Dep2Mock);
                expect(instance.dep1Twin).to.be.instanceOf(Dep1Mock);
            });

        });

        context('when dependency is missing', () => {

            beforeEach(() => {
                injector.addInjectableMock(Dep1, Dep1Mock);
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                const instance: any = new cls();
                expect(injector.injectWithMocks.bind(injector, instance)).to.throw();
            });

        });

    });

});
