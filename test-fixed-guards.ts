// Test the fixed type guards
import { OB3, Shared } from './dist/index.js';

// Import the fixed type guards
import { isIssuer, isAchievement } from './src/v3/guards-fixed.js';

// Test with objects that don't have @context
const issuer: OB3.Issuer = {
  id: 'https://example.org/issuers/123' as Shared.IRI,
  type: 'Profile',
  name: 'Example Maker Society',
  url: 'https://example.org' as Shared.IRI,
  email: 'contact@example.org',
};

const achievement: OB3.Achievement = {
  id: 'https://example.org/achievements/1' as Shared.IRI,
  type: 'Achievement',
  name: '3-D Printmaster',
  description: 'This badge is awarded for passing the 3-D printing knowledge and safety test.',
  criteria: {
    narrative:
      'Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on key skills.',
  },
};

// Test with array types
const issuerWithArrayType: OB3.Issuer = {
  ...issuer,
  type: ['Profile'],
};

const achievementWithArrayType: OB3.Achievement = {
  ...achievement,
  type: ['Achievement'],
};

// Test the fixed type guards
console.log('Fixed guards - Is issuer valid?', isIssuer(issuer));
console.log('Fixed guards - Is achievement valid?', isAchievement(achievement));
console.log('Fixed guards - Is issuer with array type valid?', isIssuer(issuerWithArrayType));
console.log(
  'Fixed guards - Is achievement with array type valid?',
  isAchievement(achievementWithArrayType)
);
