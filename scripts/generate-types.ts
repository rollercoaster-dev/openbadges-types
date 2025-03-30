import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Needed for ES Module path handling
import { compileFromFile } from 'json-schema-to-typescript';

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMAS_DIR_V3 = path.join(__dirname, '../schemas/v3');
const OUTPUT_DIR_V3 = path.join(__dirname, '../src/v3');

async function generateTypes(schemaDir: string, outputDir: string) {
  console.log(`Scanning schemas in ${schemaDir}...`);
  const schemaFiles = fs.readdirSync(schemaDir).filter(file => file.endsWith('_schema.json'));

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating types into ${outputDir}...`);
  const generatedFiles: string[] = [];

  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(schemaDir, schemaFile);
    // Extract a base name for the type from the schema filename
    // e.g., ob_v3p0_achievementcredential_schema.json -> AchievementCredential
    const baseNameMatch = schemaFile.match(/ob_v3p0_([a-z0-9_]+)_schema\.json$/i);
    const typeName = baseNameMatch ? baseNameMatch[1].split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') : path.basename(schemaFile, '_schema.json');

    const outputFileName = `${typeName}.ts`;
    const outputFilePath = path.join(outputDir, outputFileName);

    console.log(`  Generating ${typeName} from ${schemaFile}...`);

    try {
      // Actual generation using json-schema-to-ts programmatic API
      const tsContent = await compileFromFile(schemaPath, {
        bannerComment: '', // Don't add the default banner comment
        cwd: path.dirname(schemaPath), // Set CWD for potential $ref resolution
      });

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
      return `export * from './${moduleName}';`;
    }).join('\n') + '\n';
    const indexFilePath = path.join(outputDir, 'index.ts');
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`  -> Wrote index file: ${indexFilePath}`);
  }

  console.log('Type generation complete.');
}

// --- Main Execution Wrapper ---
async function main() {
  try {
    await generateTypes(SCHEMAS_DIR_V3, OUTPUT_DIR_V3);
    // We can add calls for v2 later
    // const SCHEMAS_DIR_V2 = path.join(__dirname, '../schemas/v2');
    // const OUTPUT_DIR_V2 = path.join(__dirname, '../src/v2');
    // await generateTypes(SCHEMAS_DIR_V2, OUTPUT_DIR_V2);
  } catch (error) {
    console.error('Failed to generate types:', error);
    process.exit(1);
  }
}

main(); 