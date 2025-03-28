import type { URI } from './URI';
import type { DateTime } from './DateTime';

/**
 * Represents an image object or a URI pointing to an image.
 * The structure is largely consistent between OBv2 and OBv3.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#image
 */
export type Image = URI | {
    /**
     * The unique URI for this image.
     * Required.
     */
    id: URI;

    /**
     * Type indicator for the image.
     * Must be the string `"Image"`.
     * Recommended.
     */
    type?: "Image";

    /**
     * The author of the image.
     * Optional.
     */
    author?: URI;

    /**
     * The caption for the image.
     * Optional.
     */
    caption?: string;

    /**
     * The date the image was created.
     * Optional.
     */
    created?: DateTime;

    /**
     * The copyright holder of the image.
     * Optional.
     */
    copyrightHolder?: URI;
}; 