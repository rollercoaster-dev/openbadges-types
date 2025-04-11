/**
 * JSON-LD related types for Open Badges
 */
export interface JsonLdObject {
  '@context'?: string | string[] | Record<string, any>;
  type?: string | string[];
  id?: string;
  [key: string]: any;
}

// Type for JSON-LD context specifically for Open Badges 2.0
export const OB2Context = 'https://w3id.org/openbadges/v2';

// Type for JSON-LD context specifically for Open Badges 3.0
export const OB3Context = 'https://purl.imsglobal.org/spec/ob/v3p0/context.json';

// Type for W3C Verifiable Credentials context
export const VCContext = 'https://www.w3.org/2018/credentials/v1';

// Helper type for JSON-LD arrays
export type JsonLdArray<T> = T | T[];

/**
 * Type guard to check if a value is a JsonLdObject
 * @param value The value to check
 * @returns True if the value is a valid JsonLdObject, false otherwise
 */
export function isJsonLdObject(value: unknown): value is JsonLdObject {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // According to the Open Badges specification, a valid JSON-LD object must have both @context and type
  return '@context' in value && 'type' in value;
}

/**
 * Type guard to check if a value is a JSON-LD array
 * @param value The value to check
 * @param itemGuard Optional type guard function to check each item in the array
 * @returns True if the value is a valid JSON-LD array, false otherwise
 */
export function isJsonLdArray<T>(
  value: unknown,
  itemGuard?: (item: unknown) => item is T
): value is JsonLdArray<T> {
  if (Array.isArray(value)) {
    return itemGuard ? value.every(item => itemGuard(item)) : true;
  }

  return itemGuard ? itemGuard(value) : true;
}

/**
 * Type guard to check if a value has a specific JSON-LD type
 * @param value The value to check
 * @param type The type to check for
 * @returns True if the value has the specified type, false otherwise
 */
export function hasJsonLdType(value: unknown, type: string): boolean {
  if (!isJsonLdObject(value)) {
    return false;
  }

  if (Array.isArray(value.type)) {
    return value.type.includes(type);
  }

  return value.type === type;
}

/**
 * Type guard to check if a value has a specific JSON-LD context
 * @param value The value to check
 * @param context The context to check for
 * @returns True if the value has the specified context, false otherwise
 */
export function hasJsonLdContext(value: unknown, context: string): boolean {
  if (!isJsonLdObject(value)) {
    return false;
  }

  if (Array.isArray(value['@context'])) {
    return value['@context'].includes(context);
  }

  if (typeof value['@context'] === 'string') {
    return value['@context'] === context;
  }

  return false;
}
