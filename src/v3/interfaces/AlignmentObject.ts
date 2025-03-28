import type { URI } from '../../common/types/URI';

/**
 * Represents an alignment to an external standard, framework, or competency in Open Badges 3.0.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#alignmentobject
 */
export interface AlignmentObject {
  /**
   * The name of the alignment target.
   * REQUIRED.
   */
  targetName: string;

  /**
   * The URL of the alignment target.
   * REQUIRED.
   */
  targetUrl: URI;

  /**
   * A description of the alignment target.
   * Optional.
   */
  targetDescription?: string;

  /**
   * The framework to which the target belongs (e.g., "CEFR", "ISTE").
   * Optional.
   */
  targetFramework?: string;

  /**
   * The code associated with the alignment target within its framework.
   * Optional.
   */
  targetCode?: string;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
