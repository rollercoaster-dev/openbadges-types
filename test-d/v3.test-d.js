import { expectType, expectError } from 'tsd';
// --- AchievementCredential Basic Tests ---
// Test basic assignability
const minimalValidCredential = {
    '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
    ],
    id: 'urn:uuid:test',
    type: ['VerifiableCredential', 'AchievementCredential'],
    issuer: 'https://example.org/issuer',
    validFrom: new Date().toISOString(),
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
expectType(minimalValidCredential);
// Test that required fields cause errors if missing or wrong type
expectError({
    '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
    ],
    id: 'urn:uuid:test-error',
    type: ['VerifiableCredential', 'AchievementCredential'],
    validFrom: new Date().toISOString(),
    credentialSubject: {
        type: ['AchievementSubject'],
        achievement: {
            id: 'https://example.org/ach/error',
            type: ['Achievement'],
            name: 'Error Achievement',
            description: 'Desc',
            criteria: { narrative: 'Crit' }
        }
    }
});
expectError({
    '@context': [
        'https://www.w3.org/ns/credentials/v2',
        'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
    ],
    id: 'urn:uuid:test-error-2',
    type: ['VerifiableCredential', 'AchievementCredential'],
    issuer: 12345, // Should be string or Profile object (THIS LINE IS INTENTIONALLY WRONG)
    validFrom: new Date().toISOString(),
    credentialSubject: {
        type: ['AchievementSubject'],
        achievement: {
            id: 'https://example.org/ach/error2',
            type: ['Achievement'],
            name: 'Error Achievement 2',
            description: 'Desc2',
            criteria: { narrative: 'Crit2' }
        }
    }
});
// --- Profile Basic Tests ---
const minimalValidProfile = {
    id: 'https://example.org/issuer',
    type: ['Profile'],
    name: 'Example Issuer'
};
expectType(minimalValidProfile);
expectError({
    type: ['Profile'],
    id: null // Intentionally wrong type to satisfy structure but fail assignability
});
// Add more basic type checks for other v3 types as needed... 
//# sourceMappingURL=v3.test-d.js.map