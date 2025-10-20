import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = path.resolve(__dirname);
const notebooksDir = path.join(rootDir, 'src/content/notebooks');
const articlesDir = path.join(rootDir, 'src/content/articles');
const publicLearnDir = path.join(rootDir, 'public/portfolio/learn');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 🧹 Clear public/portfolio/learn and copy .html files from src/content/articles
function copyArticlesToPublicLearn() {
  ensureDir(articlesDir);
  ensureDir(publicLearnDir);

  // clean old htmls
  const old = fs.readdirSync(publicLearnDir).filter(f => f.endsWith('.html'));
  for (const f of old) fs.unlinkSync(path.join(publicLearnDir, f));
  console.log(`🧹 Cleared ${old.length} old HTMLs from ${publicLearnDir}`);

  // copy fresh ones
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));
  for (const file of files) {
    fs.copyFileSync(path.join(articlesDir, file), path.join(publicLearnDir, file));
  }
  console.log(`📄 Copied ${files.length} HTML articles → ${publicLearnDir}`);
}

// 🧠 Convert notebooks to HTML into src/content/articles
function convertNotebooks() {
  if (!fs.existsSync(notebooksDir)) {
    console.log('⚠️ No notebooks found, skipping conversion.');
    return;
  }
  console.log('📘 Converting notebooks → src/content/articles...');
  try {
    execSync('node scripts/convert_notebooks.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Notebook conversion failed:', err);
  }
}

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),

    // 🏗️ Build: convert notebooks + copy to public/portfolio/learn
    {
      name: 'convert-and-copy-on-build',
      apply: 'build',
      buildStart() {
        convertNotebooks();
        copyArticlesToPublicLearn();
      },
    },

    // 👀 Preview: sync public/portfolio/learn from articles
    {
      name: 'sync-articles-on-preview',
      configurePreviewServer() {
        copyArticlesToPublicLearn();
      },
    },
  ],

  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['.', articlesDir],
    },
  },
});
