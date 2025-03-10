import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            file: './dist/esm/index.js',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [typescript({ tsconfig: './tsconfig.json' }), postcss()],
    },
    {
        input: 'src/index.ts',
        output: {
            format: 'umd',
            name: 'toast',
            file: './dist/umd/index.js',
            sourcemap: true,
        },
        plugins: [typescript({ tsconfig: false, noCheck: true }), postcss()],
    },
]);
