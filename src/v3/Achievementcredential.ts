/**
 * @module
 * @description Defines the TypeScript interface for the Open Badges V3 AchievementCredential
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievementcredential
 */

/**
 * JSON-LD Context. Either a URI with the context definition or a Map with a local context definition MUST be supplied.
 */
export type Context =
  | string
  | {
      [k: string]: unknown;
    };
/**
 * A description of the individual, entity, or organization that issued the credential. Either a URI with the Unique URI for the Issuer/Profile file, or a Profile object MUST be supplied.
 */
export type ProfileRef = string | Profile;

/**
 * AchievementCredentials are representations of an awarded achievement, used to share information about a achievement belonging to one earner. Maps to a Verifiable Credential as defined in the [[VC-DATA-MODEL-2.0]]. As described in [[[#data-integrity]]], at least one proof mechanism, and the details necessary to evaluate that proof, MUST be expressed for a credential to be a verifiable credential. In the case of an embedded proof, the credential MUST append the proof in the `proof` property.
 */
/**
 * Represents the AchievementCredential structure in Open Badges V3.
 * @see https://www.imsglobal.org/spec/ob/v3p0/#achievementcredential
 */
export interface AchievementCredential {
  /**
   * @minItems 2
   */
  '@context': ['https://www.w3.org/ns/credentials/v2', string, ...Context[]];
  /**
   * Unambiguous reference to the credential.
   */
  id: string;
  type: [string, ...string[]];
  /**
   * The name of the credential for display purposes in wallets. For example, in a list of credentials and in detail views.
   */
  name?: string;
  /**
   * The short description of the credential for display purposes in wallets.
   */
  description?: string;
  image?: Image;
  /**
   * Timestamp of when the credential was awarded. `validFrom` is used to determine the most recent version of a Credential in conjunction with `issuer` and `id`. Consequently, the only way to update a Credental is to update the `validFrom`, losing the date when the Credential was originally awarded. `awardedDate` is meant to keep this original date.
   */
  awardedDate?: string;
  credentialSubject: AchievementSubject;
  endorsement?: EndorsementCredential[];
  endorsementJwt?: string[];
  evidence?: Evidence[];
  issuer: ProfileRef;
  /**
   * Timestamp of when the credential becomes valid.
   */
  validFrom: string;
  /**
   * If the credential has some notion of validity period, this indicates a timestamp when a credential should no longer be considered valid. After this time, the credential should be considered invalid.
   */
  validUntil?: string;
  proof?: Proof[];
  credentialSchema?: CredentialSchema[];
  credentialStatus?: CredentialStatus;
  refreshService?: RefreshService;
  termsOfUse?: TermsOfUse[];
  [k: string]: unknown;
}
/**
 * Metadata about images that represent assertions, achieve or profiles. These properties can typically be represented as just the id string of the image, but using a fleshed-out document allows for including captions and other applicable metadata.
 */
export interface Image {
  /**
   * The URI or Data URI of the image.
   */
  id: string;
  /**
   * MUST be the IRI 'Image'.
   */
  type: 'Image';
  /**
   * The caption for the image.
   */
  caption?: string;
}
/**
 * A collection of information about the recipient of an achievement. Maps to Credential Subject in [[VC-DATA-MODEL-2.0]].
 */
export interface AchievementSubject {
  /**
   * An identifier for the Credential Subject. Either `id` or at least one `identifier` MUST be supplied.
   */
  id?: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * The datetime the activity ended.
   */
  activityEndDate?: string;
  /**
   * The datetime the activity started.
   */
  activityStartDate?: string;
  /**
   * The number of credits earned, generally in semester or quarter credit hours. This field correlates with the Achievement `creditsAvailable` field.
   */
  creditsEarned?: number;
  achievement: Achievement;
  identifier?: IdentityObject[];
  image?: Image;
  /**
   * The license number that was issued with this credential.
   */
  licenseNumber?: string;
  /**
   * A narrative that connects multiple pieces of evidence. Likely only present at this location if evidence is a multi-value array.
   */
  narrative?: string;
  result?: Result[];
  /**
   * Role, position, or title of the learner when demonstrating or performing the achievement or evidence of learning being asserted. Examples include 'Student President', 'Intern', 'Captain', etc.
   */
  role?: string;
  source?: Profile;
  /**
   * The academic term in which this assertion was achieved.
   */
  term?: string;
  [k: string]: unknown;
}
/**
 * A collection of information about the accomplishment recognized by the Assertion. Many assertions may be created corresponding to one Achievement.
 */
export interface Achievement {
  /**
   * Unique URI for the Achievement.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  alignment?: Alignment[];
  /**
   * The type of achievement. This is an extensible vocabulary.
   */
  achievementType?:
    | (
        | 'Achievement'
        | 'ApprenticeshipCertificate'
        | 'Assessment'
        | 'Assignment'
        | 'AssociateDegree'
        | 'Award'
        | 'Badge'
        | 'BachelorDegree'
        | 'Certificate'
        | 'CertificateOfCompletion'
        | 'Certification'
        | 'CommunityService'
        | 'Competency'
        | 'Course'
        | 'CoCurricular'
        | 'Degree'
        | 'Diploma'
        | 'DoctoralDegree'
        | 'Fieldwork'
        | 'GeneralEducationDevelopment'
        | 'JourneymanCertificate'
        | 'LearningProgram'
        | 'License'
        | 'Membership'
        | 'ProfessionalDoctorate'
        | 'QualityAssuranceCredential'
        | 'MasterCertificate'
        | 'MasterDegree'
        | 'MicroCredential'
        | 'ResearchDoctorate'
        | 'SecondarySchoolDiploma'
      )
    | string;
  creator?: Profile;
  /**
   * Credit hours associated with this entity, or credit hours possible. For example 3.0.
   */
  creditsAvailable?: number;
  criteria: Criteria;
  /**
   * A short description of the achievement.
   */
  description: string;
  endorsement?: EndorsementCredential[];
  endorsementJwt?: string[];
  /**
   * Category, subject, area of study, discipline, or general branch of knowledge. Examples include Business, Education, Psychology, and Technology.
   */
  fieldOfStudy?: string;
  /**
   * The code, generally human readable, associated with an achievement.
   */
  humanCode?: string;
  image?: Image;
  /**
   * The language of the achievement.
   */
  inLanguage?: string;
  /**
   * The name of the achievement.
   */
  name: string;
  otherIdentifier?: IdentifierEntry[];
  related?: Related[];
  resultDescription?: ResultDescription[];
  /**
   * Name given to the focus, concentration, or specific area of study defined in the achievement. Examples include 'Entrepreneurship', 'Technical Communication', and 'Finance'.
   */
  specialization?: string;
  tag?: string[];
  /**
   * The version property allows issuers to set a version string for an Achievement. This is particularly useful when replacing a previous version with an update.
   */
  version?: string;
  [k: string]: unknown;
}
/**
 * Describes an alignment between an achievement and a node in an educational framework.
 */
export interface Alignment {
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * If applicable, a locally unique string identifier that identifies the alignment target within its framework and/or targetUrl.
   */
  targetCode?: string;
  /**
   * Short description of the alignment target.
   */
  targetDescription?: string;
  /**
   * Name of the alignment.
   */
  targetName: string;
  /**
   * Name of the framework the alignment target.
   */
  targetFramework?: string;
  /**
   * The type of the alignment target node.
   */
  targetType?:
    | (
        | 'ceasn:Competency'
        | 'ceterms:Credential'
        | 'CFItem'
        | 'CFRubric'
        | 'CFRubricCriterion'
        | 'CFRubricCriterionLevel'
        | 'CTDL'
      )
    | string;
  /**
   * URL linking to the official description of the alignment target, for example an individual standard within an educational framework.
   */
  targetUrl: string;
  [k: string]: unknown;
}
/**
 * A Profile is a collection of information that describes the entity or organization using Open Badges. Issuers must be represented as Profiles, and endorsers, or other entities may also be represented using this vocabulary. Each Profile that represents an Issuer may be referenced in many BadgeClasses that it has defined. Anyone can create and host an Issuer file to start issuing Open Badges. Issuers may also serve as recipients of Open Badges, often identified within an Assertion by specific properties, like their url or contact email address.
 */
export interface Profile {
  /**
   * Unique URI for the Issuer/Profile file.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * The name of the entity or organization.
   */
  name?: string;
  /**
   * The homepage or social media profile of the entity, whether individual or institutional. Should be a URL/URI Accessible via HTTP.
   */
  url?: string;
  /**
   * A phone number.
   */
  phone?: string;
  /**
   * A short description of the issuer entity or organization.
   */
  description?: string;
  endorsement?: EndorsementCredential[];
  endorsementJwt?: string[];
  image?: Image;
  /**
   * An email address.
   */
  email?: string;
  address?: Address;
  otherIdentifier?: IdentifierEntry[];
  /**
   * If the entity is an organization, `official` is the name of an authorized official of the organization.
   */
  official?: string;
  parentOrg?: Profile;
  /**
   * Family name. In the western world, often referred to as the 'last name' of a person.
   */
  familyName?: string;
  /**
   * Given name. In the western world, often referred to as the 'first name' of a person.
   */
  givenName?: string;
  /**
   * Additional name. Includes what is often referred to as 'middle name' in the western world.
   */
  additionalName?: string;
  /**
   * Patronymic name.
   */
  patronymicName?: string;
  /**
   * Honorific prefix(es) preceding a person's name (e.g. 'Dr', 'Mrs' or 'Mr').
   */
  honorificPrefix?: string;
  /**
   * Honorific suffix(es) following a person's name (e.g. 'M.D, PhD').
   */
  honorificSuffix?: string;
  /**
   * Family name prefix. As used in some locales, this is the leading part of a family name (e.g. 'de' in the name 'de Boer').
   */
  familyNamePrefix?: string;
  /**
   * Birthdate of the person.
   */
  dateOfBirth?: string;
  [k: string]: unknown;
}
/**
 * A verifiable credential that asserts a claim about an entity. As described in [[[#data-integrity]]], at least one proof mechanism, and the details necessary to evaluate that proof, MUST be expressed for a credential to be a verifiable credential. In the case of an embedded proof, the credential MUST append the proof in the `proof` property.
 */
export interface EndorsementCredential {
  /**
   * @minItems 2
   */
  '@context': ['https://www.w3.org/ns/credentials/v2', string, ...Context[]];
  type: [string, ...string[]];
  /**
   * Unambiguous reference to the credential.
   */
  id: string;
  /**
   * The name of the credential for display purposes in wallets. For example, in a list of credentials and in detail views.
   */
  name: string;
  /**
   * The short description of the credential for display purposes in wallets.
   */
  description?: string;
  credentialSubject: EndorsementSubject;
  /**
   * Timestamp of when the credential was awarded. `validFrom` is used to determine the most recent version of a Credential in conjunction with `issuer` and `id`. Consequently, the only way to update a Credental is to update the `validFrom`, losing the date when the Credential was originally awarded. `awardedDate` is meant to keep this original date.
   */
  awardedDate?: string;
  issuer: ProfileRef;
  /**
   * Timestamp of when the credential becomes valid.
   */
  validFrom: string;
  /**
   * If the credential has some notion of validity period, this indicates a timestamp when a credential should no longer be considered valid. After this time, the credential should be considered invalid.
   */
  validUntil?: string;
  proof?: Proof[];
  credentialSchema?: CredentialSchema[];
  credentialStatus?: CredentialStatus;
  refreshService?: RefreshService;
  termsOfUse?: TermsOfUse[];
  [k: string]: unknown;
}
/**
 * A collection of information about the subject of the endorsement.
 */
export interface EndorsementSubject {
  /**
   * The identifier of the individual, entity, organization, assertion, or achievement that is endorsed.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * Allows endorsers to make a simple claim in writing about the entity.
   */
  endorsementComment?: string;
  [k: string]: unknown;
}
/**
 * A JSON-LD Linked Data proof.
 */
export interface Proof {
  /**
   * Signature suite used to produce proof.
   */
  type: string;
  /**
   * Date the proof was created.
   */
  created?: string;
  /**
   * The suite used to create the proof.
   */
  cryptosuite?: string;
  /**
   * A value chosen by the verifier to mitigate authentication proof replay attacks.
   */
  challenge?: string;
  /**
   * The domain of the proof to restrict its use to a particular target.
   */
  domain?: string;
  /**
   * A value chosen by the creator of proof to randomize proof values for privacy purposes.
   */
  nonce?: string;
  /**
   * The purpose of the proof to be used with `verificationMethod`. MUST be 'assertionMethod'.
   */
  proofPurpose?: string;
  /**
   * Value of the proof.
   */
  proofValue?: string;
  /**
   * The URL of the public key that can verify the signature.
   */
  verificationMethod?: string;
  [k: string]: unknown;
}
/**
 * Identify the type and location of a data schema.
 */
export interface CredentialSchema {
  /**
   * The value MUST be a URI identifying the schema file. One instance of `CredentialSchema` MUST have an `id` that is the URL of the JSON Schema for this credential defined by this specification.
   */
  id: string;
  /**
   * The value MUST identify the type of data schema validation. One instance of `CredentialSchema` MUST have a `type` of 'JsonSchemaValidator2019'.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * The information in CredentialStatus is used to discover information about the current status of a verifiable credential, such as whether it is suspended or revoked.
 */
export interface CredentialStatus {
  /**
   * The value MUST be the URL of the issuer's credential status method.
   */
  id: string;
  /**
   * The name of the credential status method.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * The information in RefreshService is used to refresh the verifiable credential.
 */
export interface RefreshService {
  /**
   * The value MUST be the URL of the issuer's refresh service.
   */
  id: string;
  /**
   * The name of the refresh service method.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * Terms of use can be utilized by an issuer or a holder to communicate the terms under which a verifiable credential or verifiable presentation was issued
 */
export interface TermsOfUse {
  /**
   * The value MUST be a URI identifying the term of use.
   */
  id?: string;
  /**
   * The value MUST identify the type of the terms of use.
   */
  type: string;
  [k: string]: unknown;
}
/**
 * An address for the described entity.
 */
export interface Address {
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * A country.
   */
  addressCountry?: string;
  /**
   * A country code. The value must be a ISO 3166-1 alpha-2 country code [[ISO3166-1]].
   */
  addressCountryCode?: string;
  /**
   * A region within the country.
   */
  addressRegion?: string;
  /**
   * A locality within the region.
   */
  addressLocality?: string;
  /**
   * A street address within the locality.
   */
  streetAddress?: string;
  /**
   * A post office box number for PO box addresses.
   */
  postOfficeBoxNumber?: string;
  /**
   * A postal code.
   */
  postalCode?: string;
  geo?: GeoCoordinates;
  [k: string]: unknown;
}
/**
 * The geographic coordinates of a location.
 */
export interface GeoCoordinates {
  /**
   * The value of the type property MUST be an unordered set. One of the items MUST be the IRI 'GeoCoordinates'.
   */
  type: 'GeoCoordinates';
  /**
   * The latitude of the location [[WGS84]].
   */
  latitude: number;
  /**
   * The longitude of the location [[WGS84]].
   */
  longitude: number;
  [k: string]: unknown;
}
/**
 * No description supplied.
 */
export interface IdentifierEntry {
  /**
   * The value of the type property MUST be an unordered set. One of the items MUST be the IRI 'IdentifierEntry'.
   */
  type: 'IdentifierEntry';
  /**
   * An identifier.
   */
  identifier: string;
  /**
   * The identifier type.
   */
  identifierType:
    | (
        | 'name'
        | 'sourcedId'
        | 'systemId'
        | 'productId'
        | 'userName'
        | 'accountId'
        | 'emailAddress'
        | 'nationalIdentityNumber'
        | 'isbn'
        | 'issn'
        | 'lisSourcedId'
        | 'oneRosterSourcedId'
        | 'sisSourcedId'
        | 'ltiContextId'
        | 'ltiDeploymentId'
        | 'ltiToolId'
        | 'ltiPlatformId'
        | 'ltiUserId'
        | 'identifier'
      )
    | string;
}
/**
 * Descriptive metadata about the achievements necessary to be recognized with an assertion of a particular achievement. This data is added to the Achievement class so that it may be rendered when the achievement assertion is displayed, instead of simply a link to human-readable criteria external to the achievement. Embedding criteria allows either enhancement of an external criteria page or increased portability and ease of use by allowing issuers to skip hosting the formerly-required external criteria page altogether. Criteria is used to allow would-be recipients to learn what is required of them to be recognized with an assertion of a particular achievement. It is also used after the assertion is awarded to a recipient to let those inspecting earned achievements know the general requirements that the recipients met in order to earn it.
 */
export interface Criteria {
  /**
   * The URI of a webpage that describes in a human-readable format the criteria for the achievement.
   */
  id?: string;
  /**
   * A narrative of what is needed to earn the achievement. Markdown is allowed.
   */
  narrative?: string;
  [k: string]: unknown;
}
/**
 * Identifies a related achievement.
 */
export interface Related {
  /**
   * The related achievement.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * The language of the related achievement.
   */
  inLanguage?: string;
  /**
   * The version of the related achievement.
   */
  version?: string;
  [k: string]: unknown;
}
/**
 * Describes a possible achievement result.
 */
export interface ResultDescription {
  /**
   * The unique URI for this result description. Required so a result can link to this result description.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  alignment?: Alignment[];
  allowedValue?: string[];
  /**
   * The name of the result.
   */
  name: string;
  /**
   * The `id` of the rubric criterion level required to pass as determined by the achievement creator.
   */
  requiredLevel?: string;
  /**
   * A value from `allowedValue` or within the range of `valueMin` to `valueMax` required to pass as determined by the achievement creator.
   */
  requiredValue?: string;
  /**
   * The type of result this description represents. This is an extensible enumerated vocabulary.
   */
  resultType:
    | (
        | 'GradePointAverage'
        | 'LetterGrade'
        | 'Percent'
        | 'PerformanceLevel'
        | 'PredictedScore'
        | 'RawScore'
        | 'Result'
        | 'RubricCriterion'
        | 'RubricCriterionLevel'
        | 'RubricScore'
        | 'ScaledScore'
        | 'Status'
      )
    | string;
  rubricCriterionLevel?: RubricCriterionLevel[];
  /**
   * The maximum possible `value` that may be asserted in a linked result.
   */
  valueMax?: string;
  /**
   * The minimum possible `value` that may be asserted in a linked result.
   */
  valueMin?: string;
  [k: string]: unknown;
}
/**
 * Describes a rubric criterion level.
 */
export interface RubricCriterionLevel {
  /**
   * The unique URI for this rubric criterion level. Required so a result can link to this rubric criterion level.
   */
  id: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  alignment?: Alignment[];
  /**
   * Description of the rubric criterion level.
   */
  description?: string;
  /**
   * The rubric performance level in terms of success.
   */
  level?: string;
  /**
   * The name of the rubric criterion level.
   */
  name: string;
  /**
   * The points associated with this rubric criterion level.
   */
  points?: string;
  [k: string]: unknown;
}
/**
 * A collection of information about the recipient of an achievement.
 */
export interface IdentityObject {
  /**
   * MUST be the IRI 'IdentityObject'.
   */
  type: 'IdentityObject';
  /**
   * Whether or not the `identityHash` value is hashed.
   */
  hashed: boolean;
  /**
   * Either the IdentityHash of the identity or the plaintext value. If it's possible that the plaintext transmission and storage of the identity value would leak personally identifiable information where there is an expectation of privacy, it is strongly recommended that an IdentityHash be used.
   */
  identityHash: string;
  /**
   * The identity type.
   */
  identityType:
    | (
        | 'name'
        | 'sourcedId'
        | 'systemId'
        | 'productId'
        | 'userName'
        | 'accountId'
        | 'emailAddress'
        | 'nationalIdentityNumber'
        | 'isbn'
        | 'issn'
        | 'lisSourcedId'
        | 'oneRosterSourcedId'
        | 'sisSourcedId'
        | 'ltiContextId'
        | 'ltiDeploymentId'
        | 'ltiToolId'
        | 'ltiPlatformId'
        | 'ltiUserId'
        | 'identifier'
      )
    | string;
  /**
   * If the `identityHash` is hashed, this should contain the string used to salt the hash. If this value is not provided, it should be assumed that the hash was not salted.
   */
  salt?: string;
}
/**
 * Describes a result that was achieved.
 */
export interface Result {
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * If the result represents an achieved rubric criterion level (e.g. Mastered), the value is the `id` of the RubricCriterionLevel in linked ResultDescription.
   */
  achievedLevel?: string;
  alignment?: Alignment[];
  /**
   * An achievement can have many result descriptions describing possible results. The value of `resultDescription` is the `id` of the result description linked to this result. The linked result description must be in the achievement that is being asserted.
   */
  resultDescription?: string;
  /**
   * The status of the achievement. Required if `resultType` of the linked ResultDescription is Status.
   */
  status?: 'Completed' | 'Enrolled' | 'Failed' | 'InProgress' | 'OnHold' | 'Provisional' | 'Withdrew';
  /**
   * A string representing the result of the performance, or demonstration, of the achievement. For example, 'A' if the recipient received an A grade in class.
   */
  value?: string;
  [k: string]: unknown;
}
/**
 * Descriptive metadata about evidence related to the achievement assertion. Each instance of the evidence class present in an assertion corresponds to one entity, though a single entry can describe a set of items collectively. There may be multiple evidence entries referenced from an assertion. The narrative property is also in scope of the assertion class to provide an overall description of the achievement related to the assertion in rich text. It is used here to provide a narrative of achievement of the specific entity described. If both the description and narrative properties are present, displayers can assume the narrative value goes into more detail and is not simply a recapitulation of description.
 */
export interface Evidence {
  /**
   * The URL of a webpage presenting evidence of achievement or the evidence encoded as a Data URI. The schema of the webpage is undefined.
   */
  id?: string;
  /**
   * @minItems 1
   */
  type: [string, ...string[]];
  /**
   * A narrative that describes the evidence and process of achievement that led to an assertion.
   */
  narrative?: string;
  /**
   * A descriptive title of the evidence.
   */
  name?: string;
  /**
   * A longer description of the evidence.
   */
  description?: string;
  /**
   * A string that describes the type of evidence. For example, Poetry, Prose, Film.
   */
  genre?: string;
  /**
   * A description of the intended audience for a piece of evidence.
   */
  audience?: string;
  [k: string]: unknown;
}
