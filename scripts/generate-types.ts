import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Needed for ES Module path handling
import { compileFromFile } from 'json-schema-to-typescript';

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const SCHEMAS_DIR_V3 = path.join(__dirname, '../schemas/v3');
const OUTPUT_DIR_V3 = path.join(__dirname, '../src/v3');
const SPEC_URL_V3 = 'https://www.imsglobal.org/spec/ob/v3p0/';

const SCHEMAS_DIR_V2 = path.join(__dirname, '../schemas/v2');
const OUTPUT_DIR_V2 = path.join(__dirname, '../src/v2');
const SPEC_URL_V2 = 'https://www.imsglobal.org/sites/default/files/Badges/OBv2p0Final/index.html'; // Less ideal anchors for v2

// --- Helper Functions ---

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTypeName(schemaFile: string, specVersion: 'v2' | 'v3'): string {
  if (specVersion === 'v3') {
    const match = schemaFile.match(/ob_v3p0_([a-z0-9_]+)_schema\.json$/i);
    return match ? match[1].split('_').map(capitalize).join('') : capitalize(path.basename(schemaFile, '_schema.json'));
  } else if (specVersion === 'v2') {
    // Simple case for v2 assertion
    if (schemaFile === 'assertion.json') {
      return 'Assertion';
    }
    // Add logic here if more v2 schemas are included later
    return capitalize(path.basename(schemaFile, '.json'));
  }
  return 'UnknownType';
}

function createSpecLink(baseUrl: string, typeName: string, specVersion: 'v2' | 'v3'): string {
  if (specVersion === 'v3') {
    return `${baseUrl}#${typeName.toLowerCase()}`;
  } else if (specVersion === 'v2') {
    // V2 spec doesn't have clean anchors for every type like v3
    if (typeName === 'Assertion') {
      return `${baseUrl}#assertion`; // Assuming this anchor exists
    }
    return baseUrl; // Fallback to base URL
  }
  return baseUrl;
}

// --- Core Generation Logic ---

async function generateTypes(schemaDir: string, outputDir: string, specVersion: 'v2' | 'v3', specBaseUrl: string) {
  console.log(`[${specVersion.toUpperCase()}] Scanning schemas in ${schemaDir}...`);
  const schemaFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('.json'));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`[${specVersion.toUpperCase()}] Generating types into ${outputDir}...`);
  // Store both filename and calculated typeName
  const generatedFiles: { fileName: string; typeName: string }[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(schemaDir, schemaFile);
    const typeName = generateTypeName(schemaFile, specVersion);
    const outputFileName = `${typeName}.ts`;
    const outputFilePath = path.join(outputDir, outputFileName);

    // Wrap individual file processing in try-catch
    try {
      console.log(`  Generating ${typeName} from ${schemaFile}...`);

      let tsContent = await compileFromFile(schemaPath, {
        bannerComment: '', // Don't add the default banner comment
        // cwd: schemaDir, // Setting CWD doesn't seem to reliably fix $ref issue
        declareExternallyReferenced: true, // Attempt to declare types for external $refs
        style: { singleQuote: true }, // Match prettier config
      });

      // --- Refinements ---
      // 1. Rename main interface (heuristic: first exported interface)
      let mainInterfaceFound = false;
      tsContent = tsContent.replace(/^(export interface\s+)(\S+)(\s*\{)/m, (match, prefix, originalName, suffix) => {
        if (!mainInterfaceFound) {
            console.log(`    Renaming main interface ${originalName} to ${typeName}`);
            mainInterfaceFound = true;
            return `${prefix}${typeName}${suffix}`;
        }
        return match; // Don't rename subsequent interfaces
      });

      // 2. Add TSDoc
      const specLink = createSpecLink(specBaseUrl, typeName, specVersion);
      const moduleDoc = `/**
 * @module
 * @description Defines the TypeScript interface for the Open Badges ${specVersion.toUpperCase()} ${typeName}
 * @see ${specLink}
 */\n\n`;
      // Add basic doc to the (now renamed) main interface
       tsContent = tsContent.replace(/^(export interface\s+)(\S+)(\s*\{)/m, (match, prefix, name, suffix) => {
         // Add docs only if we actually renamed it (or it's the first interface)
         if (name === typeName) {
           const interfaceDoc = `/**
 * Represents the ${typeName} structure in Open Badges ${specVersion.toUpperCase()}.
 * @see ${specLink}
 */\n`;
           return `${interfaceDoc}${match}`;
         }
         return match;
       });

       // Prepend module doc
       tsContent = moduleDoc + tsContent;

      // --- Post-processing for specific files ---
      if (specVersion === 'v3' && typeName === 'Profile') {
        console.log(`    Applying post-processing to remove duplicate Profile interface...`);
        let firstInterfaceEnd = tsContent.indexOf('} // End of first interface marker (heuristic)');
        if (firstInterfaceEnd === -1) {
            // Add a marker if not present (heuristic based on typical interface structure)
            tsContent = tsContent.replace(/^(export interface Profile \{[\s\S]*?)(\n\}\n)/m, '$1$2 // End of first interface marker (heuristic)');
            firstInterfaceEnd = tsContent.indexOf('} // End of first interface marker (heuristic)');
        }

        if (firstInterfaceEnd !== -1) {
            const secondInterfaceStart = tsContent.indexOf('export interface Profile {', firstInterfaceEnd);
            if (secondInterfaceStart !== -1) {
                // Find the matching closing brace for the second interface
                let braceLevel = 0;
                let secondInterfaceEnd = -1;
                for (let i = secondInterfaceStart; i < tsContent.length; i++) {
                    if (tsContent[i] === '{') braceLevel++;
                    else if (tsContent[i] === '}') braceLevel--;
                    if (braceLevel === 0 && tsContent[i] === '}') {
                        secondInterfaceEnd = i + 1;
                        break;
                    }
                }

                if (secondInterfaceEnd !== -1) {
                    tsContent = tsContent.substring(0, secondInterfaceStart) + tsContent.substring(secondInterfaceEnd);
                    console.log(`    -> Removed duplicate Profile interface.`);
                } else {
                     console.warn(`    -> Could not find matching end brace for duplicate Profile interface.`);
                }
            } else {
                console.log(`    -> No duplicate Profile interface found (expected one).`);
            }
        } else {
             console.warn(`    -> Could not find end of first Profile interface for duplicate removal.`);
        }
      }

      // --- Write File ---
      fs.writeFileSync(outputFilePath, tsContent);
      console.log(`    -> Wrote ${outputFilePath}`);
      // Add to list only if successful
      generatedFiles.push({ fileName: outputFileName, typeName: typeName });
    } catch (error) {
      // Log error but continue with the next file
      console.error(`\n---> ERROR generating type for ${schemaFile}: Skipping this file.`);
      console.error(error);
      console.error('---> Resuming generation...');
    }
  }

  // Create an index.ts file in the output directory (based on successfully generated files)
  if (generatedFiles.length > 0) {
    // Explicitly export only the main type from each file
    const indexContent = generatedFiles.map(generated => {
      const moduleName = path.basename(generated.fileName, '.ts');
      // Use the stored typeName for the export
      return `export type { ${generated.typeName} } from './${moduleName}.js';`;
    }).join('\n') + '\n';

    // TODO: Ideally, identify common types and export them explicitly too
    // Example: export type { Image, Address, Profile } from './CommonV3.js';

    const indexFilePath = path.join(outputDir, 'index.ts');
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`  -> Wrote ${specVersion.toUpperCase()} index file (explicit exports): ${indexFilePath}`);
  }

  console.log(`[${specVersion.toUpperCase()}] Type generation complete.`);
}

// --- Main Execution ---
async function main() {
  try {
    // Generate V3 Types
    await generateTypes(SCHEMAS_DIR_V3, OUTPUT_DIR_V3, 'v3', SPEC_URL_V3);

    // Generate V2 Types
    await generateTypes(SCHEMAS_DIR_V2, OUTPUT_DIR_V2, 'v2', SPEC_URL_V2);

    // Generate Top-Level Index
    console.log('[GLOBAL] Generating top-level index file...');
    const topLevelIndexContent = `/**
 * @module openbadges-types
 * @description Provides TypeScript types for Open Badges specifications v2.0 and v3.0.
 * Includes types generated from the official JSON schemas.
 */

export * as v2 from './v2/index.js';
export * as v3 from './v3/index.js';
`;
    const topLevelIndexPath = path.join(__dirname, '../src/index.ts');
    fs.writeFileSync(topLevelIndexPath, topLevelIndexContent);
    console.log(`  -> Wrote ${topLevelIndexPath}`);

    console.log('[GLOBAL] All type generation complete.');

  } catch (error) {
    console.error('Failed to generate types:', error);
    process.exit(1);
  }
}

main(); 