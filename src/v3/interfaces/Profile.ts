import type { URI } from '../../common/types/URI';
import type { Email } from '../../common/types/Email';
import type { Image } from '../../common/types/Image';
import type { Telephone } from '../../common/types/Telephone';

/**
 * Represents the issuer of a badge in Open Badges 3.0.
 * Aligns with the Verifiable Credentials Issuer definition.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#issuer-profile
 * @see https://www.w3.org/TR/vc-data-model-2.0/#issuer
 */
export interface Profile {
  /**
   * The unique URI identifying the issuer profile (e.g., a DID).
   * REQUIRED.
   */
  id: URI;

  /**
   * The type(s) of the object. Should include "Profile".
   * REQUIRED.
   */
  type: string | string[]; // e.g., ["Profile", "Issuer"]

  /**
   * The name of the issuing organization or entity.
   * Recommended.
   */
  name?: string;

  /**
   * A description of the issuer.
   * Optional.
   */
  description?: string;

  /**
   * A URI for the issuer's official website or landing page.
   * Recommended.
   */
  url?: URI;

  /**
   * An email address for contacting the issuer.
   * Optional.
   */
  email?: Email;

  /**
   * A URI pointing to an image representing the issuer (logo).
   * Optional.
   */
  image?: Image;

  /**
   * A telephone number for the issuer.
   * Optional.
   */
  telephone?: Telephone;

  /**
   * A URI pointing to a Revocation List registry for credentials issued by this profile.
   * Optional.
   */
  revocationList?: URI; // Note: OBv3 often uses credentialStatus in the VC itself

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
