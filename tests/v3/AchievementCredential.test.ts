import { z } from 'zod';
// Import the main type from the index
import type { Achievementcredential } from '../../src/v3/index.js';
// Import nested types directly from their defining files
import type { Image, Evidence, Proof } from '../../src/v3/Achievementcredential.js';
import type { Profile } from '../../src/v3/Profile.js';

// --- Zod Schemas ---

const contextSchema = z.array(z.string().url().or(z.object({}))).min(2);
const idSchema = z.string().url().or(z.string().startsWith('urn:uuid:'));
const typeSchema = z.array(z.string()).min(1);
const dateTimeSchema = z.string().datetime();

const imageSchema = z
  .object({
    id: z.string().url().or(z.string().startsWith('data:image')),
    type: z.literal('Image'),
    caption: z.string().optional(),
  })
  .passthrough();

// Minimal Profile schema for issuer object validation
const profileSchema = z
  .object({
    id: idSchema,
    type: typeSchema.refine((arr) => arr.includes('Profile')), // Must include Profile
    name: z.string().optional(),
    url: z.string().url().optional(),
  })
  .passthrough();

// Minimal Evidence schema
const evidenceSchema = z
  .object({
    id: z.string().url().optional(), // Evidence can be described inline
    type: typeSchema, // e.g., ['Evidence']
    name: z.string().optional(),
    description: z.string().optional(),
    narrative: z.string().optional(),
  })
  .passthrough();

// Minimal Proof schema
const proofSchema = z
  .object({
    type: z.string(), // e.g., 'DataIntegrityProof'
    created: dateTimeSchema.optional(),
    proofPurpose: z.string().optional(), // e.g., 'assertionMethod'
    verificationMethod: z.string().url().optional(),
    proofValue: z.string().optional(), // Often base64/multibase encoded
  })
  .passthrough();

// Main AchievementCredential schema
const achievementCredentialSchema = z
  .object({
    '@context': contextSchema,
    id: idSchema,
    type: typeSchema.refine(
      (arr) =>
        arr.includes('VerifiableCredential') &&
        arr.includes('AchievementCredential'),
      {
        message:
          'Type array must include VerifiableCredential and AchievementCredential',
      }
    ),
    name: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    issuer: z.string().url().or(profileSchema), // Allow string or Profile object
    validFrom: dateTimeSchema,
    validUntil: dateTimeSchema.optional(),
    credentialSubject: z
      .object({
        id: idSchema.optional(),
        type: typeSchema, // E.g. ['AchievementSubject']
        achievement: z
          .object({
            id: z.string().url(),
            type: typeSchema, // E.g. ['Achievement']
            name: z.string(),
            description: z.string(),
            criteria: z
              .object({
                narrative: z.string().optional(),
                id: z.string().url().optional(),
              })
              .passthrough(),
          })
          .passthrough(),
      })
      .passthrough(),
    evidence: z.array(evidenceSchema).optional(), // Added evidence array
    proof: z.array(proofSchema).optional(), // Added proof array
  })
  .passthrough();

// --- Test Data ---

const validFromDate = new Date();
const validUntilDate = new Date();
validUntilDate.setFullYear(validFromDate.getFullYear() + 1);

const minimalValidCredential: Achievementcredential = {
  '@context': [
    'https://www.w3.org/ns/credentials/v2',
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
  ],
  id: 'urn:uuid:ea252e73-9339-405e-936b-835c9f436e8a',
  type: ['VerifiableCredential', 'AchievementCredential'],
  issuer: 'https://example.org/issuer',
  validFrom: validFromDate.toISOString(),
  credentialSubject: {
    type: ['AchievementSubject'],
    achievement: {
      id: 'https://example.org/achievements/1',
      type: ['Achievement'],
      name: 'Test Achievement',
      description: 'For testing purposes.',
      criteria: {
        narrative: 'Complete the test.'
      }
    }
  }
};

const credentialWithOptionalFields: Achievementcredential = {
    ...minimalValidCredential,
    name: 'Full Achievement Credential',
    description: 'This credential includes optional fields.',
    validUntil: validUntilDate.toISOString(),
    image: {
        id: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        type: 'Image'
    }
};

// New test data
const credentialWithObjectIssuerAndEvidence: Achievementcredential = {
  ...minimalValidCredential, // Start with minimal valid structure
  issuer: { // Use Profile object for issuer
    id: 'https://example.org/issuer',
    type: ['Profile'],
    name: 'Example Corp Issuer',
    url: 'https://example.org',
  },
  evidence: [ // Add evidence array
    {
      id: 'https://example.org/evidence/1',
      type: ['Evidence'],
      name: 'Project Submission',
      description: 'Link to the submitted project.',
    },
  ],
  proof: [ // Add basic proof
    {
      type: 'DataIntegrityProof',
      proofPurpose: 'assertionMethod',
      verificationMethod: 'https://example.org/issuer#key-1',
      created: validFromDate.toISOString(),
      proofValue: 'zBase58...example...',
    },
  ],
};

const invalidCredentialMissingIssuer = {
    ...minimalValidCredential,
    issuer: undefined as any // Force remove issuer
};

const invalidCredentialWrongType = {
    ...minimalValidCredential,
    type: ['VerifiableCredential'] // Missing AchievementCredential type
};

const invalidCredentialBadDate = {
    ...credentialWithOptionalFields,
    validUntil: 'not-a-date'
};

// --- Tests ---

describe('v3 AchievementCredential Validation', () => {
  it('should successfully validate a minimal valid credential', () => {
    expect(() =>
      achievementCredentialSchema.parse(minimalValidCredential)
    ).not.toThrow();
  });

  it('should successfully validate a credential with optional fields', () => {
    expect(() =>
      achievementCredentialSchema.parse(credentialWithOptionalFields)
    ).not.toThrow();
  });

  it('should successfully validate a credential with object issuer and evidence/proof', () => {
    expect(() =>
      achievementCredentialSchema.parse(
        credentialWithObjectIssuerAndEvidence
      )
    ).not.toThrow();
  });

  it('should fail validation if issuer is missing', () => {
    const result = achievementCredentialSchema.safeParse(
      invalidCredentialMissingIssuer
    );
    expect(result.success).toBe(false);
    expect(result.error?.errors.some((e) => e.path.includes('issuer'))).toBe(
      true
    );
  });

  it('should fail validation if type array is incorrect', () => {
    const result =
      achievementCredentialSchema.safeParse(invalidCredentialWrongType);
    expect(result.success).toBe(false);
    expect(result.error?.errors.some((e) => e.path.includes('type'))).toBe(true);
  });

  it('should fail validation if validUntil is not a valid date string', () => {
    const result =
      achievementCredentialSchema.safeParse(invalidCredentialBadDate);
    expect(result.success).toBe(false);
    expect(result.error?.errors.some((e) => e.path.includes('validUntil'))).toBe(
      true
    );
  });

  // TODO: Add more tests (evidence, proof, more complex subject/achievement variations)
}); 