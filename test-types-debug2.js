// Create a simple OB3 VerifiableCredential with string types
const issuer = {
    id: 'https://example.org/issuers/123',
    type: 'Profile',
    name: 'Example Maker Society',
    url: 'https://example.org',
    email: 'contact@example.org',
};
const achievement = {
    id: 'https://example.org/achievements/1',
    type: 'Achievement',
    name: '3-D Printmaster',
    description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
    criteria: {
        narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.',
    },
};
// Debug the type guards
import { isOB3Issuer, isOB3Achievement } from './dist/index.js';
console.log('Is issuer valid?', isOB3Issuer(issuer));
console.log('Is achievement valid?', isOB3Achievement(achievement));
