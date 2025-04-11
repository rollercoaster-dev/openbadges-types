// Main entry point for the Open Badges Types package
// Exports all types from v2, v3, and shared modules

// Export shared types
export * as Shared from './shared';

// Export Open Badges 2.0 types
export * as OB2 from './v2';

// Export Open Badges 3.0 types
export * as OB3 from './v3';

// Type to determine which Open Badges version to use
export enum OpenBadgesVersion {
  V2 = '2.0',
  V3 = '3.0'
}

// Helper type for version-specific badge operations
export type VersionedBadge<T extends OpenBadgesVersion> = 
  T extends OpenBadgesVersion.V2 ? OB2.Assertion :
  T extends OpenBadgesVersion.V3 ? OB3.VerifiableCredential :
  never;
