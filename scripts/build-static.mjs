import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
fs.mkdirSync(distDir, { recursive: true });

const candidates = [
  'index.html',
  'public/index.html',
  'src/index.html',
  'app/index.html',
  'web/index.html'
].map((candidate) => path.join(rootDir, candidate));

const htmlFile = candidates.find((file) => fs.existsSync(file));

if (!htmlFile) {
  const files = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.html'))
    .map((entry) => entry.name);

  if (files.length === 0) {
    throw new Error('No HTML entry file found in the repository root. Add an index.html or a static site entry file.');
  }

  fs.copyFileSync(path.join(rootDir, files[0]), path.join(distDir, 'index.html'));
} else {
  fs.copyFileSync(htmlFile, path.join(distDir, 'index.html'));
}

console.log(`Prepared Capacitor web build in ${distDir}`);
