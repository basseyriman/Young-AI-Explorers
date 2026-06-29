/**
 * Copies printed-book illustrations from YoungAIExplorersBook into platform public/assets.
 * Run: npm run copy-illustrations
 */
const fs = require('fs');
const path = require('path');

const bookAssetsRoot = path.join(
  process.env.BOOK_ASSETS_DIR ||
    'C:\\Users\\basse\\Documents\\RimanTech\\YoungAIExplorersBook\\assets'
);
const bookIllustrationsDir = path.join(bookAssetsRoot, 'Young_AI_Explorers_Illustrations');
const destDir = path.join(__dirname, 'public', 'assets');

const chapterMapping = {
  'computer_vision_illustration_1778768624464.png': 'computer_vision.png',
  'speech_recognition_illustration_1778768892651.png': 'speech_recognition.png',
  'ai_translation_illustration_1778768907335.png': 'ai_translation.png',
  'ai_decision_making_illustration_v3_1778771318200.png': 'ai_decision_making.png',
  'ai_healthcare_illustration_v2_1778771348421.png': 'ai_healthcare.png',
  'ai_games_illustration_1778771361973.png': 'ai_games.png',
  'ai_self_driving_cars_illustration_1778771377421.png': 'self_driving_cars.png',
  'ai_space_exploration_illustration_1778771390625.png': 'ai_space.png',
  'ai_neural_networks_illustration_1778771406851.png': 'neural_networks.png',
  'ai_planet_earth_illustration_1778771429230.png': 'ai_environment.png',
  'ai_machine_learning_illustration_1778771442602.png': 'machine_learning.png',
  'ai_nlp_illustration_1778771460948.png': 'nlp.png',
  'ai_robotics_illustration_1778771478355.png': 'robotics.png',
  'ai_recommendation_systems_illustration_1778771492016.png': 'recommendation_systems.png',
  'ai_facial_recognition_illustration_1778771519138.png': 'facial_recognition.png',
  'ai_virtual_assistants_illustration_1778771538279.png': 'virtual_assistants.png',
  'ai_art_illustration_1778771554611.png': 'ai_art.png',
  'ai_music_illustration_1778771568938.png': 'ai_music.png',
  'ai_sports_illustration_1778771583426.png': 'ai_sports.png',
  'ai_agriculture_illustration_1778771601737.png': 'ai_agriculture.png',
  'ai_weather_illustration_1778794254871.png': 'ai_weather.png',
  'ai_education_illustration_1778794268659.png': 'ai_education.png',
  'ai_traffic_illustration_1778794281855.png': 'ai_transportation.png',
  'ai_banking_illustration_1778794296754.png': 'ai_banking.png',
  'ai_shopping_illustration_1778794323423.png': 'ai_shopping.png',
  'ai_social_media_illustration_1778794336584.png': 'ai_social_media.png',
  'ai_ethics_illustration_1778794347857.png': 'ai_ethics.png',
  'ai_manufacturing_illustration_1778794364064.png': 'ai_manufacturing.png',
  'ai_cybersecurity_illustration_1778794392257.png': 'ai_cybersecurity.png',
  'ai_photography_illustration_1778794406006.png': 'ai_photography.png',
  'ai_food_illustration_1778794418673.png': 'ai_food.png',
  'ai_fashion_illustration_1778794431361.png': 'ai_fashion.png',
  'ai_movies_illustration_1778794456375.png': 'ai_movies.png',
  'ai_deep_learning_illustration_1778794470314.png': 'deep_learning.png',
  'ai_chatbots_illustration_1778794486913.png': 'ai_chatbots.png',
  'ai_emergency_illustration_1778794502593.png': 'ai_emergency_services.png',
  'ai_archaeology_illustration_1778794531818.png': 'ai_archaeology.png',
};

const extraCopies = [
  { src: 'cover_illustration.png', dest: 'cover_illustration.png' },
  { src: 'young-ai-explorers-book-cutout.png', dest: 'book_cover_amazon.png' },
  { src: 'mascot_iconic_transparent.png', dest: 'vision_vee_mascot.png' },
];

function resolveSource(filename) {
  const inSubfolder = path.join(bookIllustrationsDir, filename);
  if (fs.existsSync(inSubfolder)) return inSubfolder;
  const inRoot = path.join(bookAssetsRoot, filename);
  if (fs.existsSync(inRoot)) return inRoot;
  return null;
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let copied = 0;
let missing = 0;

Object.entries(chapterMapping).forEach(([srcName, destName]) => {
  const srcFile = resolveSource(srcName);
  const destFile = path.join(destDir, destName);
  if (srcFile) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✓ ${destName}`);
    copied += 1;
  } else {
    console.error(`✗ missing: ${srcName}`);
    missing += 1;
  }
});

extraCopies.forEach(({ src, dest }) => {
  const srcFile = resolveSource(src) ?? path.join(destDir, src);
  const destFile = path.join(destDir, dest);
  if (srcFile) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✓ ${dest}`);
    copied += 1;
  } else {
    console.error(`✗ missing: ${src}`);
    missing += 1;
  }
});

console.log(`\nDone: ${copied} copied, ${missing} missing.`);
