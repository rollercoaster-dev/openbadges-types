# Open Badges Protocol Compliance

This document outlines how the OpenBadges Types package complies with the [Open Badges v2.0 Specification](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html).

## Type Definitions

Our type definitions strictly follow the data models defined in the Open Badges specification:

### Core Classes

- **Assertion**: Represents an awarded badge, following the [Assertion](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Assertion) class in the specification
- **BadgeClass**: Represents a badge template, following the [BadgeClass](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#BadgeClass) class
- **Profile**: Represents an issuer or recipient, following the [Profile](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Profile) class

### Supporting Classes

- **IdentityObject**: Follows the [IdentityObject](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#IdentityObject) class
- **VerificationObject**: Follows the [VerificationObject](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#VerificationObject) class
- **Evidence**: Follows the [Evidence](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Evidence) class
- **AlignmentObject**: Follows the [AlignmentObject](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#Alignment) class

## Data Types

We've implemented the primitive data types as specified in the [Open Badges specification](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#datatypes):

- **IRI**: Implemented as a branded string type for type safety
- **DateTime**: Implemented as a branded string type that follows ISO 8601 format
- **IdentityHash**: Implemented as specified for hashed identities
- **MarkdownText**: Implemented as a string type that can contain Markdown formatting

## JSON-LD Compliance

Our implementation supports the JSON-LD requirements of the Open Badges specification:

- **Context**: We support the proper `@context` values for both OB2 and OB3
- **Types**: We enforce the correct `type` values for all badge objects
- **Validation**: Our type guards validate that objects have the required properties according to the specification

## Verification

Our implementation supports both verification methods specified in the Open Badges specification:

- **HostedBadge**: For badge assertions that are hosted at a stable URL
- **SignedBadge**: For badge assertions that are cryptographically signed

## Type Guards

We've implemented comprehensive type guards that validate objects according to the Open Badges specification:

- **isJsonLdObject**: Validates that an object is a valid JSON-LD object with both `@context` and `type` properties
- **isAssertion**: Validates that an object is a valid Assertion according to the specification
- **isBadgeClass**: Validates that an object is a valid BadgeClass according to the specification
- **isProfile**: Validates that an object is a valid Profile according to the specification

## Examples

See the [examples](./examples.md) document for concrete examples of how to use the library in a way that complies with the Open Badges specification.
