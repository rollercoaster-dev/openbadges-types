import type { URI } from '../../common/types/URI';
import type { Email } from '../../common/types/Email';
import type { Image } from '../../common/types/Image';
import type { Telephone } from '../../common/types/Telephone';

/**
 * Represents the issuer of a badge, typically an organization or entity.
 * In OB 2.0, this is modeled as a Profile.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#Profile
 */
export interface Profile {
  /**
   * The unique URI identifying the issuer profile.
   * Required.
   */
  id: URI;

  /**
   * The type of the object. Must be `"Profile"`.
   * Required.
   */
  type: 'Profile' | 'Issuer' | ('Profile' | 'Issuer')[]; // OBv2 uses Profile, Issuer is common in VC contexts

  /**
   * The name of the issuing organization.
   * Required.
   */
  name: string;

  /**
   * A description of the issuer.
   * Optional.
   */
  description?: string;

  /**
   * A URI for the issuer's official website.
   * Required.
   */
  url: URI;

  /**
   * An email address for contacting the issuer.
   * Required.
   */
  email: Email;

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
   * A URI pointing to a Revocation List for badges issued by this profile.
   * Optional.
   */
  revocationList?: URI;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
