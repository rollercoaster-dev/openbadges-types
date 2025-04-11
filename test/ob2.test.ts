import { OB2 } from '../src';

// Test Open Badges 2.0 Assertion
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

// Validate that the assertion matches the specification
console.log('Open Badges 2.0 Assertion validation:');
console.log('- Has context:', '@context' in validAssertion);
console.log('- Has id:', 'id' in validAssertion);
console.log('- Has type:', 'type' in validAssertion);
console.log('- Has recipient:', 'recipient' in validAssertion);
console.log('- Has issuedOn:', 'issuedOn' in validAssertion);
console.log('- Has verification:', 'verification' in validAssertion);
console.log('- Has badge:', 'badge' in validAssertion);

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

console.log('\nAssertion with optional properties:');
console.log('- Has evidence:', 'evidence' in assertionWithOptionals);
console.log('- Has image:', 'image' in assertionWithOptionals);
console.log('- Has expires:', 'expires' in assertionWithOptionals);

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

console.log('\nAssertion with multiple evidence items:');
console.log('- Evidence is array:', Array.isArray(assertionWithMultipleEvidence.evidence));
console.log('- Evidence count:', Array.isArray(assertionWithMultipleEvidence.evidence) ? assertionWithMultipleEvidence.evidence.length : 0);

console.log('\nOpen Badges 2.0 types validation completed successfully!');
