import { z } from 'zod';
import type { AchievementCredential, Image } from '../../src/v3/index.js'; // Import the generated type

// Define a Zod schema that mirrors the structure of AchievementCredential
// Expanding to include more optional fields.
const imageSchema = z.object({
    id: z.string().url().or(z.string().startsWith('data:image')),
    type: z.literal('Image'),
    caption: z.string().optional()
}).passthrough();

const achievementCredentialSchema = z.object({
  '@context': z.array(z.string().url().or(z.object({}))).min(2),
  id: z.string().url().or(z.string().startsWith('urn:uuid:')), // Allow URNs too
  type: z.array(z.string()).min(1).refine(arr => arr.includes('VerifiableCredential') && arr.includes('AchievementCredential'), {
    message: 'Type array must include VerifiableCredential and AchievementCredential'
  }),
  name: z.string().optional(), // Added optional name
  description: z.string().optional(), // Added optional description
  image: imageSchema.optional(), // Added optional image
  issuer: z.string().url().or(z.object({ id: z.string().url() }).passthrough()),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional(), // Added optional validUntil
  credentialSubject: z.object({
    id: z.string().url().or(z.string().startsWith('urn:uuid:')).optional(),
    type: z.array(z.string()).min(1),
    achievement: z.object({
        id: z.string().url(),
        type: z.array(z.string()).min(1),
        name: z.string(),
        description: z.string(),
        criteria: z.object({
            narrative: z.string().optional(),
            id: z.string().url().optional()
        })
    }).passthrough()
  }).passthrough(),
  // proof: z.array(z.object({...})).optional()
}).passthrough();

// --- Test Data ---

const validFromDate = new Date();
const validUntilDate = new Date();
validUntilDate.setFullYear(validFromDate.getFullYear() + 1);

const minimalValidCredential: AchievementCredential = {
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

const credentialWithOptionalFields: AchievementCredential = {
    ...minimalValidCredential,
    name: 'Full Achievement Credential',
    description: 'This credential includes optional fields.',
    validUntil: validUntilDate.toISOString(),
    image: {
        id: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        type: 'Image'
    }
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
    expect(() => achievementCredentialSchema.parse(minimalValidCredential)).not.toThrow();
  });

  it('should successfully validate a credential with optional fields', () => {
    expect(() => achievementCredentialSchema.parse(credentialWithOptionalFields)).not.toThrow();
  });

  it('should fail validation if issuer is missing', () => {
    const result = achievementCredentialSchema.safeParse(invalidCredentialMissingIssuer);
    expect(result.success).toBe(false);
    expect(result.error?.errors.some(e => e.path.includes('issuer'))).toBe(true);
  });

  it('should fail validation if type array is incorrect', () => {
    const result = achievementCredentialSchema.safeParse(invalidCredentialWrongType);
    expect(result.success).toBe(false);
    expect(result.error?.errors.some(e => e.path.includes('type'))).toBe(true);
  });

  it('should fail validation if validUntil is not a valid date string', () => {
    const result = achievementCredentialSchema.safeParse(invalidCredentialBadDate);
    expect(result.success).toBe(false);
    expect(result.error?.errors.some(e => e.path.includes('validUntil'))).toBe(true);
  });

  // TODO: Add more tests (evidence, proof, more complex subject/achievement variations)
}); 