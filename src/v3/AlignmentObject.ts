import type { Type, URI } from '../common';

/**
 * Placeholder for AlignmentObject type definition.
 * Represents alignment to an educational standard.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#alignmentobject
 */
export interface AlignmentObject {
  id?: URI; // Optional in spec, but often used for context
  type: Type; // Should include "AlignmentObject"
  targetName: string;
  targetUrl: URI;
  targetDescription?: string;
  targetFramework?: string;
  targetCode?: string;

  // Allow additional properties
  [key: string]: unknown;
}
