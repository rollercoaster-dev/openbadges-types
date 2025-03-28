import type { Type, URI } from '../common';

/**
 * Placeholder for Tag type definition.
 * Represents a tag or keyword.
 * Note: The spec allows tags property to be simple strings as well.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#tag
 */
export interface Tag {
  id?: URI;
  type: Type; // Should include "Tag"
  name: string;

  // Allow additional properties
  [key: string]: unknown;
}
