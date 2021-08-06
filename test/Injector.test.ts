import { expect } from 'chai';
import { Inject, Injectable, Injector } from '../src';

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

describe('Injector', () => {
    describe('construct()', () => {

        let injector: Injector;

        context('when all dependencies exists', () => {

            beforeEach(() => {
                injector = new Injector();
                // Apply Injectable decorators manually
                Injectable(injector)(Dep1);
                Injectable(injector)(Dep2);
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
                // Apply Injectable decorator only on Dep1
                Injectable(injector)(Dep1);
            });

            it('should throw dependency error', () => {
                const cls = makeClass();
                expect(injector.construct.bind(injector, cls)).to.throw();
            });

        });
    });

    describe('inject()', () => {
        context('when all dependencies exists', () => {
            it('should inject all dependencies', () => {
                throw Error('Not implemented');
            });

            it('should return same instance as passed', () => {
                throw Error('Not implemented');
            });
        });

        context('when dependency is missing', () => {
            it('should throw dependency error', () => {
                throw Error('Not implemented');
            });
        });
    });
});
