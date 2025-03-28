import type { Type, URI } from './index';

/**
 * Represents an image, typically referenced by a URI.
 * Based on the ImageObject definition in v3.0.
 *
 * @see https://www.imsglobal.org/spec/ob/v3p0/#imageobject
 */
export interface ImageObject {
  /**
   * The unique URI identifying the image. MUST be present.
   */
  id: URI;

  /**
   * The type of the object. MUST be "Image".
   */
  type: Type; // Should be "Image"

  /**
   * A caption for the image. OPTIONAL.
   */
  caption?: string;

  // Allow additional properties
  [key: string]: unknown;
}
