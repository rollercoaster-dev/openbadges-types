import type { Type, URI, Markdown } from '../common';
import type { ImageObject } from '../common/ImageObject';

/**
 * Placeholder for IssuerProfile type definition.
 * Likely corresponds to the Profile type in the spec.
 * Represents information about the issuer.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#profile
 */
export interface IssuerProfile {
  id: URI;
  type: Type; // Should include "Profile"
  name?: string;
  url?: URI;
  phone?: string; // Consider defining a specific Telephone type in common
  description?: Markdown;
  image?: ImageObject;
  email?: string; // Consider defining a specific Email type in common
  // ... other potential Profile properties

  // Allow additional properties
  [key: string]: unknown;
}
