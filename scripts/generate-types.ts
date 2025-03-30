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
  const generatedFiles: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(schemaDir, schemaFile);
    const typeName = generateTypeName(schemaFile, specVersion);
    const outputFileName = `${typeName}.ts`;
    const outputFilePath = path.join(outputDir, outputFileName);

    console.log(`  Generating ${typeName} from ${schemaFile}...`);

    try {
      let tsContent = await compileFromFile(schemaPath, {
        bannerComment: '', // Don't add the default banner comment
        cwd: schemaDir, // Important for resolving $refs within the schema directory
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

      // --- Write File ---
      fs.writeFileSync(outputFilePath, tsContent);
      console.log(`    -> Wrote ${outputFilePath}`);
      generatedFiles.push(outputFileName);
    } catch (error) {
      console.error(`Error generating type for ${schemaFile}:`, error);
    }
  }

  // Create an index.ts file in the output directory
  if (generatedFiles.length > 0) {
    const indexContent = generatedFiles.map(fileName => {
      const moduleName = path.basename(fileName, '.ts');
      // Use .js extension for ESM module compatibility when importing
      return `export * from './${moduleName}.js';`;
    }).join('\n') + '\n';
    const indexFilePath = path.join(outputDir, 'index.ts');
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`  -> Wrote ${specVersion.toUpperCase()} index file: ${indexFilePath}`);
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