import type { URI } from '../../common/types/URI';
import type { Markdown } from '../../common/types/Markdown';
import type { Achievement } from './Achievement';
import type { Evidence } from './Evidence';

/**
 * Defines the structure of the `credentialSubject` for an OpenBadgeCredential.
 * Contains the achievement details and other claims about the subject.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#credentials V3 Credential structure
 */
export interface OpenBadgeCredentialSubject {
  /**
   * The unique identifier for the subject (recipient) of the credential.
   * REQUIRED. Often a DID URI.
   */
  id: URI;

  /**
   * The type(s) of the credential subject.
   * Should include `"AchievementSubject"`.
   * Recommended.
   */
  type?: string | string[]; // e.g., "AchievementSubject"

  /**
   * The achievement being awarded.
   * Can be a URI or an embedded Achievement object.
   * REQUIRED.
   */
  achievement: URI | Achievement;

  /**
   * Evidence supporting this specific credential instance.
   * Can be a URI or an embedded Evidence object(s).
   * Optional.
   */
  evidence?: URI | Evidence | (URI | Evidence)[];

  /**
   * A narrative describing the achievement specifically for this credential instance.
   * Optional.
   */
  narrative?: Markdown;

  /**
   * Additional claims about the subject relevant to the achievement.
   * Allows for extensions.
   */
  [key: string]: any;
}
