import { OB2, OB3 } from '../src';

/**
 * Helper functions to create valid test objects
 */

// OB2 Helpers
export const createOB2Assertion = (overrides?: Partial<OB2.Assertion>): OB2.Assertion => {
  return {
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
    },
    ...overrides
  };
};

// OB3 Helpers
export const createOB3Achievement = (overrides?: Partial<OB3.Achievement>): OB3.Achievement => {
  return {
    '@context': 'https://purl.imsglobal.org/spec/ob/v3p0/context.json',
    type: ['Achievement'],
    name: '3-D Printmaster',
    description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
    criteria: {
      narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.'
    },
    ...overrides
  };
};

export const createOB3Issuer = (overrides?: Partial<OB3.Issuer>): OB3.Issuer => {
  return {
    '@context': 'https://purl.imsglobal.org/spec/ob/v3p0/context.json',
    id: 'https://example.org/issuers/123',
    type: ['Profile'],
    name: 'Example Maker Society',
    url: 'https://example.org',
    email: 'contact@example.org',
    ...overrides
  };
};

export const createOB3VerifiableCredential = (overrides?: Partial<OB3.VerifiableCredential>): OB3.VerifiableCredential => {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
    ],
    id: 'https://example.org/credentials/3732',
    type: ['VerifiableCredential'],
    issuer: createOB3Issuer(),
    issuanceDate: '2023-06-15T12:00:00Z',
    credentialSubject: {
      id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      achievement: createOB3Achievement()
    },
    ...overrides
  };
};
