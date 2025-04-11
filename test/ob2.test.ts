import { OB2 } from '../src';

describe('Open Badges 2.0 Types', () => {
  // Test data
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

  describe('Assertion', () => {
    test('should have all required properties', () => {
      // Validate that the assertion matches the specification
      expect(validAssertion).toHaveProperty('@context');
      expect(validAssertion).toHaveProperty('id');
      expect(validAssertion).toHaveProperty('type');
      expect(validAssertion).toHaveProperty('recipient');
      expect(validAssertion).toHaveProperty('issuedOn');
      expect(validAssertion).toHaveProperty('verification');
      expect(validAssertion).toHaveProperty('badge');
    });

    test('should support optional properties', () => {
      // Test with optional properties
      const assertionWithOptionals: OB2.Assertion = {
        ...validAssertion,
        evidence: {
          id: 'https://example.org/evidence/123',
          narrative: 'Alice completed all required tasks with distinction.'
        },
        image: 'https://example.org/assertions/123/image',
        expires: '2026-12-31T23:59:59+00:00'
      };

      expect(assertionWithOptionals).toHaveProperty('evidence');
      expect(assertionWithOptionals).toHaveProperty('image');
      expect(assertionWithOptionals).toHaveProperty('expires');
    });

    test('should support multiple evidence items as an array', () => {
      // Test with multiple evidence items
      const assertionWithMultipleEvidence: OB2.Assertion = {
        ...validAssertion,
        evidence: [
          {
            id: 'https://example.org/evidence/123',
            narrative: 'Alice completed all required tasks with distinction.'
          },
          {
            id: 'https://example.org/evidence/124',
            narrative: 'Alice demonstrated exceptional knowledge in the written test.'
          }
        ]
      };

      expect(Array.isArray(assertionWithMultipleEvidence.evidence)).toBe(true);
      expect(assertionWithMultipleEvidence.evidence).toHaveLength(2);
    });
  });
});
