import type {
  VCDIVerifiableCredential,
  CredentialSubject,
  IssuerObject,
} from '@digitalcredentials/vc-data-model';
import type { AchievementSubject } from './AchievementSubject'; // Placeholder
import type { Type, URI } from '../common';

/**
 * Represents an Open Badge v3.0 Credential.
 *
 * This extends the base Verifiable Credential data model, specifying
 * the required type and the structure of the credentialSubject.
 *
 * @see https://www.imsglobal.org/spec/ob/v3p0/#openbadgecredential
 */
export interface OpenBadgeCredential
  extends Omit<VCDIVerifiableCredential, 'type' | 'credentialSubject'> {
  /**
   * The JSON-LD context. MUST include the OBv3 context URL.
   * Inherited from VCDIVerifiableCredential, but crucial for OBv3.
   */
  '@context': any; // Simplified to 'any' for now to avoid redundancy error

  /**
   * The type. MUST include "VerifiableCredential" and "OpenBadgeCredential".
   * @see https://www.imsglobal.org/spec/ob/v3p0/#type-6
   */
  type: ['VerifiableCredential', 'OpenBadgeCredential', ...string[]] | string[]; // Must include both

  /**
   * The subject of the credential. MUST be of type AchievementSubject.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#credentialsubject
   */
  credentialSubject: AchievementSubject | AchievementSubject[];

  // Other properties like id, issuer, issuanceDate, proof are inherited
  // from VCDIVerifiableCredential via intersection.
}

// Type guard to check if an object is specifically an OpenBadgeCredential (basic check)
export function isOpenBadgeCredential(
  credential: unknown // Use unknown instead of any for better type safety
): credential is OpenBadgeCredential {
  // Check if it's a non-null object first
  if (typeof credential !== 'object' || credential === null) {
    return false;
  }

  // Use type assertion after checking object type
  const cred = credential as Record<string, unknown>;

  return (
    Array.isArray(cred.type) &&
    cred.type.includes('VerifiableCredential') &&
    cred.type.includes('OpenBadgeCredential') &&
    typeof cred.credentialSubject === 'object' // Basic check, could be refined
  );
}
