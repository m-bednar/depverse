import { expect } from 'chai';
import { Injectable, Injector } from '../../src';

describe('Injectable', () => {

    context('when used as class decorator', () => {

        class Dep {}

        context('when no injector is provided (default is used)', () => {

            beforeEach(() => Injector.default.clearAllInjectables())

            it('should add injectable to default injector', () => {
                Injectable()(Dep);
                expect(Injector.default.getAllInjectables()).to.be.lengthOf(1).and.include(Dep);
            });

        });

        context('when own injector is provided', () => {

            const injector: Injector = new Injector();

            beforeEach(() => injector.clearAllInjectables())

            it('should add injectable to own injector', () => {
                Injectable(injector)(Dep);
                expect(injector.getAllInjectables()).to.be.lengthOf(1).and.include(Dep);
            });

        });

        context('when same class is decorated multiple times with same injector', () => {

            beforeEach(() => Injector.default.clearAllInjectables())

            it('should throw dependency error', () => {
                Injectable()(Dep);
                expect(Injectable().bind(Dep)).to.throw();
            });

        });

    });

});
