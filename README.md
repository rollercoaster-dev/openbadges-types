# Open Badges Types

A comprehensive TypeScript types package for Open Badges 2.0 and 3.0 specifications.

[![npm version](https://img.shields.io/npm/v/openbadges-types.svg)](https://www.npmjs.com/package/openbadges-types)
[![license](https://img.shields.io/npm/l/openbadges-types.svg)](https://github.com/rollercoaster-dev/openbadges-types/blob/main/LICENSE)

## Overview

This package provides TypeScript type definitions for both Open Badges 2.0 and Open Badges 3.0 specifications. It can be used in badge servers, component libraries, and applications that work with Open Badges.

Open Badges 3.0 represents a significant change from version 2.0, adopting the W3C Verifiable Credentials Data Model. This package supports both versions to ensure backward compatibility while enabling adoption of the newer standard.

## Installation

```bash
npm install openbadges-types
```

or

```bash
yarn add openbadges-types
```

## Usage

### Open Badges 2.0

```typescript
import { OB2 } from 'openbadges-types';

// Create a BadgeClass
const badgeClass: OB2.BadgeClass = {
  '@context': 'https://w3id.org/openbadges/v2',
  id: 'https://example.org/badges/5',
  type: 'BadgeClass',
  name: '3-D Printmaster',
  description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
  image: 'https://example.org/badges/5/image',
  criteria: {
    narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.'
  },
  issuer: {
    id: 'https://example.org/issuer',
    type: 'Profile',
    name: 'Example Maker Society',
    url: 'https://example.org',
    email: 'contact@example.org',
    verification: {
      type: 'hosted',
      allowedOrigins: 'example.org'
    }
  }
};

// Create an Assertion
const assertion: OB2.Assertion = {
  '@context': 'https://w3id.org/openbadges/v2',
  id: 'https://example.org/assertions/123',
  type: 'Assertion',
  recipient: {
    type: 'email',
    identity: 'alice@example.org'
  },
  issuedOn: '2016-12-31T23:59:59+00:00',
  verification: {
    type: 'hosted'
  },
  badge: badgeClass
};
```

### Open Badges 3.0

```typescript
import { OB3 } from 'openbadges-types';

// Create an Achievement
const achievement: OB3.Achievement = {
  type: ['Achievement'],
  name: '3-D Printmaster',
  description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
  criteria: {
    narrative: 'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.'
  },
  alignments: [
    {
      targetName: 'ISTE Standard 3',
      targetUrl: 'https://example.org/standards/iste3'
    }
  ]
};

// Create a Verifiable Credential
const credential: OB3.VerifiableCredential = {
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
    achievement: achievement
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2023-06-15T12:05:00Z',
    verificationMethod: 'https://example.org/issuers/123#keys-1',
    proofPurpose: 'assertionMethod',
    proofValue: 'z58DAdFfa9SkqZMVPxAQpic6FPCsJWa6SpsfDqwmUbHEVnWxeh'
  }
};
```

### Using Shared Types

```typescript
import { Shared } from 'openbadges-types';

// Use shared types
const dateTime: Shared.DateTime = '2023-06-15T12:00:00Z';
const iri: Shared.IRI = 'https://example.org/badges/5';
```

### Version-Specific Operations

```typescript
import { OpenBadgesVersion, VersionedBadge } from 'openbadges-types';

// Function that works with either version
function processBadge<T extends OpenBadgesVersion>(
  badge: VersionedBadge<T>,
  version: T
): string {
  if (version === OpenBadgesVersion.V2) {
    // badge is typed as OB2.Assertion
    return (badge as OB2.Assertion).badge.name;
  } else {
    // badge is typed as OB3.VerifiableCredential
    const vc = badge as OB3.VerifiableCredential;
    const achievement = vc.credentialSubject.achievement;
    return Array.isArray(achievement) ? achievement[0].name.toString() : achievement.name.toString();
  }
}
```

## API Documentation

### Open Badges 2.0 Types

- `Assertion`: Represents an awarded badge to a specific recipient
- `BadgeClass`: Represents the type of achievement being awarded
- `Profile`: Represents an issuer of badges
- `IdentityObject`: Represents the identity of a badge recipient
- `VerificationObject`: Contains instructions for third parties to verify an assertion
- `Evidence`: Describes the work that the recipient did to earn the achievement
- `AlignmentObject`: Describes an alignment to an educational standard
- `Image`: Represents an image associated with a badge
- `Criteria`: Describes the criteria for earning the badge
- `RevocationList`: Contains a list of revoked assertions
- `CryptographicKey`: Represents a cryptographic key used for verification
- `Extension`: Represents an extension to the Open Badges specification

### Open Badges 3.0 Types

- `VerifiableCredential`: Based on the W3C Verifiable Credentials Data Model
- `Issuer`: Represents the entity issuing the credential
- `CredentialSubject`: Represents the entity receiving the credential
- `Achievement`: Represents the achievement being recognized
- `Proof`: Contains cryptographic proof information
- `Evidence`: Describes the evidence for the achievement
- `Criteria`: Describes the criteria for earning the achievement
- `Alignment`: Describes an alignment to an educational standard
- `ResultDescription`: Describes possible results for an achievement
- `Results`: Represents the results achieved by the recipient
- `CredentialStatus`: Represents the status of a credential
- `RefreshService`: Provides a way to refresh the credential
- `TermsOfUse`: Describes the terms of use for the credential

### Shared Types

- `IRI`: URI/URL type
- `DateTime`: ISO 8601 date format
- `JsonLdContext`: JSON-LD context type
- `MultiLanguageString`: Internationalization support
- `LanguageMap`: Record mapping language codes to strings
- `MarkdownText`: String that may contain Markdown
- `ImageObject`: Common image properties
- `JsonLdObject`: Base interface for JSON-LD objects
- `JsonLdArray`: Helper type for JSON-LD arrays

## Version Compatibility

This package supports:

- **Open Badges 2.0**: The IMS Global Final Release specification
- **Open Badges 3.0**: Based on the W3C Verifiable Credentials Data Model

## License

MIT
