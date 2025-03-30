import { z } from 'zod';
// Minimal Zod schema for v3 Profile
const profileSchema = z.object({
    id: z.string().url(),
    type: z.array(z.string()).min(1),
    name: z.string().optional(),
    url: z.string().url().optional(),
    email: z.string().email().optional(),
    // Add other key fields as needed for basic validation
}).passthrough(); // Allow other fields present in the generated type
// --- Test Data ---
const minimalValidProfile = {
    id: 'https://example.org/issuer',
    type: ['Profile'],
    name: 'Example Issuer'
};
// --- Tests ---
describe('v3 Profile Validation', () => {
    it('should successfully validate a minimal valid profile', () => {
        expect(() => profileSchema.parse(minimalValidProfile)).not.toThrow();
    });
    // TODO: Add more tests later
});
//# sourceMappingURL=Profile.test.js.map