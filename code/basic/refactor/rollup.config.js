import { nodeResolve } from '@rollup/plugin-node-resolve'

import ts from 'rollup-plugin-typescript2'

import serve from 'rollup-plugin-serve'

import path from 'path'

export default {
  input: 'src/index.ts',
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'iife', // global - 全局变量 || cjs - module.exports|| iife- ()() || esm - export default
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      port: 3000,
      contentBase: '',
      open: true,
      openPage: './public/index.html'
    })
  ]
}
