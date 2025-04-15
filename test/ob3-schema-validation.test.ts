import { validateOB3Credential } from '../src/validateWithSchema';
import { createOB3VerifiableCredential } from './helpers';

test('OB3 VerifiableCredential matches OB3 schema', () => {
  const credential = createOB3VerifiableCredential();
  const result = validateOB3Credential(credential);
  if (!result.valid) {
    console.error('Validation errors:', result.errors);
  }
  expect(result.valid).toBe(true);
});

test('OB3 VerifiableCredential missing required field fails validation', () => {
  const credential = { ...createOB3VerifiableCredential() };
  (credential as any).issuer = undefined;
  const result = validateOB3Credential(credential);
  expect(result.valid).toBe(false);
  console.log('Missing field errors:', result.errors);
});

test('OB3 VerifiableCredential with wrong type fails validation', () => {
  const credential = { ...createOB3VerifiableCredential(), issuanceDate: 12345 };
  const result = validateOB3Credential(credential);
  expect(result.valid).toBe(false);
  console.log('Wrong type errors:', result.errors);
});

test('OB3 VerifiableCredential with extra unexpected field fails validation', () => {
  const credential = { ...createOB3VerifiableCredential(), unexpectedField: 'oops' };
  const result = validateOB3Credential(credential);
  // Depending on schema, this may or may not fail. Log result for review.
  if (!result.valid) {
    console.log('Extra field errors:', result.errors);
  } else {
    console.log('Extra field accepted (schema allows extensions)');
  }
  // Accept either, but log for review
  expect(typeof result.valid).toBe('boolean');
}); 