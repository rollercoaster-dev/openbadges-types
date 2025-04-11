import { IRI, DateTime, MarkdownText, MultiLanguageString } from '../shared/common';
import { JsonLdObject, JsonLdArray } from '../shared/jsonld';

/**
 * VerifiableCredential interface for Open Badges 3.0
 * Based on the W3C Verifiable Credentials Data Model v2.0
 */
export interface VerifiableCredential extends JsonLdObject {
  '@context': string | string[] | Record<string, any>;
  id: IRI;
  type: 'VerifiableCredential' | string | string[];
  issuer: IRI | Issuer;
  issuanceDate: DateTime;
  expirationDate?: DateTime;
  credentialSubject: CredentialSubject;
  proof?: Proof;
  credentialStatus?: CredentialStatus;
  refreshService?: RefreshService;
  termsOfUse?: TermsOfUse | TermsOfUse[];
  evidence?: Evidence | Evidence[];
  [key: string]: any;
}

/**
 * Issuer interface for Open Badges 3.0
 * Represents the entity issuing the credential
 */
export interface Issuer extends JsonLdObject {
  id: IRI;
  type?: string | string[];
  name?: string | MultiLanguageString;
  description?: string | MultiLanguageString;
  url?: IRI;
  image?: IRI;
  email?: string;
  telephone?: string;
  [key: string]: any;
}

/**
 * CredentialSubject interface for Open Badges 3.0
 * Represents the entity receiving the credential and their achievements
 */
export interface CredentialSubject {
  id?: IRI;
  type?: string | string[];
  achievement: Achievement | Achievement[];
  name?: string | MultiLanguageString;
  email?: string;
  [key: string]: any;
}

/**
 * Achievement interface for Open Badges 3.0
 * Represents the achievement being recognized
 */
export interface Achievement extends JsonLdObject {
  id?: IRI;
  type: string | string[];
  name: string | MultiLanguageString;
  description?: string | MultiLanguageString;
  criteria?: Criteria;
  image?: IRI;
  creator?: IRI | Issuer;
  alignments?: Alignment[];
  resultDescriptions?: ResultDescription[];
  [key: string]: any;
}

/**
 * Proof interface for Open Badges 3.0
 * Contains cryptographic proof information
 */
export interface Proof {
  type: string;
  created: DateTime;
  verificationMethod: IRI;
  proofPurpose: string;
  proofValue?: string;
  jws?: string;
  [key: string]: any;
}

/**
 * Evidence interface for Open Badges 3.0
 * Describes the evidence for the achievement
 */
export interface Evidence {
  id?: IRI;
  type?: string | string[];
  narrative?: string | MarkdownText;
  name?: string | MultiLanguageString;
  description?: string | MultiLanguageString;
  genre?: string;
  audience?: string;
  [key: string]: any;
}

/**
 * Criteria interface for Open Badges 3.0
 * Describes the criteria for earning the achievement
 */
export interface Criteria {
  id?: IRI;
  type?: string | string[];
  narrative?: string | MarkdownText;
  [key: string]: any;
}

/**
 * Alignment interface for Open Badges 3.0
 * Describes an alignment to an educational standard or skill framework
 */
export interface Alignment {
  targetName: string;
  targetUrl: IRI;
  targetDescription?: string;
  targetFramework?: string;
  targetCode?: string;
  [key: string]: any;
}

/**
 * ResultDescription interface for Open Badges 3.0
 * Describes possible results for an achievement
 */
export interface ResultDescription {
  id?: IRI;
  type?: string | string[];
  name?: string | MultiLanguageString;
  description?: string | MultiLanguageString;
  [key: string]: any;
}

/**
 * Results interface for Open Badges 3.0
 * Represents the results achieved by the recipient
 */
export interface Results {
  id?: IRI;
  type?: string | string[];
  resultDescription?: IRI | ResultDescription;
  status?: string;
  value?: string | number;
  [key: string]: any;
}

/**
 * CredentialStatus interface for Open Badges 3.0
 * Represents the status of a credential (e.g., revoked)
 */
export interface CredentialStatus {
  id: IRI;
  type: string;
  statusPurpose?: string;
  statusList?: IRI;
  [key: string]: any;
}

/**
 * RefreshService interface for Open Badges 3.0
 * Provides a way to refresh the credential
 */
export interface RefreshService {
  id: IRI;
  type: string;
  [key: string]: any;
}

/**
 * TermsOfUse interface for Open Badges 3.0
 * Describes the terms of use for the credential
 */
export interface TermsOfUse {
  id?: IRI;
  type: string;
  [key: string]: any;
}
