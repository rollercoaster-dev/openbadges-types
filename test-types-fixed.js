// Test TypeScript types with fixed types
import { validateBadge } from './dist/index.js';
// Create a simple OB3 VerifiableCredential with string types instead of arrays
const ob3Badge = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://purl.imsglobal.org/spec/ob/v3p0/context.json',
    ],
    id: 'https://example.org/credentials/3732',
    type: 'VerifiableCredential', // String instead of array
    issuer: {
        id: 'https://example.org/issuers/123',
        type: 'Profile', // String instead of array
        name: 'Example Maker Society',
        url: 'https://example.org',
        email: 'contact@example.org',
    },
    issuanceDate: '2023-06-15T12:00:00Z',
    credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        achievement: {
            id: 'https://example.org/achievements/1',
            type: 'Achievement', // String instead of array
            name: '3-D Printmaster',
            description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
            criteria: {
                narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.',
            },
        },
    },
};
// Test validation with detailed error reporting
const ob3ValidationResult = validateBadge(ob3Badge);
console.log('OB3 Validation:', ob3ValidationResult.isValid ? 'Valid' : 'Invalid');
console.log('OB3 Validation Errors:', ob3ValidationResult.errors);
console.log('OB3 Validation Warnings:', ob3ValidationResult.warnings);
