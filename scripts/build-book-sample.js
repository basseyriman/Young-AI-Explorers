/**
 * Build public/book-sample/index.html from YoungAIExplorersBook/index.html
 * Run: node scripts/build-book-sample.js
 */
const fs = require('fs');
const path = require('path');

const bookRoot = path.join(__dirname, '..', '..', 'YoungAIExplorersBook');
const bookIndex = path.join(bookRoot, 'index.html');
const bookStyles = path.join(bookRoot, 'styles-v3.css');
const outDir = path.join(__dirname, '..', 'public', 'book-sample');
const assetsAuthor = path.join(bookRoot, 'assets', 'author.jpg');
const platformAssets = path.join(__dirname, '..', 'public', 'assets');

const SECTION_PATTERN =
  /<!--\s*(COPYRIGHT PAGE|TABLE OF CONTENTS|INTRODUCTION|CHAPTER \d+:[\s\S]*?|ABOUT THE AUTHOR)\s*-->([\s\S]*?<\/section>)/gi;

function extractSections(html) {
  const sections = [];
  let match;
  const wanted = new Set([
    'COPYRIGHT PAGE',
    'TABLE OF CONTENTS',
    'INTRODUCTION',
    'ABOUT THE AUTHOR',
  ]);
  while ((match = SECTION_PATTERN.exec(html)) !== null) {
    const label = match[1].trim();
    const isChapter = /^CHAPTER \d+:/i.test(label);
    if (!wanted.has(label) && !isChapter) continue;
    if (isChapter) {
      const num = parseInt(label.match(/\d+/)[0], 10);
      if (num > 7) continue;
    }
    sections.push(`<!-- ${label} -->${match[2]}`);
  }
  return sections;
}

const chapterMapping = {
  'computer_vision_illustration_1778768624464.png': 'computer_vision.png',
  'speech_recognition_illustration_1778768892651.png': 'speech_recognition.png',
  'ai_translation_illustration_1778768907335.png': 'ai_translation.png',
  'ai_decision_making_illustration_v3_1778771318200.png': 'ai_decision_making.png',
  'ai_healthcare_illustration_v2_1778771348421.png': 'ai_healthcare.png',
  'ai_games_illustration_1778771361973.png': 'ai_games.png',
  'ai_self_driving_cars_illustration_1778771377421.png': 'self_driving_cars.png',
  'ai_space_exploration_illustration_1778771390625.png': 'ai_space.png',
};

function rewriteAssets(html) {
  let out = html
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/url\('assets\//g, "url('/assets/")
    .replace(/url\("assets\//g, 'url("/assets/');
  for (const [from, to] of Object.entries(chapterMapping)) {
    out = out.split(from).join(to);
  }
  return out;
}

function main() {
  if (!fs.existsSync(bookIndex)) {
    console.error('Book index not found:', bookIndex);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const html = fs.readFileSync(bookIndex, 'utf8');
  const sections = extractSections(html);

  if (sections.length < 5) {
    console.error('Too few sections extracted:', sections.length);
    process.exit(1);
  }

  const styles = fs.readFileSync(bookStyles, 'utf8');
  const sampleCss = styles + `

/* Sample reader chrome */
body.sample-reader {
  background: #334155;
  padding: 24px 16px 48px;
}
.sample-banner {
  max-width: 210mm;
  margin: 0 auto 16px;
  padding: 12px 16px;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.sample-banner a {
  color: #fcd34d;
  text-decoration: none;
  font-weight: 600;
}
.sample-banner a:hover { text-decoration: underline; }
.cover-page {
  padding: 0 !important;
  min-height: auto !important;
  display: block !important;
}
.cover-page img {
  width: 100%;
  height: auto;
  display: block;
}
.sample-cta {
  max-width: 210mm;
  margin: 24px auto 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-align: center;
  font-family: Inter, sans-serif;
}
.sample-cta h3 { margin-bottom: 8px; color: #0f172a; }
.sample-cta p { color: #64748b; font-size: 14px; margin-bottom: 16px; }
.sample-cta .buttons { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.sample-cta a {
  padding: 12px 20px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}
.sample-cta .amazon { background: #ff9900; color: #000; }
.sample-cta .platform { background: #4a2d6e; color: #faf8f5; }
@media (max-width: 640px) {
  body.sample-reader { padding: 12px 8px 32px; }
  .page { margin-bottom: 12px; }
}
`;

  const coverFront = `<section class="page cover-page"><img src="/assets/book_front_cover.png" alt="Young AI Explorers front cover" /></section>`;
  const coverBack = `<section class="page cover-page"><img src="/assets/book_back_cover.png" alt="Young AI Explorers back cover" /></section>`;

  const sampleLimit = `<div class="sample-banner" role="note">
    <span>This is a preview sample — the same start as Amazon Look Inside. Full interactive lessons are free on the platform.</span>
    <span><a href="/#book">← Back to book</a> · <a href="/">Start on the platform</a> · <a href="https://www.amazon.com/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B" target="_blank" rel="noopener">Buy on Amazon</a></span>
  </div>`;

  const cta = `<div class="sample-cta">
    <h3>Enjoying this sample?</h3>
    <p>Read the paperback on Amazon, or explore unlimited interactive lessons with Vision Vee on Young AI Explorers.</p>
    <div class="buttons">
      <a class="amazon" href="https://www.amazon.com/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B" target="_blank" rel="noopener">Buy on Amazon</a>
      <a class="platform" href="/signup">Start free on the platform</a>
    </div>
  </div>`;

  const body = [
    sampleLimit,
    coverFront,
    ...sections.map(rewriteAssets),
    coverBack,
    cta,
  ].join('\n\n');

  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Read Sample — Young AI Explorers</title>
  <link rel="stylesheet" href="/book-sample/styles.css" />
</head>
<body class="sample-reader">
${body}
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), doc);
  fs.writeFileSync(path.join(outDir, 'styles.css'), sampleCss);

  if (fs.existsSync(assetsAuthor)) {
    fs.copyFileSync(assetsAuthor, path.join(platformAssets, 'author.jpg'));
  }

  console.log(`Built sample with ${sections.length} interior sections + front/back covers`);
  console.log('Output:', path.join(outDir, 'index.html'));
}

main();
