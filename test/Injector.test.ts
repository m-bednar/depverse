import { Injector } from '../src';

describe('Injector', () => {
    describe('construct()', () => {
        context('when all dependencies exists', () => {
            let injector: Injector;

            beforeEach(() => {
                injector = new Injector();
            });

            it('should return instance with all injected dependencies', () => {
                throw Error('Not implemented');
            });

            it('should pass arguments to the constructor', () => {
                throw Error('Not implemented');
            });
        });

        context('when dependency is missing', () => {
            it('should throw dependency error', () => {
                throw Error('Not implemented');
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
