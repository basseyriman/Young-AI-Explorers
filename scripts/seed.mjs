import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import ws from 'ws';

globalThis.WebSocket = ws;

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We'll read the old chapters-data.js file
const dataPath = path.resolve(process.cwd(), '../chapters-data.js');
let rawData = fs.readFileSync(dataPath, 'utf-8');

// Strip out the "window." assignments at the bottom to avoid eval errors
rawData = rawData.replace(/window\..*/g, '');

// Evaluate the raw string to get the aiChapters array
let aiChapters = [];
try {
  // We use eval in a controlled way here just to extract the array definition
  const scriptContent = rawData + '\naiChapters;';
  aiChapters = eval(scriptContent);
} catch (e) {
  console.error("Error parsing chapters-data.js:", e);
  process.exit(1);
}

async function seed() {
  console.log(`Found ${aiChapters.length} chapters to migrate...`);

  for (let i = 0; i < aiChapters.length; i++) {
    const chapter = aiChapters[i];
    console.log(`Inserting lesson: ${chapter.chapter_title}`);

    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .insert({
        topic_number: i + 1,
        title: chapter.chapter_title,
        introduction: chapter.story,
        main_lesson: chapter.lesson,
        examples: JSON.stringify([{ type: 'activity', content: chapter.activity }]),
        fun_facts: JSON.stringify([chapter.fun_fact]),
        did_you_know: JSON.stringify([]),
        key_takeaways: JSON.stringify([])
      })
      .select()
      .single();

    if (lessonError) {
      console.error("Error inserting lesson:", lessonError);
      continue;
    }

    if (chapter.mini_quiz && chapter.mini_quiz.length > 0) {
      console.log(`Inserting quiz for lesson ID ${lesson.id}`);
      const { error: quizError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: lesson.id,
          questions: JSON.stringify(chapter.mini_quiz)
        });

      if (quizError) {
        console.error("Error inserting quiz:", quizError);
      }
    }
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
