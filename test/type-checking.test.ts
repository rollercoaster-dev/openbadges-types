import { OB2, OB3, Shared } from '../src';
import { createOB2Assertion, createOB3VerifiableCredential } from './helpers';

/**
 * These tests verify that TypeScript's type system correctly enforces
 * the constraints defined in our type definitions.
 *
 * Note: These tests don't actually run any assertions at runtime.
 * Instead, they verify that the TypeScript compiler accepts valid types
 * and rejects invalid types during compilation.
 */
describe('Type Checking Tests', () => {
  describe('OB2 Type Checking', () => {
    test('should enforce required properties on Assertion', () => {
      // This should compile without errors
      const validAssertion: OB2.Assertion = {
        '@context': 'https://w3id.org/openbadges/v2',
        id: 'https://example.org/assertions/123',
        type: 'Assertion',
        recipient: {
          type: 'email',
          identity: 'alice@example.org'
        },
        issuedOn: '2016-12-31T23:59:59+00:00',
        verification: {
          type: 'hosted'
        },
        badge: {
          id: 'https://example.org/badges/5',
          type: 'BadgeClass',
          name: '3-D Printmaster',
          description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
          image: 'https://example.org/badges/5/image',
          criteria: {
            narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.'
          },
          issuer: {
            id: 'https://example.org/issuer',
            type: 'Profile',
            name: 'Example Maker Society',
            url: 'https://example.org',
            email: 'contact@example.org',
            verification: {
              type: 'hosted',
              allowedOrigins: 'example.org'
            }
          }
        }
      };

      // TypeScript should catch this error during compilation
      // @ts-expect-error - Missing required properties
      const invalidAssertion: OB2.Assertion = {
        id: 'https://example.org/assertions/123',
        type: 'Assertion'
        // Missing recipient, issuedOn, verification, badge
      };

      expect(true).toBe(true); // Dummy assertion to satisfy Jest
    });
  });

  describe('OB3 Type Checking', () => {
    test('should enforce required properties on VerifiableCredential', () => {
      // This should compile without errors
      const validCredential = createOB3VerifiableCredential();

      // TypeScript should catch this error during compilation
      // @ts-expect-error - Missing required properties
      const invalidCredential: OB3.VerifiableCredential = {
        id: 'https://example.org/credentials/3732',
        type: ['VerifiableCredential']
        // Missing @context, issuer, issuanceDate, credentialSubject
      };

      expect(true).toBe(true); // Dummy assertion to satisfy Jest
    });
  });

  describe('Shared Type Checking', () => {
    test('should enforce correct types for shared types', () => {
      // These should compile without errors
      const validIRI: Shared.IRI = 'https://example.org/badges/5';
      const validDateTime: Shared.DateTime = '2023-06-15T12:00:00Z';
      const validMultiLanguageString: Shared.MultiLanguageString = {
        'en': 'Hello',
        'es': 'Hola'
      };

      // TypeScript should catch these errors during compilation
      // @ts-expect-error - Not a string
      const invalidIRI: Shared.IRI = 123;
      // @ts-expect-error - Not a string
      const invalidDateTime: Shared.DateTime = new Date();
      // This would cause a TypeScript error if we didn't use the type assertion
      const invalidMultiLanguageString: Shared.MultiLanguageString = {
        'en': (123 as unknown) as string
      };

      expect(true).toBe(true); // Dummy assertion to satisfy Jest
    });
  });
});
