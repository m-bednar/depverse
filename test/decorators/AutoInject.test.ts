import { expect } from 'chai';
import { Inject, Injectable, AutoInject, InjectableMock, Injector } from '../../src';
import { Class } from '../../src/types/Class';

describe('AutoInject', () => {

    context('when used as class decorator', () => {

        class Dep1 { x = 0; }

        class Dep2 { y = 'Dep2';}

        class DepMock { x = 1; y = 'DepMock'; }

        function createClass() {
            @AutoInject()
            class TestClass {
                @Inject()
                private dep1!: Dep1;

                @Inject()
                private dep2!: Dep2;
            }
            return TestClass;
        }

        beforeEach(() => {
            Injector.default.clearAllInjectables();
            Injector.default.clearAllInjectableMocks();
        });

        it('should inject all dependencies for new instance', () => {
            Injectable()(Dep1);
            Injectable()(Dep2);

            const cls = createClass();
            const instance = new cls();
            expect(instance).to.be.have.property('dep1').instanceof(Dep1);
            expect(instance).to.be.have.property('dep2').instanceof(Dep2);
        });

        it('should respect process.env.USE_INJECTABLE_MOCKS set to true and construct with mocks', () => {
            process.env.USE_INJECTABLE_MOCKS = 'true';
            InjectableMock(Dep1)(DepMock);
            InjectableMock(Dep2)(DepMock);

            const cls = createClass();
            const instance = new cls();
            expect(instance).to.be.have.property('dep1').instanceof(DepMock);
            expect(instance).to.be.have.property('dep2').instanceof(DepMock);
        });

    });

});
