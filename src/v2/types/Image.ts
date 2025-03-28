import type { URI } from './URI';
import type { DateTime } from './DateTime';

/**
 * Represents an image object or a URI pointing to an image.
 * @see https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html#Image
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
     * Optional in OB 2.0 spec, but recommended.
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