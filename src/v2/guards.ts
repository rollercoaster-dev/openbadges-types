import { isJsonLdObject, hasJsonLdType, OB2Context, hasJsonLdContext } from '../shared';
import {
  Assertion,
  BadgeClass,
  Profile,
  IdentityObject,
  VerificationObject,
  Evidence,
  AlignmentObject,
  Image,
  Criteria,
  RevocationList,
  CryptographicKey
} from './index';

/**
 * Type guard to check if a value is an OB2 Assertion
 * @param value The value to check
 * @returns True if the value is a valid OB2 Assertion, false otherwise
 */
export function isAssertion(value: unknown): value is Assertion {
  if (!isJsonLdObject(value)) {
    return false;
  }

  // Check for required properties
  if (!hasJsonLdType(value, 'Assertion')) {
    return false;
  }

  return !(!('id' in value) || !('recipient' in value) || !('badge' in value) ||
      !('verification' in value) || !('issuedOn' in value));


}

/**
 * Type guard to check if a value is an OB2 BadgeClass
 * @param value The value to check
 * @returns True if the value is a valid OB2 BadgeClass, false otherwise
 */
export function isBadgeClass(value: unknown): value is BadgeClass {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for required properties
  // For embedded BadgeClass objects, they might not have @context,
  // but they should have type property
  if (!('type' in value) || (Array.isArray(value.type) ?
      !value.type.includes('BadgeClass') : value.type !== 'BadgeClass')) {
    return false;
  }

  return !(!('id' in value) || !('name' in value) || !('description' in value) ||
      !('image' in value) || !('criteria' in value) || !('issuer' in value));


}

/**
 * Type guard to check if a value is an OB2 Profile
 * @param value The value to check
 * @returns True if the value is a valid OB2 Profile, false otherwise
 */
export function isProfile(value: unknown): value is Profile {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for required properties
  // For embedded Profile objects, they might not have @context,
  // but they should have type property
  if (!('type' in value)) {
    return false;
  }

  // Check if type is Profile or Issuer
  const type = value.type;
  const isProfileType = Array.isArray(type) ?
    (type.includes('Profile') || type.includes('Issuer')) :
    (type === 'Profile' || type === 'Issuer');

  if (!isProfileType) {
    return false;
  }

  return !(!('id' in value) || !('name' in value));


}

/**
 * Type guard to check if a value is an OB2 IdentityObject
 * @param value The value to check
 * @returns True if the value is a valid OB2 IdentityObject, false otherwise
 */
export function isIdentityObject(value: unknown): value is IdentityObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for required properties
  return !(!('type' in value) || !('identity' in value));


}

/**
 * Type guard to check if a value is an OB2 VerificationObject
 * @param value The value to check
 * @returns True if the value is a valid OB2 VerificationObject, false otherwise
 */
export function isVerificationObject(value: unknown): value is VerificationObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for required properties
  return 'type' in value;


}

/**
 * Type guard to check if a value is an OB2 Evidence
 * @param value The value to check
 * @returns True if the value is a valid OB2 Evidence, false otherwise
 */
export function isEvidence(value: unknown): value is Evidence {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // No specific required properties for Evidence
  return true;
}

/**
 * Type guard to check if a value is an OB2 AlignmentObject
 * @param value The value to check
 * @returns True if the value is a valid OB2 AlignmentObject, false otherwise
 */
export function isAlignmentObject(value: unknown): value is AlignmentObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check for required properties
  return !(!('targetName' in value) || !('targetUrl' in value));


}

/**
 * Type guard to check if a value is an OB2 Image
 * @param value The value to check
 * @returns True if the value is a valid OB2 Image, false otherwise
 */
export function isImage(value: unknown): value is Image {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // No specific required properties for Image
  return true;
}

/**
 * Type guard to check if a value is an OB2 Criteria
 * @param value The value to check
 * @returns True if the value is a valid OB2 Criteria, false otherwise
 */
export function isCriteria(value: unknown): value is Criteria {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // No specific required properties for Criteria
  return true;
}

/**
 * Type guard to check if a value is an OB2 RevocationList
 * @param value The value to check
 * @returns True if the value is a valid OB2 RevocationList, false otherwise
 */
export function isRevocationList(value: unknown): value is RevocationList {
  if (!isJsonLdObject(value)) {
    return false;
  }

  // Check for required properties
  if (!hasJsonLdType(value, 'RevocationList')) {
    return false;
  }

  return !(!('id' in value) || !('revokedAssertions' in value));


}

/**
 * Type guard to check if a value is an OB2 CryptographicKey
 * @param value The value to check
 * @returns True if the value is a valid OB2 CryptographicKey, false otherwise
 */
export function isCryptographicKey(value: unknown): value is CryptographicKey {
  if (!isJsonLdObject(value)) {
    return false;
  }

  // Check for required properties
  if (!hasJsonLdType(value, 'CryptographicKey')) {
    return false;
  }

  return !(!('id' in value) || !('owner' in value));


}
