import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(process.cwd(), '../chapters-data.js');
let rawData = fs.readFileSync(dataPath, 'utf-8');
rawData = rawData.replace(/window\..*/g, '');

let aiChapters = [];
try {
  const scriptContent = rawData + '\naiChapters;';
  aiChapters = eval(scriptContent);
} catch (e) {
  console.error("Error parsing", e);
  process.exit(1);
}

let sql = `-- Seed Data for Young AI Explorers\n\n`;

for (let i = 0; i < aiChapters.length; i++) {
  const chapter = aiChapters[i];
  
  const title = chapter.chapter_title.replace(/'/g, "''");
  const intro = chapter.story.replace(/'/g, "''");
  const lesson = chapter.lesson.replace(/'/g, "''");
  
  const examplesStr = JSON.stringify([{ type: 'activity', content: chapter.activity }]).replace(/'/g, "''");
  const funFactsStr = JSON.stringify([chapter.fun_fact]).replace(/'/g, "''");
  const questionsStr = JSON.stringify(chapter.mini_quiz || []).replace(/'/g, "''");

  sql += `
-- Lesson ${i + 1}
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (${i + 1}, '${title}', '${intro}', '${lesson}', '${examplesStr}'::jsonb, '${funFactsStr}'::jsonb, '[]'::jsonb, '[]'::jsonb);
`;

  if (chapter.mini_quiz && chapter.mini_quiz.length > 0) {
    sql += `
INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = ${i + 1}), '${questionsStr}'::jsonb);
`;
  }
}

fs.writeFileSync('seed.sql', sql);
console.log('seed.sql generated');
