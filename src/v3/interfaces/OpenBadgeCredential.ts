import type { VerifiableCredential } from '@digitalcredentials/vc-data-model';
import type { OpenBadgeCredentialSubject } from './OpenBadgeCredentialSubject';

/**
 * Represents an Open Badge v3 Credential.
 * Defines the specific shape for an OBv3 object, which is a type of Verifiable Credential.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#credentials
 */
export type OpenBadgeCredential = VerifiableCredential & {
    /**
     * The type(s) of the object. Must include `"VerifiableCredential"` and `"OpenBadgeCredential"`.
     * REQUIRED.
     * Overrides the base `type` (which could be string[] or string).
     */
    type: ["VerifiableCredential", "OpenBadgeCredential", ...string[]];

    /**
     * The specific claims related to the Open Badge award.
     * REQUIRED.
     * Overrides the base `credentialSubject`.
     */
    credentialSubject: OpenBadgeCredentialSubject | OpenBadgeCredentialSubject[];

    // Note: Other properties (id, issuer, etc.) are technically part of the intersection
    // with the object form (`VCDIVerifiableCredential`) within the VerifiableCredential union.
    // Accessing them requires type narrowing.
}; 