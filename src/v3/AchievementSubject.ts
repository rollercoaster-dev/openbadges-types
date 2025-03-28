import type { CredentialSubject } from '@digitalcredentials/vc-data-model';
import type { Achievement } from './Achievement';
import type { Type, URI } from '../common';

/**
 * Represents the subject of an Open Badge v3.0 Credential.
 *
 * This extends the base CredentialSubject, requiring an 'achievement' property.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievementsubject
 */
export interface AchievementSubject extends CredentialSubject {
  /**
   * The type. MUST include "AchievementSubject".
   */
  type: ['AchievementSubject', ...string[]] | string[]; // Must include AchievementSubject

  /**
   * The achievement being described. MUST be present.
   */
  achievement: Achievement | URI; // Can be embedded or a URI reference

  // Inherits id, potentially other properties from CredentialSubject
  // Allow additional properties
  [key: string]: any;
}
