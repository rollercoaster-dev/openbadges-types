// Shared types for both Open Badges 2.0 and 3.0
export type IRI = string;
export type DateTime = string; // ISO 8601 format
export type JsonLdContext = string | string[] | Record<string, any>;
export type LanguageMap = Record<string, string>;
export type MarkdownText = string;

// Common utility type for multi-language support
export interface MultiLanguageString {
  [language: string]: string;
}

// Common image type
export interface ImageObject {
  id?: IRI;
  type?: string;
  caption?: string | MultiLanguageString;
  author?: string;
}
