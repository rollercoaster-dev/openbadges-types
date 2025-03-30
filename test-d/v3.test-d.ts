import { expectType, expectError } from 'tsd';
import * as obv3 from '../src/v3/index.js';

// --- AchievementCredential Basic Tests ---

// Test basic assignability
const minimalValidCredential: obv3.AchievementCredential = {
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
expectType<obv3.AchievementCredential>(minimalValidCredential);

// Test that required fields cause errors if missing or wrong type
expectError<obv3.AchievementCredential>({ // Missing issuer
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

expectError<obv3.AchievementCredential>({ // issuer has wrong type
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

const minimalValidProfile: obv3.Profile = {
    id: 'https://example.org/issuer',
    type: ['Profile'],
    name: 'Example Issuer'
};
expectType<obv3.Profile>(minimalValidProfile);

expectError<obv3.Profile>({ // Missing id (provide other required fields, make id wrong type)
    type: ['Profile'],
    id: null // Intentionally wrong type to satisfy structure but fail assignability
});

// Add more basic type checks for other v3 types as needed... 