import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [
            {
                format: 'cjs',
                file: './dist/cjs/index.js',
                sourcemap: true,
            },
            {
                format: 'esm',
                file: './dist/esm/index.js',
                sourcemap: true,
            },
            {
                format: 'umd',
                name: 'toast',
                file: './dist/umd/index.js',
                sourcemap: true,
            },
        ],
        plugins: [typescript({ tsconfig: './tsconfig.json' }), postcss({ use: { sass: { silenceDeprecations: ['legacy-js-api'] } }, minimize: true }), terser()],
    },
    {
        input: 'src/index.ts',
        output: [{ file: './dist/index.d.ts', format: 'esm' }],
        external: [/\.scss$/],
        plugins: [dts()],
    },
]);
