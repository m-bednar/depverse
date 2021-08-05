import { expect } from 'chai';
import { Inject } from '../../src';
import { MetadataKeys } from '../../src/MetadataKeys';

describe('Inject', () => {

    context('when used as decorator on property', () => {

        
        class TestClass {

            @Inject()
            private prop1!: string;
            
            @Inject()
            private prop2!: TestClass;

        }

        it('should set metadata by all used decorators', () => {
            const metadata = Reflect.getMetadata(MetadataKeys.Inject, TestClass);
            expect(metadata).to.be.an('array').and.to.have.lengthOf(2);
        });

        it('should store keys in metadata', () => {
            const metadata = Reflect.getMetadata(MetadataKeys.Inject, TestClass);
            expect(metadata[0]).to.be.an('object').and.to.have.property('key', 'prop1');
            expect(metadata[1]).to.be.an('object').and.to.have.property('key', 'prop2');
        });

        it('should store property types in metadata', () => {
            const metadata = Reflect.getMetadata(MetadataKeys.Inject, TestClass);
            expect(metadata[0]).to.be.an('object').and.to.have.property('propType', String);
            expect(metadata[1]).to.be.an('object').and.to.have.property('propType', TestClass);
        });

    })

});
