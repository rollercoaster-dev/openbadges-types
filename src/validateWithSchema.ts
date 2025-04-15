import Ajv from 'ajv';
import { OB3_CONTEXT } from './schemas';

const ajv = new Ajv({ allErrors: true, strict: false });
const validateOB3 = ajv.compile(OB3_CONTEXT);

export function validateOB3Credential(data: unknown): { valid: boolean; errors?: any } {
  const valid = validateOB3(data);
  return { valid, errors: validateOB3.errors };
}
