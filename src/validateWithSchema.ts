import Ajv from 'ajv';
import vcCredentialSchema from '../schemas/vc-credential-schema.json';
import ob3Schema from '../schemas/ob3-schema.json';

// Create a more strict AJV instance for validation
const ajv = new Ajv({
  allErrors: true,
  strict: false,
  strictRequired: true, // Require all required properties
  strictTypes: true, // Strict type checking
  validateSchema: false, // Allow draft-2020-12 schemas without meta schema validation
});

// Remove the $schema meta to avoid Ajv meta-schema resolution errors
if (typeof vcCredentialSchema === 'object' && vcCredentialSchema !== null) {
  delete (vcCredentialSchema as Record<string, unknown>)['$schema'];
}
// Register the VC credential schema so AJV can resolve the W3C $ref
ajv.addSchema(vcCredentialSchema);
// Register the OB3 schema so AJV knows its definitions
ajv.addSchema(ob3Schema);
// Compile OB3 schema by reference to its $id (so definitions resolve properly)
const validateOB3 = ajv.compile({ $ref: ob3Schema.$id });

/**
 * Validates an Open Badges 3.0 credential against the schema
 * @param data The credential to validate
 * @returns An object with validation results
 */
export interface ValidationError {
  message: string;
  [key: string]: unknown;
}

export function validateOB3Credential(data: unknown): {
  valid: boolean;
  errors?: ValidationError[];
} {
  // Check for required fields manually since AJV might be too permissive
  if (typeof data !== 'object' || data === null) {
    return {
      valid: false,
      errors: [{ message: 'Data must be an object' }],
    };
  }

  const credential = data as Record<string, unknown>;

  // Check for required fields
  if (
    !credential.id ||
    !credential.type ||
    !credential.issuer ||
    !credential.issuanceDate ||
    !credential.credentialSubject ||
    typeof credential.issuanceDate !== 'string'
  ) {
    return {
      valid: false,
      errors: [{ message: 'Missing required fields in VerifiableCredential' }],
    };
  }

  // Check credential subject
  const credentialSubject = credential.credentialSubject as Record<string, unknown> | undefined;
  if (!credentialSubject || !credentialSubject.achievement) {
    return {
      valid: false,
      errors: [{ message: 'Missing required achievement in credentialSubject' }],
    };
  }

  // Check achievement
  const achievement = credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    if (achievement.length === 0 || !(achievement[0] as Record<string, unknown>).name) {
      return {
        valid: false,
        errors: [{ message: 'Achievement must have a name' }],
      };
    }
  } else if (!(achievement as Record<string, unknown>).name) {
    return {
      valid: false,
      errors: [{ message: 'Achievement must have a name' }],
    };
  }

  // Check issuer
  if (typeof credential.issuer === 'object' && credential.issuer !== null) {
    const issuer = credential.issuer as Record<string, unknown>;
    if (!issuer.id || !issuer.name) {
      return {
        valid: false,
        errors: [{ message: 'Issuer must have id and name' }],
      };
    }
  }

  // Run AJV validation
  const valid = validateOB3(data);
  // Convert AJV errors to our ValidationError format
  const errors = validateOB3.errors
    ? validateOB3.errors.map(err => ({
        message: err.message || 'Unknown validation error',
        ...err,
      }))
    : undefined;
  return { valid, errors };
}
