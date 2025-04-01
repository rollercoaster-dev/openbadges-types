/**
 * @module
 * @description Defines the TypeScript interface for the Open Badges V3 EndorsementCredential
 * @see https://www.imsglobal.org/spec/ob/v3p0/#endorsementcredential
 */

/**
 * JSON-LD Context. Either a URI with the context definition or a Map with a local context definition MUST be supplied.
 */
export type Context =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * A description of the individual, entity, or organization that issued the credential. Either a URI or a simplified Profile object MUST be supplied.
 */
export type ProfileRef =
  | string
  | {
      /**
       * Unique URI for the Issuer/Profile file.
       */
      id: string;
      /**
       * @minItems 1
       */
      type: [string, ...string[]];
      name?: string;
      [k: string]: unknown;
    };

/**
 * A verifiable credential that asserts a claim about an entity. As described in [[[#data-integrity]]], at least one proof mechanism, and the details necessary to evaluate that proof, MUST be expressed for a credential to be a verifiable credential. In the case of an embedded proof, the credential MUST append the proof in the `proof` property.
 */
/**
 * Represents the EndorsementCredential structure in Open Badges V3.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#endorsementcredential
 */
export interface EndorsementCredential {
  /**
   * @minItems 2
   */
  '@context': ['https://www.w3.org/ns/credentials/v2', string, ...Context[]];
  type: [string, ...string[]];
  /**
   * Unambiguous reference to the credential.
   */
  id: string;
  /**
   * The name of the credential for display purposes in wallets. For example, in a list of credentials and in detail views.
   */
  name: string;
  /**
   * The short description of the credential for display purposes in wallets.
   */
  description?: string;
  credentialSubject: EndorsementSubject;
  /**
   * Timestamp of when the credential was awarded. `validFrom` is used to determine the most recent version of a Credential in conjunction with `issuer` and `id`. Consequently, the only way to update a Credental is to update the `validFrom`, losing the date when the Credential was originally awarded. `awardedDate` is meant to keep this original date.
   */
  awardedDate?: string;
  issuer: ProfileRef;
  /**
   * Timestamp of when the credential becomes valid.
   */
  validFrom: string;
  /**
   * If the credential has some notion of validity period, this indicates a timestamp when a credential should no longer be considered valid. After this time, the credential should be considered invalid.
   */
  validUntil?: string;
  proof?: Proof[];
  credentialSchema?: CredentialSchema[];
  credentialStatus?: CredentialStatus;
  refreshService?: RefreshService;
  termsOfUse?: TermsOfUse[];
  [k: string]: unknown;
}
/**
 * A collection of information about the subject of the endorsement.
 */
export interface EndorsementSubject {
  /**
   * The identifier of the individual, entity, organization, assertion, or achievement that is endorsed.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * Allows endorsers to make a simple claim in writing about the entity.
   */
  endorsementComment?: string;
  [k: string]: unknown;
}
/**
 * A JSON-LD Linked Data proof.
 */
export interface Proof {
  /**
   * Signature suite used to produce proof.
   */
  type: string;
  /**
   * Date the proof was created.
   */
  created?: string;
  /**
   * The suite used to create the proof.
   */
  cryptosuite?: string;
  /**
   * A value chosen by the verifier to mitigate authentication proof replay attacks.
   */
  challenge?: string;
  /**
   * The domain of the proof to restrict its use to a particular target.
   */
  domain?: string;
  /**
   * A value chosen by the creator of proof to randomize proof values for privacy purposes.
   */
  nonce?: string;
  /**
   * The purpose of the proof to be used with `verificationMethod`. MUST be 'assertionMethod'.
   */
  proofPurpose?: string;
  /**
   * Value of the proof.
   */
  proofValue?: string;
  /**
   * The URL of the public key that can verify the signature.
   */
  verificationMethod?: string;
  [k: string]: unknown;
}
/**
 * Identify the type and location of a data schema.
 */
export interface CredentialSchema {
  /**
   * The value MUST be a URI identifying the schema file. One instance of `CredentialSchema` MUST have an `id` that is the URL of the JSON Schema for this credential defined by this specification.
   */
  id: string;
  /**
   * The value MUST identify the type of data schema validation. One instance of `CredentialSchema` MUST have a `type` of 'JsonSchemaValidator2019'.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * The information in CredentialStatus is used to discover information about the current status of a verifiable credential, such as whether it is suspended or revoked.
 */
export interface CredentialStatus {
  /**
   * The value MUST be the URL of the issuer's credential status method.
   */
  id: string;
  /**
   * The name of the credential status method.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * The information in RefreshService is used to refresh the verifiable credential.
 */
export interface RefreshService {
  /**
   * The value MUST be the URL of the issuer's refresh service.
   */
  id: string;
  /**
   * The name of the refresh service method.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * Terms of use can be utilized by an issuer or a holder to communicate the terms under which a verifiable credential or verifiable presentation was issued
 */
export interface TermsOfUse {
  /**
   * The value MUST be a URI identifying the term of use.
   */
  id?: string;
  /**
   * The value MUST identify the type of the terms of use.
   */
  type: string;
  [k: string]: unknown;
}
