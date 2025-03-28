import type {
    VerifiableCredential,
    VerifiablePresentation,
    // Issuer type is part of VerifiableCredential definition, not exported directly
} from '@digitalcredentials/vc-data-model';

// Base VC types from external library
export type {
    VerifiableCredential,
    VerifiablePresentation,
};

// OBv3 Interfaces
export type { Profile } from './interfaces/Profile'; // Represents the Issuer in OBv3 context
export type { Criteria } from './interfaces/Criteria';
export type { AlignmentObject } from './interfaces/AlignmentObject';
export type { Achievement } from './interfaces/Achievement';
export type { Evidence } from './interfaces/Evidence';
export type { OpenBadgeCredentialSubject } from './interfaces/OpenBadgeCredentialSubject';
export type { OpenBadgeCredential } from './interfaces/OpenBadgeCredential';

// We can access sub-types like CredentialSubject via VerifiableCredential["credentialSubject"]
// and Proof via VerifiableCredential["proof"] if needed, but they aren't exported directly.

// TODO: Add other OBv3 specific types (Achievement, OpenBadgeCredential, etc.)

// TODO: Add OBv3 specific types (OpenBadgeCredential, Achievement, etc.)