// TODO: Define shared types here

// Common Type Aliases
/**
 * Represents a Uniform Resource Identifier (URI), typically a string.
 */
export type URI = string;

/**
 * Represents the type property in JSON-LD, which can be a string or an array of strings.
 */
export type Type = string | string[];

/**
 * Represents text content that may contain Markdown formatting.
 */
export type Markdown = string;

export type { DateTime } from './types/DateTime';
export type { Email } from './types/Email';
export type { Telephone } from './types/Telephone';
export type { Image } from './types/Image';

// Add other common types/interfaces/enums here if needed in the future

export * from './ImageObject'; // Will add this file next

export {}; // Ensure this file is treated as a module
