import type { URI } from '../types/URI';
import type { Markdown } from '../types/Markdown';

/**
 * Describes the criteria for awarding a badge.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#Criteria
 */
export interface Criteria {
    /**
     * The unique URI for this criteria document.
     * Optional.
     */
    id?: URI;

    /**
     * Type indicator for the criteria.
     * Must be the string `"Criteria"`.
     * Optional in OB 2.0 spec, but recommended.
     */
    type?: "Criteria";

    /**
     * A narrative description of the criteria in Markdown.
     * Required.
     */
    narrative: Markdown;

    /**
     * Allows for extensions using JSON-LD.
     * Optional.
     */
    [key: string]: any; // Allows for extensions
} 