# @openbadges/types

TypeScript type definitions for Open Badges v2.0 and v3.0, generated from official schemas.

## Installation

```bash
pnpm add @openbadges/types
# or
npm install @openbadges/types
# or
yarn add @openbadges/types
```

## Usage

Types are namespaced under `v2` and `v3`.

### Open Badges v3.0 Example

```typescript
import type { v3 } from '@openbadges/types';

const myCredential: v3.AchievementCredential = {
  '@context': [
    'https://www.w3.org/ns/credentials/v2',
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
  ],
  id: 'urn:uuid:example-credential',
  type: ['VerifiableCredential', 'AchievementCredential'],
  issuer: 'https://example.org/issuer', // Can also be a Profile object
  validFrom: new Date().toISOString(),
  credentialSubject: {
    type: ['AchievementSubject'],
    achievement: {
      id: 'https://example.org/achievements/1',
      type: ['Achievement'],
      name: 'Example Achievement',
      description: 'Awarded for demonstrating examples.',
      criteria: {
        narrative: 'Complete the usage example.'
      }
    }
  }
};

function processCredential(credential: v3.AchievementCredential) {
  console.log(`Credential Name: ${credential.credentialSubject.achievement.name}`);
}

processCredential(myCredential);
```

### Open Badges v2.0 Example

```typescript
import type { v2 } from '@openbadges/types';

const myAssertion: v2.Assertion = {
  '@context': 'https://openbadgespec.org/v2/context.json',
  id: 'https://example.org/assertions/1',
  type: 'Assertion',
  recipient: {
    type: 'email',
    hashed: false,
    identity: 'recipient@example.org'
  },
  issuedOn: new Date().toISOString(),
  badge: 'https://example.org/badges/1', // URI to BadgeClass
  verification: {
    type: 'hosted'
  }
};

function processAssertion(assertion: v2.Assertion) {
  console.log(`Assertion issued on: ${assertion.issuedOn}`);
}

processAssertion(myAssertion);
```

## License

ISC

## Contributing

(TODO: Add contribution guidelines) 