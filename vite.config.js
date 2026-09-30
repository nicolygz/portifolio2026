import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const site = JSON.parse(readFileSync('./src/data/site.json', 'utf-8'));

export default defineConfig({
  base: './', // funciona em GitHub Pages (user ou project page)
  plugins: [
    handlebars({
      partialDirectory: resolve(import.meta.dirname, 'src/components'),
      context: { site },
    }),
  ],
});
