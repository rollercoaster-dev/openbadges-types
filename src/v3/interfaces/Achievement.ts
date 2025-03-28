import type { URI } from '../../common/types/URI';
import type { Image } from '../../common/types/Image';
import type { Criteria } from './Criteria';
import type { AlignmentObject } from './AlignmentObject';

/**
 * Represents the definition of an achievement in Open Badges 3.0.
 * This is embedded within the `credentialSubject` of an `OpenBadgeCredential`.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievement
 */
export interface Achievement {
  /**
   * The unique URI identifying the Achievement.
   * REQUIRED.
   */
  id: URI;

  /**
   * The type(s) of the object. Must include `"Achievement"`.
   * REQUIRED.
   */
  type: string | string[]; // e.g., ["Achievement", "BadgeClass"]

  /**
   * The name of the achievement.
   * REQUIRED.
   */
  name: string;

  /**
   * A short description of the achievement.
   * REQUIRED.
   */
  description: string;

  /**
   * The criteria for earning the achievement.
   * Can be a URI or an embedded Criteria object.
   * REQUIRED.
   */
  criteria: URI | Criteria;

  /**
   * An image representing the achievement.
   * Can be a URI or an embedded Image object.
   * Recommended.
   */
  image?: Image;

  /**
   * A list of tags that describe the achievement.
   * Optional.
   */
  tags?: string[];

  /**
   * Alignment to external standards or frameworks.
   * Optional.
   */
  alignment?: AlignmentObject[];

  /**
   * The type of achievement (e.g., "Badge", "Certificate", "Diploma").
   * Optional.
   */
  achievementType?: string;

  /**
   * Allows for extensions using JSON-LD.
   * Optional.
   */
  [key: string]: any; // Allows for extensions
}
