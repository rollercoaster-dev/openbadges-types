import type { AlignmentObject } from './AlignmentObject';
import type { Criteria } from './Criteria';
import type { ImageObject } from '../common/ImageObject';
import type { ResultDescription } from './ResultDescription'; // Placeholder
import type { Tag } from './Tag'; // Placeholder
import type { Type, URI, Markdown } from '../common';

/**
 * Represents a specific achievement realized by the credential subject.
 * Corresponds to the v3.0 Achievement type.
 *
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievement
 */
export interface Achievement {
  /**
   * The JSON-LD context (optional here, typically defined on the parent Credential).
   */
  '@context'?: string | (string | object)[];

  /**
   * A unique URI for the Achievement. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#id-6
   */
  id: URI;

  /**
   * The type of the object. MUST include "Achievement".
   * @see https://www.imsglobal.org/spec/ob/v3p0/#type-8
   */
  type: Type | Type[]; // Should include 'Achievement'

  /**
   * The name of the achievement. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#name-5
   */
  name: string;

  /**
   * A description of the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#description-5
   */
  description?: Markdown;

  /**
   * An image representing the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#image-6
   */
  image?: ImageObject;

  /**
   * The criteria for the achievement. MUST be present.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#criteria-4
   */
  criteria: Criteria | URI;

  /**
   * Tags related to the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#tags-1
   */
  tags?: Tag[] | string[]; // Can be Tag objects or strings

  /**
   * Alignment to educational standards. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#alignment-1
   */
  alignment?: AlignmentObject[];

  /**
   * The type of achievement. OPTIONAL.
   * Example: "Course", "Module", "Competency", "Assessment"
   * @see https://www.imsglobal.org/spec/ob/v3p0/#achievementtype
   */
  achievementType?: string;

  /**
   * Credits awarded for the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#creditsawarded
   */
  creditsAwarded?: number; // Spec says "Number"

  /**
   * Human workforce demand for this achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#humanworkforcedemand
   */
  humanWorkforceDemand?: unknown[]; // Changed from any[] to unknown[] for better type safety

  /**
   * Results associated with the achievement. OPTIONAL.
   * @see https://www.imsglobal.org/spec/ob/v3p0/#results
   */
  results?: ResultDescription[];

  // Allow additional properties
  [key: string]: unknown;
}
