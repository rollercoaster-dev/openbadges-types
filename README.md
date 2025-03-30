# Open Badges TypeScript Types (`@openbadges/types`)

[![npm version](https://badge.fury.io/js/%40openbadges%2Ftypes.svg)](https://badge.fury.io/js/%40openbadges%2Ftypes) <!-- Placeholder -->

This package provides TypeScript type definitions for the [Open Badges Specification](https://www.imsglobal.org/spec/ob/v3p0/) versions 2.0 and 3.0.

The types are automatically generated from the official JSON schemas published by 1EdTech, ensuring alignment with the standards.

## Installation

Using pnpm:

```bash
pnpm add @openbadges/types
```

Using npm:

```bash
npm install @openbadges/types
```

Using yarn:

```bash
yarn add @openbadges/types
```

## Usage

The types are namespaced by specification version (`v2` and `v3`).

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
  issuer: {
    id: 'https://example.org/issuer',
    type: ['Profile'],
    name: 'Example Issuer'
  },
  validFrom: new Date().toISOString(),
  credentialSubject: {
    type: ['AchievementSubject'],
    achievement: {
      id: 'https://example.org/achievements/example',
      type: ['Achievement'],
      name: 'Example Achievement',
      description: 'Awarded for demonstrating example usage.',
      criteria: { narrative: 'Create a valid example credential.' }
    }
  }
};

function processCredential(cred: v3.AchievementCredential) {
  console.log(`Processing credential: ${cred.id}`);
  console.log(`Achievement Name: ${cred.credentialSubject.achievement.name}`);
}

processCredential(myCredential);
```

### Open Badges v2.0 Example

```typescript
import type { v2 } from '@openbadges/types';

const myAssertion: v2.Assertion = {
  '@context': 'https://w3id.org/openbadges/v2',
  type: ['Assertion'],
  id: 'https://example.org/assertions/123',
  uid: 'assertion-uid-123',
  recipient: {
    type: 'email',
    identity: 'sha256$abcdef123...', // Hashed recipient identifier
    hashed: true
  },
  badge: 'https://example.org/badges/class/1', // URL to BadgeClass
  verify: {
    type: 'hosted',
    url: 'https://example.org/assertions/123'
  },
  issuedOn: new Date().toISOString()
};

function processAssertion(assertion: v2.Assertion) {
  console.log(`Processing assertion: ${assertion.id}`);
  console.log(`Badge Class URL: ${assertion.badge}`);
}

processAssertion(myAssertion);
```

## Contributing

This package is automatically generated. Please report issues or suggest improvements via the [GitHub repository issues](https://github.com/your-repo-link-here). <!-- TODO: Update link -->

## License

[ISC](./LICENSE) <!-- TODO: Add LICENSE file --> 