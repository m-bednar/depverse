import { expect } from 'chai';
import { Injectable, Injector } from '../../src';
import { InjectableMock } from '../../src/decorators/InjectableMock';

describe('InjectableMock', () => {

    context('when used as class decorator', () => {

        class Dep {}

        class MockedDep implements Dep {}

        context('when no injector is provided (default is used)', () => {

            beforeEach(() => Injector.default.clearAllInjectableMocks())

            it('should add injectable to default injector', () => {
                InjectableMock(Dep)(MockedDep);
                expect(Injector.default.getAllInjectableMocks()).to.be.lengthOf(1).and.include(Dep);
            });

        });

        context('when own injector is provided', () => {

            const injector: Injector = new Injector();

            beforeEach(() => injector.clearAllInjectableMocks())

            it('should add injectable to own injector', () => {
                InjectableMock(Dep, injector)(MockedDep);
                expect(injector.getAllInjectableMocks()).to.be.lengthOf(1).and.include(Dep);
            });

        });

        context('when same class is decorated multiple times with same injector', () => {

            beforeEach(() => Injector.default.clearAllInjectableMocks())

            it('should throw dependency error', () => {
                InjectableMock(Dep)(MockedDep);
                expect(InjectableMock(Dep).bind(MockedDep)).to.throw();
            });

        });

    });

});
