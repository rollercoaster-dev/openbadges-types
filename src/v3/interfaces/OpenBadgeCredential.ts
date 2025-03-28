import type { VerifiableCredential } from '../index'; // Import base type from barrel file
import type { OpenBadgeCredentialSubject } from './OpenBadgeCredentialSubject';

/**
 * Represents an Open Badge v3 Credential.
 * Combines the base W3C Verifiable Credential with OBv3 specifics.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#credentials
 */
export type OpenBadgeCredential = VerifiableCredential & {
    /**
     * The type(s) of the object. Must include `"VerifiableCredential"` and `"OpenBadgeCredential"`.
     * REQUIRED.
     * Overrides the base `type`.
     */
    type: ["VerifiableCredential", "OpenBadgeCredential", ...string[]];

    /**
     * The specific claims related to the Open Badge award.
     * REQUIRED.
     * Overrides the base `credentialSubject`.
     */
    credentialSubject: OpenBadgeCredentialSubject | OpenBadgeCredentialSubject[];

    // Note: Properties like id, issuer, issuanceDate, proof are inherited via the intersection.
    // Constraints like `proof` being REQUIRED must be ensured by implementers based on OBv3 spec.
}; 