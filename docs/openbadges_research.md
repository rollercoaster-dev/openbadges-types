# Open Badges Specification Research Summary

This document summarizes key findings from researching the Open Badges 2.0 and 3.0 specifications to inform the creation of a TypeScript types library.

## Core Concepts

Open Badges represent verifiable achievements. They are typically structured data files (JSON-LD) associated with a visual image. Key versions are 2.0 and 3.0.

## Open Badges 2.0

*   **Specification:** Governed by 1EdTech (formerly IMS Global). [Link to v2.0 Spec Index (example)](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html)
*   **Data Format:** JSON-LD
*   **Key Data Structures:**
    *   `Assertion`: Represents an awarded badge instance. Links a `recipient` to a `BadgeClass`. Contains `issuedOn`, `verification`, `evidence`, etc.
    *   `BadgeClass`: Defines the badge itself - `name`, `description`, `image`, `criteria`, `issuer`.
    *   `Profile`: Represents the issuer of the badge (`issuer` property in `BadgeClass`). Contains `name`, `url`, `email`, etc.
    *   `IdentityObject`: Represents the recipient, often using `email` or `url` with hashing.
    *   `VerificationObject`: Specifies how to verify an assertion (e.g., `hosted`).
    *   `Criteria`: Describes how the badge was earned (`narrative`, `url`).
    *   `Evidence`: Links to evidence supporting the achievement (`url`, `narrative`).
    *   `AlignmentObject`: Aligns the badge to external frameworks (e.g., educational standards).
*   **Features:**
    *   "Baking": Embedding assertion data into PNG or SVG image files.
    *   Extensibility: Allows adding custom properties via JSON-LD contexts.

## Open Badges 2.1

*   **Focus:** Defines the "Badge Connect API" for transferring/exchanging badges between systems (issuers, backpacks, consumers).
*   **Relationship to 2.0:** Builds upon the 2.0 data structures. Less relevant for defining the *core types* but important for understanding the ecosystem.

## Open Badges 3.0

*   **Specification:** Latest major version, also by 1EdTech. [Link to 1EdTech Open Badges Standard Page](https://www.1edtech.org/standards/open-badges)
*   **Key Changes & Features:**
    *   **Verifiable Credentials (VC) Integration:** Aligns with the W3C Verifiable Credentials Data Model 2.0. Badges are a type of VC.
    *   **Core Object:** Often referred to as `OpenBadgeCredential`.
    *   **Refined Structures:** Builds upon and refines the concepts from 2.0.
        *   `Achievement`: A more formalized structure replacing/enhancing `BadgeClass` in some contexts within the VC model.
        *   `Issuer`: Similar role to `Profile` in 2.0, aligned with VC issuer concepts.
        *   `EndorsementCredential`: Allows third parties to endorse badges or issuers.
    *   **Integrated API:** The API specification (similar to 2.1) is part of the main 3.0 spec.
    *   **CLR Compatibility:** Designed to work alongside the Comprehensive Learner Record (CLR) standard.
*   **Data Format:** Still JSON-LD, leveraging VC contexts.

## Implications for Types Library

1.  **Versioning:** Need clear separation or compatibility layers for 2.0 and 3.0 types. Some structures might be reusable, others will differ.
2.  **JSON-LD Context:** The `@context` property is crucial. Types should reflect this.
3.  **VC Alignment (v3.0):** Version 3.0 types will need to incorporate structures from the VC Data Model.
4.  **Extensibility:** Types should allow for arbitrary additional properties, possibly using index signatures (`[key: string]: any`) or generics, reflecting JSON-LD's extensibility.
5.  **Identity Types:** Need robust types for representing identity (hashed emails, URLs, DIDs in v3.0).
6.  **Verification Types:** Cover different verification methods (`hosted`, `signed`).
7.  **Embedded vs. Linked:** Types need to handle cases where related objects (like `BadgeClass` or `Issuer`) are embedded directly versus linked via URL/ID. Using union types or optional properties might work. 