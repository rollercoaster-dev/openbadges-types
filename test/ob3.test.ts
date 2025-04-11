import { OB3 } from '../src';

// Test Open Badges 3.0 VerifiableCredential
const validCredential: OB3.VerifiableCredential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
  ],
  id: 'https://example.org/credentials/3732',
  type: ['VerifiableCredential'],
  issuer: {
    id: 'https://example.org/issuers/123',
    type: ['Profile'],
    name: 'Example Maker Society',
    url: 'https://example.org',
    email: 'contact@example.org'
  },
  issuanceDate: '2023-06-15T12:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    achievement: {
      type: ['Achievement'],
      name: '3-D Printmaster',
      description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
      criteria: {
        narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.'
      }
    }
  }
};

// Validate that the credential matches the specification
console.log('Open Badges 3.0 VerifiableCredential validation:');
console.log('- Has context:', '@context' in validCredential);
console.log('- Has id:', 'id' in validCredential);
console.log('- Has type:', 'type' in validCredential);
console.log('- Has issuer:', 'issuer' in validCredential);
console.log('- Has issuanceDate:', 'issuanceDate' in validCredential);
console.log('- Has credentialSubject:', 'credentialSubject' in validCredential);

// Test with proof
const credentialWithProof: OB3.VerifiableCredential = {
  ...validCredential,
  proof: {
    type: 'Ed25519Signature2020',
    created: '2023-06-15T12:05:00Z',
    verificationMethod: 'https://example.org/issuers/123#keys-1',
    proofPurpose: 'assertionMethod',
    proofValue: 'z58DAdFfa9SkqZMVPxAQpic6FPCsJWa6SpsfDqwmUbHEVnWxeh'
  }
};

console.log('\nCredential with proof:');
console.log('- Has proof:', 'proof' in credentialWithProof);
console.log('- Proof type:', credentialWithProof.proof?.type);

// Test with multiple achievements
const credentialWithMultipleAchievements: OB3.VerifiableCredential = {
  ...validCredential,
  credentialSubject: {
    ...validCredential.credentialSubject,
    achievement: [
      {
        type: ['Achievement'],
        name: '3-D Printmaster',
        description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.'
      },
      {
        type: ['Achievement'],
        name: 'Safety Expert',
        description: 'This badge is awarded for demonstrating exceptional safety knowledge.'
      }
    ]
  }
};

console.log('\nCredential with multiple achievements:');
console.log('- Achievement is array:', Array.isArray(credentialWithMultipleAchievements.credentialSubject.achievement));
console.log('- Achievement count:', Array.isArray(credentialWithMultipleAchievements.credentialSubject.achievement) 
  ? credentialWithMultipleAchievements.credentialSubject.achievement.length 
  : 0);

// Test with evidence
const credentialWithEvidence: OB3.VerifiableCredential = {
  ...validCredential,
  evidence: [
    {
      id: 'https://example.org/evidence/123',
      type: ['Evidence'],
      narrative: 'Alice completed all required tasks with distinction.'
    }
  ]
};

console.log('\nCredential with evidence:');
console.log('- Has evidence:', 'evidence' in credentialWithEvidence);
console.log('- Evidence count:', Array.isArray(credentialWithEvidence.evidence) ? credentialWithEvidence.evidence.length : 0);

console.log('\nOpen Badges 3.0 types validation completed successfully!');
