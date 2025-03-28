// import type { LinkedDataObject } from '@digitalcredentials/vc-data-model'; // Cannot import this directly
import type { Achievement } from './Achievement';
import type { URI } from '../common';

/**
 * Represents the subject of an Open Badge v3.0 Credential.
 *
 * Defines properties directly as base types (like CredentialSubject)
 * are not directly exported from the vc-data-model package.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievementsubject
 */
export interface AchievementSubject {
  /**
   * The unique identifier for the subject (e.g., a DID).
   * Optional in base CredentialSubject, but often present.
   */
  id?: URI;

  /**
   * The type. MUST include "AchievementSubject".
   */
  type: ['AchievementSubject', ...string[]] | string[]; // Must include AchievementSubject

  /**
   * The achievement being described. MUST be present.
   */
  achievement: Achievement | URI; // Can be embedded or a URI reference

  // Other potential properties inherited conceptually from CredentialSubject/LinkedDataObject
  // like name, description, image could be added if needed by the spec for AchievementSubject

  // Allow additional properties
  [key: string]: unknown;
}
