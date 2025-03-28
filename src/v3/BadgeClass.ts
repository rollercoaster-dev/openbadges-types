import type { AlignmentObject } from './AlignmentObject'; // Placeholder import
import type { Criteria } from './Criteria'; // Placeholder import
import type { ImageObject } from '../common/ImageObject'; // Assuming ImageObject might be common or v3 specific
import type { IssuerProfile } from './IssuerProfile'; // Placeholder import for the issuer type (likely Profile)
import type { Type, URI, Markdown } from '../common'; // Assuming common base types

/**
 * Represents the definition of an achievement or credential.
 * Corresponds to the v3.0 BadgeClass type.
 *
 * @see https://www.imsglobal.org/spec/ob/v3p0/#badgeclass
 */
export interface BadgeClass {
  /**
   * The JSON-LD context. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#context
   */
  '@context': string | (string | object)[];

  /**
   * A unique URI for the BadgeClass. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#id-5
   */
  id: URI;

  /**
   * The type of the object. MUST include "BadgeClass".
   * @see https://www.imsglobal.org/spec/ob/v3p0/#type-7
   */
  type: Type | Type[]; // Should include 'BadgeClass'

  /**
   * Information about the issuer. MUST be present.
   * This should reference an IssuerProfile (likely the Profile type).
   * @see https://www.imsglobal.org/spec/ob/v3p0/#issuer-3
   */
  issuer: URI | IssuerProfile; // Reference to Issuer Profile

  /**
   * The name of the achievement. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#name-4
   */
  name: string;

  /**
   * A description of the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#description-4
   */
  description?: Markdown;

  /**
   * An image representing the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#image-5
   */
  image?: ImageObject; // Reusing ImageObject, needs definition

  /**
   * The criteria for earning the achievement. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#criteria-3
   */
  criteria: Criteria | URI; // Criteria object or URI

  /**
   * Alignment to educational standards or frameworks. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#alignment
   */
  alignment?: AlignmentObject[];

  /**
   * Tags that describe the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#tags
   */
  tags?: string[];

  /**
   * Related BadgeClasses. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#related
   */
  related?: BadgeClass[]; // Recursive relationship

  // Allow additional properties as per JSON-LD flexibility
  [key: string]: unknown;
}
