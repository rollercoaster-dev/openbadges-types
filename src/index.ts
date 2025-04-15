// Main entry point for the Open Badges Types package
// Exports all types from v2, v3, and shared modules

// Export shared types
export * as Shared from './shared';

// Export Open Badges 2.0 types
export * as OB2 from './v2';

// Export Open Badges 3.0 types
export * as OB3 from './v3';

// Export validation utilities
export * from './validation';

// Type to determine which Open Badges version to use

export enum OpenBadgesVersion {
  // eslint-disable-next-line no-unused-vars
  V2 = '2.0',
  // eslint-disable-next-line no-unused-vars
  V3 = '3.0',
}

// Import types directly to avoid circular references
import { Assertion as OB2Assertion } from './v2';
import { VerifiableCredential as OB3VerifiableCredential } from './v3';

// Helper type for version-specific badge operations
export type VersionedBadge<T extends OpenBadgesVersion> = T extends OpenBadgesVersion.V2
  ? OB2Assertion
  : T extends OpenBadgesVersion.V3
    ? OB3VerifiableCredential
    : never;
