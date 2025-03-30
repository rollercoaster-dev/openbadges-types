# Direct URLs to JSON Schemas for Open Badges 2.0 and 3.0

## 1. Introduction

Open Badges have emerged as a significant standard for the digital recognition of learning and skills, offering a method for packaging information about achievements into portable and verifiable digital credentials. These badges serve as visual representations of accomplishments and contain rich metadata detailing the criteria, the issuer, and the earner, thereby enhancing the transparency and portability of educational and professional achievements. The standard aims to create an interoperable ecosystem where achievements can be recognized and valued across various platforms and contexts.

A fundamental component in ensuring the integrity and interoperability of Open Badges is the use of JSON schemas. These schemas act as formal specifications, defining the expected structure, data types, and constraints for the data encoded within Open Badges. By adhering to these schemas, systems implementing Open Badges can guarantee that the data is syntactically correct and semantically consistent, which is essential for the reliable verification and exchange of credentials.

This report aims to provide a comprehensive compilation of direct URLs to the JSON schemas for both Open Badges 2.0 and 3.0, sourced directly from official specifications and related repositories. Access to these URLs is crucial for developers and implementers who need to validate Open Badges data programmatically and ensure compliance with the standard.

## 2. Open Badges 3.0 JSON Schemas

### 2.1 JSON Schema URLs for Credential and API Schema Verification

The official Open Badges 3.0 specification page, located at https://www.imsglobal.org/spec/ob/v3p0, includes a dedicated section titled "JSON Schema files for credential and API schema verification". This section directly provides a list of URLs pointing to the JSON schemas for several key components of the Open Badges 3.0 standard. These schemas are critical for ensuring the correct structure of credential data and API interactions. The direct URLs for the requested schemas are as follows:

- AchievementCredential JSON schema: https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_achievementcredential_schema.json
- EndorsementCredential JSON schema: https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_endorsementcredential_schema.json
- GetOpenBadgeCredentialsResponse JSON schema: https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_getopenbadgecredentialsresponse_schema.json
- Profile JSON schema: https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_profile_schema.json
- Imsx_StatusInfo JSON schema: https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_imsx_statusinfo_schema.json

The availability of these specific schema URLs directly on the specification page underscores the significance of these data structures within the Open Badges 3.0 framework. This direct access facilitates the integration of validation processes into applications that interact with Open Badges. The AchievementCredential and EndorsementCredential schemas are fundamental to the core functionality of recognizing and validating achievements and endorsements. The GetOpenBadgeCredentialsResponse schema is vital for platforms implementing the Open Badges API, ensuring proper formatting of responses to credential requests. The Profile schema defines the structure for representing issuers and other entities, while the Imsx_StatusInfo schema likely standardizes error reporting and status updates within API communications.

### 2.2 Comprehensive JSON Schema Definitions

The Open Badges 3.0 specification also includes a dedicated appendix, Appendix E.2 JSON Schema, which offers a comprehensive collection of JSON schema definitions for a wide array of data models used in the specification. A direct link to this appendix, (https://www.imsglobal.org/spec/ob/v3p0#json-schema), can be found on the specification page. 

Within this appendix, Section E.2.1 Open Badges JSON Schema provides an extensive breakdown of schemas covering nearly all data models defined in the specification. This includes not only schemas for core credential types like Achievement, Profile, and VerifiableCredential, but also for related entities such as Evidence, Criteria, and Alignment, as well as API-specific models like GetOpenBadgeCredentialsResponse and supporting components like Proof, Context, and Imsx_StatusInfo.

The sheer scope of schemas provided in this section emphasizes the commitment to a well-defined and rigorously structured data model for Open Badges 3.0. This centralized resource allows developers to validate virtually every aspect of Open Badges 3.0 data, ensuring consistency and interoperability across implementations.

## 3. Open Badges 2.0 JSON Schemas

### 3.1 Direct Links from Official Specification

The official Open Badges 2.0 specification is accessible at (https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html). A search for the term "JSON Schema" within this document indicates that JSON Schema is primarily discussed in the context of extending the Open Badges 2.0 specification. While the specification mentions that extension authors have the option to define JSON schemas for their extensions, with links provided from the context files, it does not offer a consolidated list or direct links to the schema files for specific extensions within the core document itself.

The only direct link to a core JSON schema identified within the main Open Badges 2.0 specification is for the Assertion object, which is located within the "Extension Validation" subsection. The URL for this schema is https://openbadgespec.org/v1/schema/assertion.json.

The relatively limited direct linking of JSON schemas within the Open Badges 2.0 specification, especially when compared to the comprehensive approach in version 3.0, suggests a potentially different strategy towards data validation. It might indicate a greater emphasis on the JSON-LD context for semantic understanding in version 2.0, with JSON Schema being primarily intended for validating the syntax of extensions rather than the core specification itself. The single direct link to the Assertion schema could represent an initial step towards schema-based validation for core objects.

### 3.2 GitHub Repository Exploration

The Open Badges specification GitHub repository, found at (https://github.com/1EdTech/openbadges-specification), serves as the central repository for the standard's source files and documentation. Exploring this repository, particularly the branches associated with version 2.0 (likely named main and develop), could potentially reveal additional JSON schema files that are not explicitly linked from the main specification document.

Specification documents within the repository, often in Markdown format, might contain embedded or linked JSON schema files relevant to version 2.0. Furthermore, performing a direct search within the repository for files ending with the .json extension and filtering the results by the relevant branches or directories for version 2.0 could uncover further schema definitions. The GitHub repository, as the definitive source for all specification-related files, might contain schema files used during the development or validation of Open Badges 2.0, even if these are not prominently featured in the official specification documents.

## 4. Blockcerts Proposed Extensions for Open Badges V2 JSON Schemas

The Blockcerts project has proposed several extensions to the Open Badges V2 specification with the aim of enhancing its capabilities, particularly in the area of blockchain-based verification. The documentation for these proposed extensions, located at (https://github.com/IMSGlobal/cert-schema/blob/master/docs/open_badge_v2_extensions.md), includes a dedicated section titled "Json schemas". This section provides direct links to the JSON schemas for the Blockcerts extensions, which are not part of the core Open Badges 2.0 specification but are relevant for implementers interested in incorporating the advanced features proposed by Blockcerts, especially those pertaining to blockchain integration. The URLs for these schemas are as follows:

- Merkle Proof Signature Schema: (https://github.com/blockchain-certificates/cert-schema/blob/master/docs/merkleProofSignatureExtension_schema.md)
- Recipient Profile Schema: https://github.com/blockchain-certificates/cert-schema/blob/master/docs/recipientProfileExtension_schema.md
- Signature Line Schema: https://github.com/blockchain-certificates/cert-schema/blob/master/docs/signatureLineExtension_schema.md

These schemas define the specific data structures required to implement the functionalities introduced by the Blockcerts extensions. For instance, the Merkle Proof Signature Schema specifies the format for including cryptographic proofs related to blockchain transactions within an Open Badge, while the Recipient Profile Schema extends the standard recipient profile to include information like public keys, which are crucial for blockchain-based verification.

## 5. Conclusion

Open Badges 3.0 offers a comprehensive and well-documented set of JSON schemas, with direct URLs readily available for key credential types and API interactions on the official specification page. Furthermore, a dedicated appendix consolidates schema definitions for virtually all data models defined within the specification.

In contrast, Open Badges 2.0 features a more limited set of directly linked JSON schemas within its core specification, with the primary link being for the Assertion object. However, additional schema files for version 2.0 might be found by exploring the Open Badges specification GitHub repository.

The Blockcerts project provides valuable JSON schemas for its proposed extensions to Open Badges V2, including schemas for Merkle Proof Signatures, Recipient Profiles, and Signature Lines.

For developers and implementers working with Open Badges, these JSON schema URLs serve as essential resources for validating badge data and ensuring adherence to the respective specifications. It is always advisable to consult the official documentation and the GitHub repositories for the most current and complete information regarding JSON schemas and other implementation details.

## Tables of Schema URLs

### Table 1: Open Badges 3.0 JSON Schema URLs (from specification page)

| Schema Name | URL |
|-------------|-----|
| AchievementCredential | https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_achievementcredential_schema.json |
| EndorsementCredential | https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_endorsementcredential_schema.json |
| GetOpenBadgeCredentialsResponse | https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_getopenbadgecredentialsresponse_schema.json |
| Profile | https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_profile_schema.json |
| Imsx_StatusInfo | https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_imsx_statusinfo_schema.json |

### Table 2: Open Badges 2.0 JSON Schema URLs

| Schema Name | URL | Source |
|-------------|-----|--------|
| Assertion | https://openbadgespec.org/v1/schema/assertion.json | Open Badges 2.0 Specification |
| Merkle Proof Signature Schema | https://github.com/blockchain-certificates/cert-schema/blob/master/docs/merkleProofSignatureExtension_schema.md | Blockcerts Proposed Extensions to Open Badges V2 |
| Recipient Profile Schema | https://github.com/blockchain-certificates/cert-schema/blob/master/docs/recipientProfileExtension_schema.md | Blockcerts Proposed Extensions to Open Badges V2 |
| Signature Line Schema | https://github.com/blockchain-certificates/cert-schema/blob/master/docs/signatureLineExtension_schema.md | Blockcerts Proposed Extensions to Open Badges V2 |