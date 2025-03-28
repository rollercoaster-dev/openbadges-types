import type { URI } from '../../common/types/URI';
import type { DateTime } from '../../common/types/DateTime';
import type { Image } from '../../common/types/Image';
import type { Markdown } from '../../common/types/Markdown';
import type { VerificationObject } from '../types/VerificationObject';
import type { BadgeClass } from './BadgeClass';
import type { Evidence } from './Evidence';
import type { IdentityObject } from './IdentityObject';

/**
 * Represents the instance of a badge awarded to a recipient.
 * This is the core object that links a recipient to a BadgeClass.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#Assertion
 */
export interface Assertion {
  /**
   * The unique URI identifying the Assertion.
   * Required.
   */
  id: URI;

  /**
   * The type of the object. Must be `"Assertion"`.
   * Required.
   */
  type: 'Assertion' | ['Assertion', ...string[]]; // Must be "Assertion" or array starting with "Assertion"

  /**
   * The recipient of the badge.
   * Required.
   */
  recipient: IdentityObject;

  /**
   * The definition of the badge being awarded.
   * Can be a URI pointing to a BadgeClass or an embedded BadgeClass object.
   * Required.
   */
  badge: URI | BadgeClass;

  /**
   * Information on how to verify this assertion.
   * Required.
   */
  verification: VerificationObject;

  /**
   * The date and time the badge was issued.
   * Required.
   */
  issuedOn: DateTime;

  /**
   * An image representing the assertion, if different from the BadgeClass image.
   * Often used for baked badges.
   * Optional.
   */
  image?: Image;

  /**
   * Evidence supporting this specific assertion instance.
   * Can be a URI or an embedded Evidence object.
   * Optional.
   */
  evidence?: URI | Evidence | (URI | Evidence)[];

  /**
   * The date and time when the assertion expires.
   * Optional.
   */
  expires?: DateTime;

  /**
   * A narrative describing the achievement specifically for this assertion instance.
   * Optional.
   */
  narrative?: Markdown;

  /**
   * Indicates whether the assertion has been revoked.
   * Optional.
   */
  revoked?: boolean;

  /**
   * If revoked, the reason for revocation.
   * Optional (Required if `revoked` is true, though spec implies optional).
   */
  revocationReason?: string;

  /**
   * The `@context` property required for JSON-LD.
   * Should typically be "https://w3id.org/openbadges/v2".
   * Recommended.
   */
  '@context'?: string | (string | object)[];

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: unknown; // Changed from any
}
