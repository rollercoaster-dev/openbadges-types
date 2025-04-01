/**
 * @module
 * @description Defines the TypeScript interface for the Open Badges V3 Imsx_StatusInfo
 * @see https://www.imsglobal.org/spec/ob/v3p0/#imsx_statusinfo
 */

/**
 * This is the container for the status code and associated information returned within the HTTP messages received from the Service Provider.
 */
/**
 * Represents the Imsx_StatusInfo structure in Open Badges V3.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#imsx_statusinfo
 */
export interface Imsx_StatusInfo {
  /**
   * The code major value (from the corresponding enumerated vocabulary).
   */
  imsx_codeMajor: 'failure' | 'processing' | 'success' | 'unsupported';
  /**
   * The severity value (from the corresponding enumerated vocabulary).
   */
  imsx_severity: 'error' | 'status' | 'warning';
  /**
   * A human readable description supplied by the entity creating the status code information.
   */
  imsx_description?: string;
  imsx_codeMinor?: Imsx_CodeMinor;
}
/**
 * This is the container for the set of code minor status codes reported in the responses from the Service Provider.
 */
export interface Imsx_CodeMinor {
  /**
   * @minItems 1
   */
  imsx_codeMinorField: [Imsx_CodeMinorField, ...Imsx_CodeMinorField[]];
}
/**
 * This is the container for a single code minor status code.
 */
export interface Imsx_CodeMinorField {
  /**
   * This should contain the identity of the system that has produced the code minor status code report.
   */
  imsx_codeMinorFieldName: string;
  /**
   * The code minor status code (this is a value from the corresponding enumerated vocabulary).
   */
  imsx_codeMinorFieldValue:
    | 'forbidden'
    | 'fullsuccess'
    | 'internal_server_error'
    | 'invalid_data'
    | 'invalid_query_parameter'
    | 'misdirected_request'
    | 'not_acceptable'
    | 'not_allowed'
    | 'not_found'
    | 'not_modified'
    | 'server_busy'
    | 'unauthorizedrequest'
    | 'unknown';
}
