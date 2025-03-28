import type { Type, URI, Markdown } from '../common';

/**
 * Placeholder for Criteria type definition.
 * Describes the requirements for earning a badge.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#criteria
 */
export interface Criteria {
  id?: URI; // Optional in spec, but often used for context
  type: Type; // Should include "Criteria"

  /**
   * A narrative description of the criteria. Markdown is allowed.
   */
  narrative: Markdown;

  // Allow additional properties
  [key: string]: any;
}
