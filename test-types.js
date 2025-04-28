// Test TypeScript types
import { CompositeGuards, validateBadge } from './dist/index.js';
// Create a simple OB2 Assertion
const ob2Badge = {
    '@context': 'https://w3id.org/openbadges/v2',
    id: 'https://example.org/assertions/123',
    type: 'Assertion',
    recipient: {
        type: 'email',
        identity: 'alice@example.org',
    },
    issuedOn: '2016-12-31T23:59:59+00:00',
    verification: {
        type: 'hosted',
    },
    badge: {
        id: 'https://example.org/badges/5',
        type: 'BadgeClass',
        name: '3-D Printmaster',
        description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
        image: 'https://example.org/badges/5/image',
        criteria: {
            narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.',
        },
        issuer: {
            id: 'https://example.org/issuer',
            type: 'Profile',
            name: 'Example Maker Society',
            url: 'https://example.org',
            email: 'contact@example.org',
        },
    },
};
// Create a simple OB3 VerifiableCredential
const ob3Badge = {
    '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://purl.imsglobal.org/spec/ob/v3p0/context.json',
    ],
    id: 'https://example.org/credentials/3732',
    type: ['VerifiableCredential'],
    issuer: {
        id: 'https://example.org/issuers/123',
        type: ['Profile'],
        name: 'Example Maker Society',
        url: 'https://example.org',
        email: 'contact@example.org',
    },
    issuanceDate: '2023-06-15T12:00:00Z',
    credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        achievement: {
            id: 'https://example.org/achievements/1',
            type: ['Achievement'],
            name: '3-D Printmaster',
            description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
            criteria: {
                narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.',
            },
        },
    },
};
// Test composite guards
if (CompositeGuards.isBadge(ob2Badge)) {
    console.log('OB2 Badge Name:', CompositeGuards.getBadgeName(ob2Badge));
    console.log('OB2 Badge Issuer:', CompositeGuards.getBadgeIssuerName(ob2Badge));
}
if (CompositeGuards.isBadge(ob3Badge)) {
    console.log('OB3 Badge Name:', CompositeGuards.getBadgeName(ob3Badge));
    console.log('OB3 Badge Issuer:', CompositeGuards.getBadgeIssuerName(ob3Badge));
}
// Test validation
const ob2ValidationResult = validateBadge(ob2Badge);
console.log('OB2 Validation:', ob2ValidationResult.isValid ? 'Valid' : 'Invalid');
const ob3ValidationResult = validateBadge(ob3Badge);
console.log('OB3 Validation:', ob3ValidationResult.isValid ? 'Valid' : 'Invalid');
