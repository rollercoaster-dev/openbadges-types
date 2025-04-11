// JSON-LD related types for Open Badges
export interface JsonLdObject {
  '@context': string | string[] | Record<string, any>;
  type: string | string[];
  id?: string;
  [key: string]: any;
}

// Type for JSON-LD context specifically for Open Badges 2.0
export const OB2Context = 'https://w3id.org/openbadges/v2';

// Helper type for JSON-LD arrays
export type JsonLdArray<T> = T | T[];

// Type guard to check if a value is a JsonLdObject
export function isJsonLdObject(value: any): value is JsonLdObject {
  return typeof value === 'object' && 
         value !== null && 
         ('@context' in value) && 
         ('type' in value);
}
