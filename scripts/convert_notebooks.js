/**
 * scripts/convert_notebooks.js
 * Converts Jupyter notebooks → HTML with metadata extraction + reading time estimation.
 * Keeps original notebooks unchanged.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const notebooksDir = path.join(root, "src/content/notebooks");
const articlesDir = path.join(root, "src/content/articles");
const publicLearnDir = path.join(root, "public/portfolio/learn");
const tempDir = path.join(articlesDir, "_temp_nbconvert");

// Ensure dirs exist
for (const dir of [articlesDir, publicLearnDir, tempDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Estimate reading time (200 wpm)
function estimateReadingTime(nbData) {
  let text = "";
  for (const cell of nbData.cells || []) {
    if (cell.cell_type === "markdown" || cell.cell_type === "code") {
      text += cell.source.join(" ") + " ";
    }
  }
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return minutes.toString();
}

// Extract metadata (title, tags, etc.) from first code cell
function extractMeta(nbData, nbPath) {
  let meta = {
    title: path.basename(nbPath).replace(/\.ipynb$/, ""),
    tags: [],
    readingTime: estimateReadingTime(nbData),
    published: "true",
  };

  if (
    nbData.cells &&
    nbData.cells.length &&
    nbData.cells[0].cell_type === "code"
  ) {
    const lines = nbData.cells[0].source.join("\n");
    const getString = (key) =>
      (lines.match(new RegExp(`${key}\\s*=\\s*["']([^"']+)["']`)) || [])[1];
    const getList = (key) => {
      const match = lines.match(new RegExp(`${key}\\s*=\\s*\\[([^\\]]+)\\]`));
      if (!match) return [];
      return match[1]
        .split(",")
        .map((s) => s.replace(/['"\s]/g, ""))
        .filter(Boolean);
    };

    meta.title = getString("title") || meta.title;
    meta.readingTime = getString("readingTime") || meta.readingTime;
    meta.published = getString("published") || meta.published;
    meta.tags = getList("tags") || meta.tags;
  }

  return meta;
}

// 🧹 Clean old HTMLs
console.log("🧹 Cleaning old HTML files...");
for (const dir of [publicLearnDir]) {
  fs.readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .forEach((file) => fs.unlinkSync(path.join(dir, file)));
}

// 📘 Convert notebooks
console.log("📘 Converting notebooks → HTML...");
const notebooks = fs
  .readdirSync(notebooksDir)
  .filter((f) => f.endsWith(".ipynb"));

for (const nbFile of notebooks) {
  const nbPath = path.join(notebooksDir, nbFile);
  const baseName = nbFile.replace(/\.ipynb$/, "");
  const nbData = JSON.parse(fs.readFileSync(nbPath, "utf8"));

  // 1️⃣ Extract metadata
  const meta = extractMeta(nbData, nbPath);

  // 2️⃣ Prepare temporary copy (remove metadata cell)
  const tempNbPath = path.join(tempDir, `_temp_${Date.now()}_${nbFile}`);
  const tempNbData = JSON.parse(JSON.stringify(nbData));

  if (
    tempNbData.cells &&
    tempNbData.cells.length &&
    tempNbData.cells[0].cell_type === "code" &&
    tempNbData.cells[0].source.some((line) =>
      line.match(/^(title|tags|readingTime|published)\s*=/)
    )
  ) {
    console.log(`🧹 Removing metadata cell from ${nbFile} (temp only)`);
    tempNbData.cells.shift();
  }

  fs.writeFileSync(tempNbPath, JSON.stringify(tempNbData, null, 2));

  // 3️⃣ Convert notebook → HTML
  const tempOutput = path.join(tempDir, `_nbconv_${Date.now()}_${baseName}.html`);
  console.log(`🔁 Converting: ${nbFile} → ${baseName}.html`);
  execSync(
    `jupyter nbconvert --to html "${tempNbPath}" --output "${path.basename(
      tempOutput
    )}" --output-dir "${tempDir}"`,
    { stdio: "inherit" }
  );

  // 4️⃣ Inject meta tags
  let html = fs.readFileSync(tempOutput, "utf8");
  html = html.replace(
    /<head>/i,
    `<head>
<meta name="title" content="${meta.title}" />
<meta name="tags" content="${meta.tags.join(",")}" />
<meta name="readingTime" content="${meta.readingTime}" />
<meta name="published" content="${meta.published}" />`
  );

  // 5️⃣ Write to src/content/articles (don’t delete older ones)
  const finalOutput = path.join(articlesDir, `${baseName}.html`);
  fs.writeFileSync(finalOutput, html);
  console.log(`✅ Wrote ${baseName}.html → src/content/articles/`);

  // 6️⃣ Copy to /public/portfolio/learn
  fs.copyFileSync(finalOutput, path.join(publicLearnDir, `${baseName}.html`));
}

// Cleanup temp folder
fs.rmSync(tempDir, { recursive: true, force: true });
console.log("🎉 Notebook conversion finished successfully!");
