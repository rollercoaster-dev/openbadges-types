import Ajv from 'ajv';
import { OB3_CONTEXT } from './schemas';

// Create a more strict AJV instance for validation
const ajv = new Ajv({
  allErrors: true,
  strict: false,
  strictRequired: true, // Require all required properties
  strictTypes: true,   // Strict type checking
});

const validateOB3 = ajv.compile(OB3_CONTEXT);

/**
 * Validates an Open Badges 3.0 credential against the schema
 * @param data The credential to validate
 * @returns An object with validation results
 */
export function validateOB3Credential(data: unknown): { valid: boolean; errors?: any } {
  // Check for required fields manually since AJV might be too permissive
  if (typeof data !== 'object' || data === null) {
    return {
      valid: false,
      errors: [{ message: 'Data must be an object' }]
    };
  }

  const credential = data as Record<string, any>;

  // Check for required fields
  if (!credential.id || !credential.type || !credential.issuer ||
      !credential.issuanceDate || !credential.credentialSubject ||
      typeof credential.issuanceDate !== 'string') {
    return {
      valid: false,
      errors: [{ message: 'Missing required fields in VerifiableCredential' }]
    };
  }

  // Check credential subject
  if (!credential.credentialSubject.achievement) {
    return {
      valid: false,
      errors: [{ message: 'Missing required achievement in credentialSubject' }]
    };
  }

  // Check achievement
  const achievement = credential.credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    if (achievement.length === 0 || !achievement[0].name) {
      return {
        valid: false,
        errors: [{ message: 'Achievement must have a name' }]
      };
    }
  } else if (!achievement.name) {
    return {
      valid: false,
      errors: [{ message: 'Achievement must have a name' }]
    };
  }

  // Check issuer
  if (typeof credential.issuer === 'object' &&
      (!credential.issuer.id || !credential.issuer.name)) {
    return {
      valid: false,
      errors: [{ message: 'Issuer must have id and name' }]
    };
  }

  // Run AJV validation
  const valid = validateOB3(data);
  return { valid, errors: validateOB3.errors };
}
