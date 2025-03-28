import type {
  VerifiableCredential,
  VerifiablePresentation,
  // Issuer type is part of VerifiableCredential definition, not exported directly
} from '@digitalcredentials/vc-data-model';

// Base VC types from external library
export type { VerifiableCredential, VerifiablePresentation };

// OBv3 Interfaces
// export type { Profile } from './interfaces/Profile'; // Represents the Issuer in OBv3 context
// export type { Criteria } from './interfaces/Criteria';
// export type { AlignmentObject } from './interfaces/AlignmentObject';
// export type { Achievement } from './interfaces/Achievement';
// export type { Evidence } from './interfaces/Evidence';
// export type { OpenBadgeCredentialSubject } from './interfaces/OpenBadgeCredentialSubject';
// export type { OpenBadgeCredential } from './interfaces/OpenBadgeCredential';

// We can access sub-types like CredentialSubject via VerifiableCredential["credentialSubject"]
// and Proof via VerifiableCredential["proof"] if needed, but they aren't exported directly.

// TODO: Add other OBv3 specific types (Achievement, OpenBadgeCredential, etc.)

// TODO: Add OBv3 specific types (OpenBadgeCredential, Achievement, etc.)

// TODO: Define Open Badges v3 types here

// Import defined v3 types explicitly using 'import type'
import type { Achievement } from './Achievement';
import type { BadgeClass } from './BadgeClass';
import type { Criteria } from './Criteria';
import type { AlignmentObject } from './AlignmentObject';
import type { IssuerProfile } from './IssuerProfile'; // Consider renaming to Profile later
import type { ResultDescription } from './ResultDescription';
import type { Tag } from './Tag';
import type { AchievementSubject } from './AchievementSubject';
import type { OpenBadgeCredential } from './OpenBadgeCredential';

// Export defined v3 types explicitly
export type {
  Achievement,
  BadgeClass,
  Criteria,
  AlignmentObject,
  IssuerProfile,
  ResultDescription,
  Tag,
  AchievementSubject,
  OpenBadgeCredential,
};

// Still missing dedicated files for:
// import type { OpenBadgeCredential } from './OpenBadgeCredential';
// import type { AchievementSubject } from './AchievementSubject';
// export type { OpenBadgeCredential, AchievementSubject };

// ... potential other missing types like Profile, Evidence ...

// export {}; // No longer needed if we have explicit exports
