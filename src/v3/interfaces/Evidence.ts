import type { URI } from '../../common/types/URI';
import type { Markdown } from '../../common/types/Markdown';

/**
 * Represents evidence supporting an OpenBadgeCredential in OBv3.
 * Often included within the credentialSubject.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#evidence
 */
export interface Evidence {
  /**
   * The unique URI for this evidence item.
   * REQUIRED if embedded.
   */
  id: URI;

  /**
   * Type indicator for the evidence.
   * Should include `"Evidence"`.
   * Recommended.
   */
  type?: string | string[];

  /**
   * A narrative describing the evidence in Markdown.
   * Optional.
   */
  narrative?: Markdown;

  /**
   * A description of the evidence.
   * Optional.
   */
  description?: string;

  /**
   * The name of the evidence.
   * Optional.
   */
  name?: string;

  /**
   * The genre or type of the evidence.
   * Optional.
   */
  genre?: string;

  /**
   * The audience for which the evidence is intended.
   * Optional.
   */
  audience?: string;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
