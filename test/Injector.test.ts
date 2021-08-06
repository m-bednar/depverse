import { expect } from 'chai';
import { Inject, Injectable, Injector } from '../src';
import { Instance } from '../src/types/Instance';

describe('Injector', () => {

    class Dep1 {
        public x = 0;
    }
    
    class Dep2 {
        public y = '';
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

    describe('construct()', () => {

        let injector: Injector;

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector = new Injector();
                Injectable(injector)(Dep1); // Apply Injectable decorator manually
                Injectable(injector)(Dep2); // Apply Injectable decorator manually
            });

            it('should return instance with all injected dependencies', () => {
                const cls = makeClass();
                const instance = injector.construct(cls);
                expect(instance).to.be.an('object').and.to.have.property('dep1').instanceOf(Dep1);
                expect(instance).to.be.an('object').and.to.have.property('dep1').instanceOf(Dep1);
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
                injector = new Injector();
                Injectable(injector)(Dep1); // Apply Injectable decorator only on Dep1
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                expect(injector.construct.bind(injector, cls)).to.throw();
            });

        });
    });

    describe('inject()', () => {
        
        let injector: Injector;

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector = new Injector();
                Injectable(injector)(Dep1);  // Apply Injectable decorator manually
                Injectable(injector)(Dep2);  // Apply Injectable decorator manually
            });

            it('should inject all dependencies', () => {
                const cls = makeClass();
                const instance: any = new cls();
                injector.inject(instance);
                expect(instance.dep1).to.be.an('object').and.an.instanceOf(Dep1);
                expect(instance.dep2).to.be.an('object').and.an.instanceOf(Dep2);
                expect(instance.dep1Twin).to.be.an('object').and.an.instanceOf(Dep1);
            });

        });

        context('when dependency is missing', () => {

            beforeEach(() => {
                injector = new Injector();
                Injectable(injector)(Dep1); // Apply Injectable decorator only on Dep1
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                const instance: any = new cls();
                expect(injector.inject.bind(injector, instance)).to.throw();
            });

        });
    });
});
