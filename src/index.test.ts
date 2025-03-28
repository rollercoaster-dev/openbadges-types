import { describe, it, expect } from 'vitest';
import type * as OBv2 from './v2';
import type * as OBv3 from './v3';
import type { VerifiableCredential } from '@digitalcredentials/vc-data-model'; // Import base union type

// --- Helper Type Guard ---
function isVCDataObject(
  cred: VerifiableCredential
): cred is Exclude<VerifiableCredential, string> {
  return typeof cred === 'object' && cred !== null;
}

// --- Placeholder Examples ---
// TODO: Replace these with actual official examples from the Open Badges specs

const exampleAssertionV2: OBv2.Assertion = {
  '@context': 'https://w3id.org/openbadges/v2',
  id: 'urn:uuid:c232f1b6-b80f-4d16-a0a1-98a9f3a20cce',
  type: 'Assertion',
  recipient: {
    type: 'email',
    hashed: true,
    salt: 'deadsea',
    identity:
      'sha256$edf963a655c63e97e8a1118ac64a4c90e80c0f631283a88ab531d1c19309f858',
  },
  badge: {
    id: 'https://example.org/badges/robotics-mastery',
    type: 'BadgeClass',
    name: 'Robotics Mastery',
    description: 'Learner demonstrated mastery in introductory robotics.',
    image: 'https://example.org/badges/robotics-mastery.png',
    criteria: {
      narrative:
        'Complete the Intro to Robotics course, build a functional bot, and pass the practical exam.',
    },
    issuer: {
      id: 'https://example.org/issuer',
      type: 'Profile',
      name: 'Example Robotics Academy',
      url: 'https://example.org',
      email: 'contact@example.org',
    },
  },
  issuedOn: '2023-08-15T12:00:00Z',
  verification: {
    type: 'hosted',
    // url: "urn:uuid:c232f1b6-b80f-4d16-a0a1-98a9f3a20cce" // Often the same as id
  },
  // expires: "2025-08-15T12:00:00Z" // Optional
};

// Define the example directly with the intended type
const exampleOB3Credential: OBv3.OpenBadgeCredential = {
  '@context': [
    'https://www.w3.org/ns/credentials/v2',
    'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json',
  ],
  id: 'urn:uuid:ebf3f6e4-0913-4b66-8ae9-ca49c889d3d8',
  type: ['VerifiableCredential', 'OpenBadgeCredential'],
  issuer: {
    // Assuming issuer can be an object matching IssuerProfile (or Profile)
    // We might need to adjust this if IssuerProfile definition changes
    id: 'did:example:issuer123',
    type: 'Profile', // Needs to match expected type in IssuerProfile
    name: 'Example University',
  },
  issuanceDate: '2024-01-10T10:00:00Z',
  credentialSubject: {
    // Assuming a single subject matching AchievementSubject
    id: 'did:example:recipient456',
    type: ['AchievementSubject'],
    achievement: {
      // Assuming achievement matches the Achievement interface
      id: 'https://example.edu/achievements/digital-literacy-101',
      type: ['Achievement', 'Course'],
      name: 'Digital Literacy 101',
      description: 'Successfully completed the Digital Literacy 101 course.',
      criteria: {
        // Assuming criteria matches the Criteria interface
        // id: undefined, // Optional
        type: 'Criteria', // Might be needed depending on final Criteria type
        narrative:
          'Complete all modules and pass the final assessment with 80% or higher.',
      },
      image: {
        // Assuming image matches ImageObject
        id: 'https://example.edu/badges/digital-literacy.png',
        type: 'Image',
        // caption: undefined, // Optional
      },
    },
  },
  proof: {
    // Proof type is currently 'any' in the base VC definition,
    // so structure here doesn't strictly matter for TS, but good for example clarity
    type: 'DataIntegrityProof',
    created: '2024-01-10T10:00:00Z',
    verificationMethod: 'did:example:issuer123#key1',
    proofPurpose: 'assertionMethod',
    proofValue: 'zExampleMultiBaseEncodedProofValue...',
  },
  // Add other required VCDIVerifiableCredential properties if necessary,
  // although many are optional or inherited via intersection.
};

// --- Tests ---

describe('Open Badges Type Compliance', () => {
  it('should allow assignment of a valid v2 Assertion example', () => {
    const assertion: OBv2.Assertion = exampleAssertionV2;
    expect(assertion.id).toBe(exampleAssertionV2.id);
    expect(assertion.type).toBe('Assertion');
    expect(assertion.recipient.type).toBe('email');
    // Check badge type safely
    if (typeof assertion.badge !== 'string') {
      expect(assertion.badge.type).toBe('BadgeClass');
    }
  });

  it('should allow assignment of a valid v3 OpenBadgeCredential example and access properties', () => {
    // Use the directly typed example object
    const credential = exampleOB3Credential;

    // Use type guard to ensure we're dealing with the object form
    if (isVCDataObject(credential)) {
      // Test properties from the base VC object structure
      expect(credential['@context']).toEqual(exampleOB3Credential['@context']);

      // Check for optional id before asserting
      if (credential.id) {
        expect(credential.id).toBe(exampleOB3Credential.id);
      } else {
        expect.fail('Credential ID was expected but not found.');
      }

      expect(credential.issuer).toEqual(exampleOB3Credential.issuer);
      expect(credential.issuanceDate).toBe(exampleOB3Credential.issuanceDate);

      // Check for optional proof before asserting
      if (credential.proof) {
        expect(credential.proof).toBeDefined();
        // Optionally, add more specific checks for proof properties here
        // expect((credential.proof as any).type).toBe('DataIntegrityProof');
      } else {
        expect.fail('Credential proof was expected but not found.');
      }

      // Test overridden properties
      expect(credential.type).toContain('VerifiableCredential');
      expect(credential.type).toContain('OpenBadgeCredential');

      // Test credentialSubject safely
      // Assuming single subject for this test case
      if (
        !Array.isArray(credential.credentialSubject) &&
        credential.credentialSubject
      ) {
        expect(credential.credentialSubject.id).toBe(
          exampleOB3Credential.credentialSubject.id
        );
        expect(credential.credentialSubject.type).toBe(
          exampleOB3Credential.credentialSubject.type
        );
        // Check achievement type safely
        if (
          typeof credential.credentialSubject.achievement === 'object' &&
          credential.credentialSubject.achievement !== null
        ) {
          expect(credential.credentialSubject.achievement.type).toContain(
            'Achievement'
          );
          // Add more achievement checks if needed
        }
      } else {
        expect.fail('Expected a single credentialSubject object');
      }
    } else {
      // If it's a string (CompactJWT), this specific test structure doesn't apply
      expect.fail(
        'Test example was expected to be an object, not a JWT string.'
      );
    }
  });

  // TODO: Add tests for other core types (BadgeClass, Profile, Achievement) with examples
  // TODO: Add tests for edge cases or optional properties
});
