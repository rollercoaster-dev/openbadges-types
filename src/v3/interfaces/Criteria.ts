import type { URI } from '../../common/types/URI';
import type { Markdown } from '../../common/types/Markdown';

/**
 * Describes the criteria for earning an achievement in Open Badges 3.0.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#criteria
 */
export interface Criteria {
  /**
   * The unique URI for this criteria document.
   * Optional.
   */
  id?: URI;

  /**
   * Type indicator for the criteria.
   * Should include `"Criteria"`.
   * Recommended.
   */
  type?: string | string[]; // e.g., "Criteria"

  /**
   * A narrative description of the criteria in Markdown.
   * Required.
   */
  narrative: Markdown;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
