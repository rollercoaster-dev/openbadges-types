import { OB2 } from '../src';
import { createOB2Assertion } from './helpers';

describe('OB2 Type Guards', () => {
  describe('isAssertion', () => {
    test('should correctly identify valid OB2 Assertions', () => {
      const validAssertion = createOB2Assertion();
      
      expect(OB2.isAssertion(validAssertion)).toBe(true);
      
      // Invalid assertions
      expect(OB2.isAssertion(null)).toBe(false);
      expect(OB2.isAssertion({})).toBe(false);
      expect(OB2.isAssertion({
        '@context': 'https://w3id.org/openbadges/v2',
        'type': 'BadgeClass' // Wrong type
      })).toBe(false);
      expect(OB2.isAssertion({
        '@context': 'https://w3id.org/openbadges/v2',
        'type': 'Assertion',
        // Missing required properties
      })).toBe(false);
    });
  });
  
  describe('isBadgeClass', () => {
    test('should correctly identify valid OB2 BadgeClass objects', () => {
      const validBadgeClass = createOB2Assertion().badge;
      
      expect(OB2.isBadgeClass(validBadgeClass)).toBe(true);
      
      // Invalid badge classes
      expect(OB2.isBadgeClass(null)).toBe(false);
      expect(OB2.isBadgeClass({})).toBe(false);
      expect(OB2.isBadgeClass({
        '@context': 'https://w3id.org/openbadges/v2',
        'type': 'Assertion' // Wrong type
      })).toBe(false);
    });
  });
  
  describe('isProfile', () => {
    test('should correctly identify valid OB2 Profile objects', () => {
      const validProfile = (createOB2Assertion().badge as OB2.BadgeClass).issuer;
      
      expect(OB2.isProfile(validProfile)).toBe(true);
      
      // Invalid profiles
      expect(OB2.isProfile(null)).toBe(false);
      expect(OB2.isProfile({})).toBe(false);
      expect(OB2.isProfile({
        '@context': 'https://w3id.org/openbadges/v2',
        'type': 'BadgeClass' // Wrong type
      })).toBe(false);
    });
  });
  
  describe('isIdentityObject', () => {
    test('should correctly identify valid OB2 IdentityObject objects', () => {
      const validIdentityObject = createOB2Assertion().recipient;
      
      expect(OB2.isIdentityObject(validIdentityObject)).toBe(true);
      
      // Invalid identity objects
      expect(OB2.isIdentityObject(null)).toBe(false);
      expect(OB2.isIdentityObject({})).toBe(false);
      expect(OB2.isIdentityObject({
        'type': 'email'
        // Missing identity property
      })).toBe(false);
    });
  });
  
  describe('isVerificationObject', () => {
    test('should correctly identify valid OB2 VerificationObject objects', () => {
      const validVerificationObject = createOB2Assertion().verification;
      
      expect(OB2.isVerificationObject(validVerificationObject)).toBe(true);
      
      // Invalid verification objects
      expect(OB2.isVerificationObject(null)).toBe(false);
      expect(OB2.isVerificationObject({})).toBe(false);
      expect(OB2.isVerificationObject({
        // Missing type property
      })).toBe(false);
    });
  });
  
  // Additional tests for other type guards can be added here
});
