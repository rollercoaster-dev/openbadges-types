import type { URI } from '../../common/types/URI';

/**
 * Represents information about verifying an Assertion.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#VerificationObject
 */
export type VerificationObject = {
  /**
   * The type of verification method.
   * For OB 2.0, commonly `"hosted"` or `"signed"`.
   * Required.
   */
  type: string | string[];

  /**
   * URI of the assertion to be verified. Only used in `hosted` verification.
   * Optional (Required for `hosted` type).
   */
  url?: URI;

  /**
   * URI of the public key needed to verify a `signed` assertion.
   * Optional (Required for `signed` type).
   */
  creator?: URI;

  /**
   * The list of allowed domains for the verification assertion (for `hosted` type).
   * Optional.
   */
  allowedOrigins?: string[];

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
};
