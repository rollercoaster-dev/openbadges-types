import type { URI } from '../../common/types/URI';

/**
 * Represents an alignment to an external standard, framework, or competency.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#AlignmentObject
 */
export interface AlignmentObject {
  /**
   * The name of the alignment target.
   * Required.
   */
  targetName: string;

  /**
   * The URL of the alignment target.
   * Required.
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
  [key: string]: unknown; // Changed from any
}
