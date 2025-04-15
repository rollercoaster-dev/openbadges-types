# feat(protocol): OB3 image object compliance and type safety

## Summary
- Adds `OB3ImageObject` type for strict Open Badges 3.0 protocol compliance.
- Updates `image` fields in OB3 `Issuer`, `Profile`, and `Achievement` types to accept `IRI | OB3ImageObject`.
- Makes `id`, `type`, `name`, and `url` required in OB3 `Issuer` and `Achievement`.
- Updates documentation (protocol-compliance, migration guide) to reflect new types and usage.
- Adds a PR checklist template for future contributions.

## Why?
- Ensures full compliance with the Open Badges 3.0 specification for image fields.
- Improves type safety and clarity for downstream consumers.
- Provides clear migration and usage guidance for maintainers and users.

## Migration Notes
- If you use OB3 `Issuer`, `Profile`, or `Achievement`, update your `image` fields to use either a string IRI/URL or an object with `{ id, type: "Image" }`.
- See updated documentation and migration guide for examples.

## Checklist
- [x] All type and protocol changes are documented
- [x] Tests and linters pass (`pnpm validate`)
- [x] Changelog and docs updated

---