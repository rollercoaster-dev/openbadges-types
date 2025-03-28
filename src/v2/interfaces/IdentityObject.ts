/**
 * Represents the recipient of a badge.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#IdentityObject
 */
export interface IdentityObject {
  /**
   * The type of identity being used (e.g., "email", "url", "telephone").
   * Required.
   */
  type: string;

  /**
   * Whether the `identity` value is hashed.
   * Required.
   */
  hashed: boolean;

  /**
   * The identity value itself (e.g., the hashed email address).
   * Required.
   */
  identity: string;

  /**
   * If hashed, the algorithm used (e.g., "sha256$").
   * Optional, but required if `hashed` is true.
   */
  salt?: string;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
