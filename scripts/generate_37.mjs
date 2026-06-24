import fs from 'fs';
import path from 'path';

// 1. Read the 10 detailed chapters
const dataPath = path.resolve(process.cwd(), '../chapters-data.js');
let rawData = fs.readFileSync(dataPath, 'utf-8');
rawData = rawData.replace(/window\..*/g, '');

let aiChapters = [];
try {
  const scriptContent = rawData + '\naiChapters;';
  aiChapters = eval(scriptContent);
} catch (e) {
  console.error("Error parsing chapters-data.js:", e);
}

// 2. Read the full 37 list from the book HTML
const bookHtmlPath = path.resolve(process.cwd(), '../YoungAIExplorersBook/index.html');
const bookHtml = fs.readFileSync(bookHtmlPath, 'utf-8');

const regex = /<li class="toc-item"><span>(\d+)\.\s+(.*?)<\/span>/g;
let match;
const allTopics = [];

while ((match = regex.exec(bookHtml)) !== null) {
  const num = parseInt(match[1]);
  const title = match[2];
  allTopics.push({ num, title });
}

// 3. Generate SQL
let sql = `-- Seed Data for Young AI Explorers (37 Topics)\n\n`;

for (let i = 0; i < allTopics.length; i++) {
  const topicNumber = allTopics[i].num;
  const rawTitle = allTopics[i].title;
  
  // See if we have detailed data for it (we have 1-10 in aiChapters)
  // But wait, the titles in aiChapters are like "Computer Vision - Teaching Computers to See"
  // We'll just map index to index since they match 1 to 1 for the first 10.
  const detailedChapter = i < aiChapters.length ? aiChapters[i] : null;

  const title = detailedChapter ? detailedChapter.chapter_title.replace(/'/g, "''") : rawTitle.replace(/'/g, "''");
  const intro = detailedChapter ? detailedChapter.story.replace(/'/g, "''") : 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of ' + rawTitle.replace(/'/g, "''") + '!';
  const lesson = detailedChapter ? detailedChapter.lesson.replace(/'/g, "''") : 'Content for ' + rawTitle.replace(/'/g, "''") + ' is coming soon to the Young AI Explorers platform!';
  
  const examplesStr = detailedChapter ? JSON.stringify([{ type: 'activity', content: detailedChapter.activity }]).replace(/'/g, "''") : '[]';
  const funFactsStr = detailedChapter && detailedChapter.fun_fact ? JSON.stringify([detailedChapter.fun_fact]).replace(/'/g, "''") : '[]';
  const questionsStr = detailedChapter && detailedChapter.mini_quiz ? JSON.stringify(detailedChapter.mini_quiz).replace(/'/g, "''") : '[]';

  sql += `
-- Lesson ${topicNumber}
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (${topicNumber}, '${title}', '${intro}', '${lesson}', '${examplesStr}'::jsonb, '${funFactsStr}'::jsonb, '[]'::jsonb, '[]'::jsonb);
`;

  if (detailedChapter && detailedChapter.mini_quiz && detailedChapter.mini_quiz.length > 0) {
    sql += `
INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = ${topicNumber}), '${questionsStr}'::jsonb);
`;
  }
}

fs.writeFileSync('seed37.sql', sql);
console.log('seed37.sql generated with ' + allTopics.length + ' topics');
