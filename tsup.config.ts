import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  sourcemap: true,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
      dts: format === 'cjs' ? '.d.cts' : '.d.ts',
    };
  },
});
