import type { Type, URI } from '../common';

/**
 * Placeholder for ResultDescription type definition.
 * Describes the results related to an achievement.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#resultdescription
 */
export interface ResultDescription {
  id?: URI;
  type: Type; // Should include "ResultDescription"
  status: string; // e.g., "Completed", "Passed", "Failed"
  value?: string | number; // e.g., Score
  // ... other potential properties like resultDescription, achievementDate

  // Allow additional properties
  [key: string]: unknown;
}
