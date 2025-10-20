import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    {
      name: 'copy-articles',
      buildStart() {
        const srcDir = path.resolve(__dirname, 'src/content/articles');
        const destDir = path.resolve(__dirname, 'public/learn');

        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

        for (const file of files) {
          fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
          console.log(`📄 Copied ${file} → /public/learn`);
        }
      },
    },
  ],
});
