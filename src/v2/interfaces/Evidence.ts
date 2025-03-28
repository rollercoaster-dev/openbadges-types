import type { URI } from '../types/URI';
import type { Markdown } from '../types/Markdown';

/**
 * Represents evidence supporting an Assertion, specific to the award instance.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#Evidence
 */
export interface Evidence {
    /**
     * The unique URI for this evidence item.
     * Optional.
     */
    id?: URI;

    /**
     * Type indicator for the evidence.
     * Must be the string `"Evidence"`.
     * Optional in OB 2.0 spec, but recommended.
     */
    type?: "Evidence";

    /**
     * A narrative describing the evidence in Markdown.
     * Optional.
     */
    narrative?: Markdown;

    /**
     * A description of the evidence.
     * Optional.
     */
    description?: string;

    /**
     * The name of the evidence.
     * Optional.
     */
    name?: string;

    /**
     * The genre or type of the evidence.
     * Optional.
     */
    genre?: string;

    /**
     * The audience for which the evidence is intended.
     * Optional.
     */
    audience?: string;

    /**
     * Allows for extensions using JSON-LD.
     * Optional.
     */
    [key: string]: any; // Allows for extensions
} 