import { expect } from 'chai';
import { Inject, Injectable } from '../../src';
import { AutoInject } from '../../src/decorators/AutoInject';

describe('AutoInject', () => {

    context('when used as class decorator', () => {

        @Injectable()
        class Dep1 {}

        @Injectable()
        class Dep2 {}

        @AutoInject()
        class TestClass {
            @Inject()
            private dep1!: Dep1;

            @Inject()
            private dep2!: Dep2;
        }

        it('should inject all dependencies for new instance', () => {
            const instance = new TestClass();
            expect(instance).to.be.have.property('dep1').instanceof(Dep1);
            expect(instance).to.be.have.property('dep2').instanceof(Dep2);
        });

    })

});
