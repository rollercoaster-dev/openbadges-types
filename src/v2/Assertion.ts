/**
 * @module
 * @description Defines the TypeScript interface for the Open Badges V2 Assertion
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#assertion
 */

/**
 * A link to a valid JSON-LD context file, that maps term names to contexts. Open Badges contexts may also define JSON-schema to validate Badge Objects against. In an Open Badges Object, this will almost always be a string:uri to a single context file, but might rarely be an array of links or context objects instead. This schema also allows direct mapping of terms to IRIs by using an object as an option within an array.
 */
export type JsonLdContext =
  | string
  | (
      | string
      | {
          [k: string]: unknown;
        }
      | unknown[]
    )[];
/**
 * A type or an array of types that the badge object represents. The first or only item should be 'assertion', and any others should each be an IRI (usually a URL) corresponding to a definition of the type itself. In almost all cases, an assertion will only have one type: 'assertion'
 */
export type JsonLdType = string | string[];
export type HashString = OpenBadgesSHA1Hash | OpenBadgesSHA256Hash;
export type IdentityType = 'email';
export type VerificationType = 'hosted' | 'signed';
export type DateTime = ISODateTime | UNIXTimeStamp;
/**
 * ISO 8601 date format string yyyy-MM-dd'T'HH:mm:ss.SSS with optional .SSS milliseconds
 */
export type ISODateTime = string;
/**
 * 10-digit UNIX timestamp, epoch time
 */
export type UNIXTimeStamp = number;

/**
 * The 1.1 OBI specification mandates that the baked assertion be an object with linked Badge Class and that JSON-LD context and type declarations be present
 */
/**
 * Represents the Assertion structure in Open Badges V2.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html#assertion
 */
export interface Assertion {
  '@context': JsonLdContext;
  type: JsonLdType;
  id?: string;
  uid: string;
  recipient: BadgeIdentityObject;
  badge: string;
  verify: VerificationObject;
  issuedOn: DateTime;
  evidence?: string;
  expires?: DateTime;
  [k: string]: unknown;
}
export interface BadgeIdentityObject {
  identity: (string & HashString) | string;
  type: IdentityType;
  hashed: boolean;
  salt?: string;
  [k: string]: unknown;
}
export interface OpenBadgesSHA1Hash {
  [k: string]: unknown;
}
export interface OpenBadgesSHA256Hash {
  [k: string]: unknown;
}
export interface VerificationObject {
  type: VerificationType;
  url?: string;
  [k: string]: unknown;
}
