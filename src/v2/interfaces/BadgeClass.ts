import type { URI } from '../types/URI';
import type { Image } from '../types/Image';
import type { Criteria } from './Criteria';
import type { Profile } from './Profile';
import type { AlignmentObject } from './AlignmentObject';

/**
 * Represents the definition of an awarded badge.
 * Contains information about the achievement but not about the recipient or the specific award instance.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#BadgeClass
 */
export interface BadgeClass {
    /**
     * The unique URI identifying the BadgeClass.
     * Required.
     */
    id: URI;

    /**
     * The type of the object. Must be `"BadgeClass"`.
     * Required.
     */
    type: "BadgeClass" | "Achievement" | ("BadgeClass" | "Achievement")[]; // OBv2 uses BadgeClass, Achievement is common in VC/OBv3 contexts

    /**
     * The issuer of the badge.
     * Can be a URI pointing to a Profile or an embedded Profile object.
     * Required.
     */
    issuer: URI | Profile;

    /**
     * The name of the achievement.
     * Required.
     */
    name: string;

    /**
     * A short description of the achievement.
     * Required.
     */
    description: string;

    /**
     * The image representing the badge.
     * Can be a URI or an embedded Image object.
     * Required.
     */
    image: Image;

    /**
     * The criteria for earning the badge.
     * Can be a URI or an embedded Criteria object.
     * Required.
     */
    criteria: URI | Criteria;

    /**
     * A list of tags that describe the achievement.
     * Optional.
     */
    tags?: string[];

    /**
     * Alignment to external standards or frameworks.
     * Optional.
     */
    alignment?: AlignmentObject[];

    /**
     * The `@context` property required for JSON-LD.
     * Should typically be "https://w3id.org/openbadges/v2".
     * Recommended.
     */
    "@context"?: string | (string | object)[];

    /**
     * Allows for extensions using JSON-LD.
     * Optional.
     */
    [key: string]: any; // Allows for extensions
} 