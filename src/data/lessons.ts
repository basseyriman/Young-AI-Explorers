// Static lesson content for all 37 topics
// This makes every lesson work without needing a database query

export interface LessonData {
  topic_number: number;
  title: string;
  introduction: string;
  main_lesson: string;
  fun_facts: string[];
  examples: { type: string; content: string }[];
}

export const ALL_LESSONS: Record<number, LessonData> = {
  1: {
    topic_number: 1,
    title: "Computer Vision – Teaching Computers to See",
    introduction: "Deep inside the glowing Heavenly Tech Lab, Maya discovered something amazing. 'How does my tablet know it's me?' she wondered. Suddenly, Vision Vee appeared, surrounded by a magical holographic glow. 'Hi Maya!' Vee said warmly. 'Just like we see the beauty in the world, I use Computer Vision to see and understand the smart patterns around us! Want to join my adventure?'",
    main_lesson: "Computer Vision is a special gift for computers! It teaches them to see and understand the wonderful world, just like our eyes and hearts work together to recognize the people we love. Computers use cameras and sensors to capture images, then use clever algorithms to find patterns in those images — like identifying faces, reading text, or spotting a cat in a photo. Companies like Google and Apple use Computer Vision in every photo app and face-unlock feature you use every day. Self-driving cars use it to read road signs. Doctors use it to spot diseases in medical scans. The possibilities are endless!",
    fun_facts: ["Did you know that your smartphone camera takes about 1 billion calculations every second just to focus on your face when taking a selfie? That's faster than you can blink!", "Computer Vision systems can now identify over 10,000 different types of objects in a single image."],
    examples: [{ type: "activity", content: "Look around your room and pick 5 objects. Write them down. Now imagine training a computer to recognize each one — what clues would you teach it to look for? Colour, shape, size?" }]
  },
  2: {
    topic_number: 2,
    title: "Speech Recognition – Teaching Computers to Listen",
    introduction: "Alex loves talking to his smart instruments at home. Suddenly, Echo Ed, a robot with glowing soundwave patterns like a digital ripple on a pond, appears. 'Hi Alex!' Echo Ed explains with a smile. 'Your voice is like a beautiful song! I help computers catch your words and turn them into smart ideas. It's like being a detective for the invisible music of talk!'",
    main_lesson: "Speech Recognition helps computers listen with their hearts! It turns the sound of our voices into words that help the AI understand how it can help us best. When you speak to Siri or Alexa, your voice is broken down into tiny sound waves. AI analyses those waves, matches them to patterns it has learned from millions of voices, and converts them to text in milliseconds. Speech recognition is used in call centres, hospitals (to let doctors dictate notes), in cars (to control music or maps), and to help people with disabilities communicate better.",
    fun_facts: ["The first speech recognition system was created in 1952 and could only understand the numbers 0–9, but today's systems can understand millions of words in hundreds of languages!", "Smart speakers can now understand accents from over 50 countries."],
    examples: [{ type: "activity", content: "Say a sentence clearly and then try saying the same sentence in a whisper. Ask a friend or family member to try too. How does the sound change? This is exactly the kind of variation AI must learn to handle!" }]
  },
  3: {
    topic_number: 3,
    title: "AI Translation – Breaking Language Barriers",
    introduction: "Sofia wants to be friends with Yuki from Japan, but they speak different languages. Suddenly, Linky Lex appears, holding a glowing digital globe. 'I'll help you build a bridge of friendship!' Lex says. 'I know the rules of many languages and can turn your words into Japanese so Yuki can understand your heart. It's like a magic bridge of kindness!'",
    main_lesson: "AI Translation is like a magic bridge connecting people from all over the world! Modern AI translation systems use something called Neural Machine Translation — the AI reads entire sentences rather than word by word, understanding the context and meaning behind the words. It was trained on billions of sentences in pairs (like an English sentence next to its French version) so it learned the patterns of how languages map to each other. Today, Google Translate handles over 500 million translation requests every day, supporting over 100 languages.",
    fun_facts: ["Google Translate can translate between over 100 languages and processes more than 500 million translation requests every single day!", "AI can now translate sign language into text and text back into animated sign language."],
    examples: [{ type: "activity", content: "Pick a greeting from 5 different countries (e.g., Bonjour, Hola, Konnichiwa, Ciao, Salaam). Try saying them! Now think: how would an AI learn to translate between all of these?" }]
  },
  4: {
    topic_number: 4,
    title: "AI Decision Making – Smart Choices",
    introduction: "Tommy is playing a game where a character has to find treasure in a maze. The character is controlled by AI! Tommy wonders how it knows where to go. Logic Leo, a robot mentor with glowing gear eyes and a floating map, appears. 'I'll show you!' Logic Leo says. 'Just like you think about your choices, I look at all the paths and pick the best one using rules. It's like having a super-powered brain for puzzles!'",
    main_lesson: "AI Decision Making is when computers learn to make smart choices by looking at different options and picking the best one based on rules and past experiences. AI uses something called a 'decision tree' — imagine a series of yes/no questions that lead to different paths. It can also use reinforcement learning, where it tries thousands of solutions and learns which ones gave the best results. AI decision-making is used in hospital systems that prioritise emergencies, banking apps that detect fraud, recommendation engines, traffic systems, and even chess-playing programs.",
    fun_facts: ["AI can make over a billion decisions in just one second!", "The chess AI AlphaZero taught itself to play better than any human in just 4 hours of practice."],
    examples: [{ type: "activity", content: "Design a simple decision tree for choosing what to have for breakfast. Start with: 'Am I in a hurry?' If Yes → Toast. If No → ask another question. How many questions does it take to cover all your options?" }]
  },
  5: {
    topic_number: 5,
    title: "AI in Healthcare – Helping Doctors Help You",
    introduction: "Heal-o-Bot is a caring AI who works in a state-of-the-art medical centre! He helps doctors by looking at medical scans and identifying potential health issues very early. One morning, Heal-o-Bot noticed a tiny problem in an X-ray that was hard for even expert doctors to see. Because of Heal-o-Bot's quick eye, the patient was treated right away and felt better soon!",
    main_lesson: "AI is revolutionising healthcare by helping doctors diagnose illnesses earlier and more accurately than ever before. AI systems can scan thousands of medical images — X-rays, MRI scans, skin photos — and compare them to millions of previous cases it has studied. It can detect early signs of cancer, heart disease, and eye conditions that a human might miss. AI is also helping scientists discover new medicines faster by simulating how thousands of drug molecules interact with diseases. The future is a world where no illness goes undetected because AI is always watching.",
    fun_facts: ["Some AI can predict a heart problem days before it even happens!", "Google's DeepMind AI can detect over 50 eye diseases from a single scan with 94% accuracy."],
    examples: [{ type: "activity", content: "Think about how a doctor makes a diagnosis. They look at symptoms, ask questions, and check test results. Draw a diagram showing how an AI might do the same thing — what data would it need?" }]
  },
  6: {
    topic_number: 6,
    title: "AI in Games – Your Smart Playing Partner",
    introduction: "Game Gus is an incredible AI who loves video games! He lives inside your favourite games as a smart opponent or a helpful teammate. Whether he's playing soccer or a racing game, Gus learns how you play and adapts to keep the game fun and challenging. 'If I'm too easy, you'll get bored,' Gus says with a playful wink, 'but if I'm too hard, you'll get frustrated. I find the perfect balance!'",
    main_lesson: "AI creates challenging opponents and realistic characters in video games to make them more fun! Game AI uses behaviour trees, pathfinding algorithms, and machine learning to make non-player characters (NPCs) feel alive. Advanced games now use AI that adapts to your skill level in real time — if you're doing well, enemies get smarter; if you're struggling, they ease off. AI is also used in game development itself — generating game worlds, writing dialogue, creating music, and testing thousands of bugs automatically.",
    fun_facts: ["AI can now beat the world's best players at complex games like Chess, Go, and StarCraft!", "The game DOTA 2's AI (OpenAI Five) defeated world champion human teams in 2019."],
    examples: [{ type: "activity", content: "In your favourite video game, observe how the computer opponents behave. Do they chase you? Patrol areas? Run away when hurt? These are all AI behaviours. Can you guess the rules the programmer wrote?" }]
  },
  7: {
    topic_number: 7,
    title: "Self-Driving Cars – Cars That Drive Themselves",
    introduction: "Drive Dash is a futuristic self-driving car powered by advanced AI! Dash has special 'eyes' called LIDAR and cameras that see everything around him for blocks. While driving through a busy city street, Dash safely stopped for a crossing puppy and navigated around a construction site. 'I can see in every direction at once,' Dash says with a hum, 'and I never get distracted or tired!'",
    main_lesson: "Self-driving cars use a combination of cameras, radar, ultrasonic sensors, and LIDAR (laser-based distance measuring) to build a 360-degree map of everything around them. Powerful AI processes all this data many times per second to identify roads, pedestrians, traffic lights, other vehicles, and obstacles. It then makes split-second driving decisions faster than any human could. Companies like Tesla, Waymo, and many others are developing and testing these systems on public roads today. Fully autonomous vehicles could save over 1 million lives per year by eliminating human driving errors.",
    fun_facts: ["Self-driving cars can react much faster than any human driver can — humans take about 1.5 seconds to react; AI takes milliseconds!", "Waymo's self-driving cars have driven over 20 million miles on real roads."],
    examples: [{ type: "activity", content: "Put on a blindfold and have a friend guide you across a room using only their voice (safely!). This is a bit like how a self-driving car relies on its sensors instead of eyes. What instructions did you need?" }]
  },
  8: {
    topic_number: 8,
    title: "AI in Space Exploration – To the Stars!",
    introduction: "High above our world, the silent stars were calling. Maya and Alex looked through a giant telescope and saw something moving fast — it was a smart Mars Rover! Suddenly, Astro Ace appeared in a brilliant suit of stardust. 'Greetings, fellow explorers! I use AI to navigate across distant planets, helping rovers find water and special rocks. I'm like a super-navigator for the universe!'",
    main_lesson: "AI helps us explore the unknown universe! Space is so far away that radio signals from Earth to Mars take up to 24 minutes to arrive — meaning we can't remotely control a Mars rover in real time. AI gives the rover the ability to make its own decisions: where to drive, what rocks to study, how to avoid dangerous terrain. AI also helps telescopes scan billions of stars to find new planets, analyses data from space telescopes like James Webb, and helps plan the trajectories of rockets to other planets. AI is the key to unlocking the cosmos.",
    fun_facts: ["AI controllers on the Mars Perseverance Rover can plan their own path around dangerous rocks without waiting for humans to tell them what to do!", "The James Webb Space Telescope uses AI to help process and filter the billions of images it captures of distant galaxies."],
    examples: [{ type: "activity", content: "If you were designing an AI for a Mars rover, what 3 rules would you program it with to keep it safe? Think about terrain, battery life, and scientific goals." }]
  },
  9: {
    topic_number: 9,
    title: "Neural Networks – How AI Learns",
    introduction: "Maya wondered, 'How does a robot actually think?' Suddenly, Layer Leo appeared, surrounded by glowing lines that looked like a digital web. 'Think of me like a team of friends!' Leo explained. 'My Neural Network has many layers. Each layer learns a small part of a puzzle, and when they work together, they can recognize anything — like a cat, a car, or even your favourite song!'",
    main_lesson: "Neural Networks are inspired by the way the human brain works! Your brain has about 86 billion neurons (brain cells) connected together. When you learn something new, new connections form between neurons. AI neural networks work the same way — they have digital 'neurons' arranged in layers. The first layer receives raw data (like pixels of an image). Each layer processes it and passes patterns to the next layer. By the final layer, the network can recognise complex things like faces, handwriting, and speech. Training a neural network means showing it millions of examples until it learns the right patterns.",
    fun_facts: ["Digital neural networks were inspired by the way the billions of neurons in your own human brain work together to help you think and feel!", "The largest AI neural networks today have over 1 trillion connections — more than the human brain!"],
    examples: [{ type: "activity", content: "Draw 3 circles in a row (your mini neural network layers!). The first circle gets an input (e.g., 'the sky is blue'). What does each layer decide before reaching the output: 'It is daytime'? Fill in your thinking!" }]
  },
  10: {
    topic_number: 10,
    title: "AI & Planet Earth – Protecting Our Home",
    introduction: "The forest was whispering, and Maya and Alex wanted to help. Green Gaia, a robot with leaf-green patterns and a heartbeat like a soft drum, appeared. 'I use AI to listen to the Earth!' Gaia said. 'I can detect when trees are in danger or track rare animals to keep them safe. I help humans be better guardians of our beautiful planet.'",
    main_lesson: "AI is becoming one of the most powerful tools for protecting our planet! Scientists use AI to analyse satellite images and spot illegal deforestation in real time. AI listens to audio recordings in rainforests to detect the sound of chainsaws. It tracks the migration patterns of endangered species via GPS and identifies individual animals by their markings. AI also helps predict natural disasters like floods, wildfires, and storms earlier than traditional methods — giving communities more time to prepare and evacuate. AI is helping us understand climate change patterns and find renewable energy solutions faster than ever before.",
    fun_facts: ["Some AI systems can listen to the sounds of the ocean and identify the 'songs' of different whales from thousands of miles away!", "AI helped scientists discover a coral reef in 2022 that was taller than the Eiffel Tower!"],
    examples: [{ type: "activity", content: "Look out your window (or think about your local area). What environmental data could you collect — temperature, number of birds, plant health, litter? How could an AI use this data to help protect nature?" }]
  },
  11: {
    topic_number: 11,
    title: "Machine Learning – Teaching Computers to Learn",
    introduction: "Priya had just started using a new music app. 'How does it already know I like pop music?' she asked, puzzled. Data Dex, a robot with scrolling numbers across his chest like a ticker tape, appeared. 'Magic? No — Machine Learning!' Dex said proudly. 'I don't just follow rules; I LEARN from data. The more music you play, the smarter I get about what you love!'",
    main_lesson: "Machine Learning is the core engine of modern AI! Instead of a programmer writing specific rules for every situation, machine learning allows computers to find patterns in data and build their own rules. Think of it like this: if you showed a child 1,000 pictures of dogs labelled 'dog', they'd start to recognise new dogs they'd never seen before. Machine learning does exactly that. There are three main types: Supervised Learning (learning from labelled examples), Unsupervised Learning (finding hidden patterns without labels), and Reinforcement Learning (learning by trial and error, like training a puppy with treats). Machine learning powers everything from your email spam filter to Netflix recommendations to fraud detection.",
    fun_facts: ["Netflix's machine learning recommendation engine saves the company over $1 billion per year by keeping subscribers watching!", "Machine learning models can be trained in minutes on a laptop — or take weeks on thousands of powerful computers for the biggest AI systems."],
    examples: [{ type: "activity", content: "Collect 10 objects from around your house. Sort them into 2 groups based on a rule you make up (e.g., things that plug in vs things that don't). This is supervised learning — you're the 'label'!" }]
  },
  12: {
    topic_number: 12,
    title: "Natural Language Processing – How AI Understands Words",
    introduction: "'Can computers actually understand language?' asked Jamie, typing away at his keyboard. Word Wise, a robot made of flowing letters and punctuation marks, floated over. 'Understanding language is my superpower!' she said. 'I can read, write, summarise, translate, and even detect emotion in text. Human language is complex and beautiful — and I've learned it all!'",
    main_lesson: "Natural Language Processing (NLP) is the branch of AI that enables computers to read, understand, and generate human language. It's how chatbots can answer your questions, how Google understands your search queries, how your email app detects spam, and how AI can summarise a 50-page report in seconds. NLP works by breaking down text into tokens (words and phrases), analysing grammar and meaning, and comparing it to billions of examples it has learned from. Modern large language models (LLMs) like GPT are trained on most of the public internet and can write, translate, answer questions, and create code.",
    fun_facts: ["The largest AI language models have read more text than any human could read in 10,000 lifetimes!", "AI can now detect whether a movie review is positive or negative with 97% accuracy."],
    examples: [{ type: "activity", content: "Write a short, ambiguous sentence (e.g., 'I saw the man with the telescope'). Now write two different meanings for it. This is the challenge of ambiguity that NLP systems have to solve!" }]
  },
  13: {
    topic_number: 13,
    title: "Robotics – Building Intelligent Machines",
    introduction: "In the futuristic Robot Assembly Hall, Zara was watching a robot arm carefully place tiny computer chips onto a circuit board — perfectly every single time! Build-Bot, a stocky workshop robot with spinning tool attachments, rolled over. 'Robotics is where AI meets the physical world!' Build-Bot said. 'I can see, sense, and move — and with AI, I can learn and adapt to anything!'",
    main_lesson: "Robotics combines mechanical engineering, electronics, and AI to create machines that can interact with the physical world. Modern robots have sensors to feel touch and detect obstacles, cameras for vision, and AI brains to make decisions. They're used in car factories to weld frames, in hospitals to assist surgeons, in warehouses to sort packages, and in disaster zones to search for survivors. The most advanced robots today — like Boston Dynamics' Atlas — can run, jump, do backflips, and navigate uneven terrain. As AI improves, robots will become capable of far more complex and delicate tasks.",
    fun_facts: ["There are over 3 million industrial robots working in factories around the world today!", "The Da Vinci Surgical Robot can perform operations through tiny incisions smaller than a coin."],
    examples: [{ type: "activity", content: "Design your own robot on paper! Give it a purpose, list its sensors (how it detects the world), its actuators (how it moves or acts), and its AI brain (what decisions it makes)." }]
  },
  14: {
    topic_number: 14,
    title: "Recommendation Systems – AI That Knows What You Like",
    introduction: "'How does YouTube always know exactly what video I want to watch next?' wondered Sam, staring at her perfectly personalised feed. Algo Andy, a cool robot wearing a stylish digital suit covered in thumbs-up icons, appeared. 'That's my magic!' Andy said with a wink. 'I study your habits, preferences, and history to predict what you'll love next — I'm your personal taste expert!'",
    main_lesson: "Recommendation systems are the AI behind Netflix, Spotify, YouTube, Amazon, and TikTok! They work by analysing your behaviour — what you watch, buy, skip, or rate — and comparing it to millions of other users with similar tastes. There are two main approaches: Collaborative Filtering (people who liked X also liked Y — so recommend Y to you) and Content-Based Filtering (you liked this action film, so here's another action film with a similar director). These systems are incredibly powerful — Netflix says 80% of what people watch comes from its AI recommendations. They're so effective that Spotify can predict a hit song before it's released!",
    fun_facts: ["Spotify's AI creates over 400 million personalised playlists every single week!", "Amazon's recommendation system is responsible for 35% of all its total sales revenue."],
    examples: [{ type: "activity", content: "Think about your last 5 favourite songs or films. What do they have in common? Genre? Mood? Artist? You've just done what a recommendation AI does — found the pattern in your own preferences!" }]
  },
  15: {
    topic_number: 15,
    title: "Facial Recognition – AI That Knows Your Face",
    introduction: "Lily unlocked her phone just by smiling at it. 'How does it know it's me?' she asked. Face Finder, a robot with a camera lens for an eye and a gentle, curious expression, appeared. 'Faces are like fingerprints — completely unique!' Face Finder explained. 'I map 68 key points on your face — the distance between your eyes, the shape of your nose — and I remember YOU perfectly.'",
    main_lesson: "Facial Recognition uses AI to identify or verify a person's identity by analysing their facial features. The AI maps key facial landmarks — like the distance between eyes, the shape of the jaw, the depth of the eye sockets — creating a unique 'faceprint'. This faceprint is then compared against a database. It's used in phone unlocking, airport passport control, security cameras, and even in retail stores. However, it also raises important ethical questions about privacy, bias (early systems were less accurate for darker skin tones), and surveillance. It's a powerful technology that must be used responsibly.",
    fun_facts: ["China's facial recognition cameras can identify a person's face in under 3 seconds even in a crowd of thousands!", "Your iPhone's Face ID maps over 30,000 invisible infrared dots on your face to create your unique faceprint."],
    examples: [{ type: "activity", content: "Look in a mirror and notice your unique facial features — the distance between your eyes, the shape of your nose, your jawline. These are the landmarks an AI would map. How many can you count?" }]
  },
  16: {
    topic_number: 16,
    title: "Virtual Assistants – Meet Your AI Helper",
    introduction: "'Hey Siri, what's the weather today?' called out Max. But who answers? Voice Vine, an elegant robot assistant with a glowing speech bubble above her head, appeared. 'Virtual assistants like me are powered by the combined magic of speech recognition, language understanding, and smart databases!' she said with a cheerful chime. 'We're always listening for your call!'",
    main_lesson: "Virtual Assistants combine multiple AI technologies to create a helpful, conversational interface. They use Speech Recognition to hear you, Natural Language Processing to understand what you mean, a Knowledge Base to find information, and Text-to-Speech to answer you back. Assistants like Siri, Alexa, Google Assistant, and Cortana can set alarms, play music, answer questions, control smart home devices, order shopping, and even tell jokes. Enterprise virtual assistants are used in banks and hospitals to handle customer service enquiries. As AI advances, virtual assistants are becoming increasingly capable of complex multi-step tasks.",
    fun_facts: ["There are over 4 billion virtual assistant devices in use around the world today!", "Amazon Alexa can understand and respond in over 8 languages simultaneously."],
    examples: [{ type: "activity", content: "Ask a virtual assistant on your phone or smart speaker three different kinds of questions: a fact question, a task (like setting a timer), and an opinion. Notice how it handles each differently!" }]
  },
  17: {
    topic_number: 17,
    title: "AI in Art – The Creative Machine",
    introduction: "Mia stared at a breathtaking painting — vivid colours, swirling galaxies, dreamlike landscapes. 'Did a human paint this?' she asked in wonder. Artie, a robot with paintbrush fingers and a canvas for a chest, stepped forward. 'I did!' Artie said proudly. 'I've studied millions of artworks across human history and learned to create my own. Human creativity inspired me — now I can inspire you back!'",
    main_lesson: "AI is transforming art and creativity! AI image generators like DALL-E, Midjourney, and Stable Diffusion can create stunning images from a text description (called a prompt). They work by learning patterns from billions of images and their descriptions, then using that knowledge to generate brand-new images. AI can mimic the style of Van Gogh, create photorealistic portraits, design logos, generate concept art for films, and create unique artwork that has never existed before. AI art is sparking big discussions about creativity, authorship, and what it means to be an artist — but it's also giving everyone the ability to be a visual creator.",
    fun_facts: ["An AI-generated artwork sold at Christie's auction house for $432,500 in 2018!", "DALL-E 3 can create a detailed, photorealistic image from a text prompt in under 30 seconds."],
    examples: [{ type: "activity", content: "Describe your dream painting in 2 sentences (e.g., 'A robot and a child sitting on the moon, watching Earth rise, painted in the style of Van Gogh'). You've just written an AI art prompt! What would it look like?" }]
  },
  18: {
    topic_number: 18,
    title: "AI in Music – Composing the Future",
    introduction: "A beautiful melody filled the room — sweeping violins, gentle piano, a beat that felt both ancient and futuristic. 'Who composed this?' asked Leo. Beat Byte, a robot DJ with equaliser bars lighting up across his chest, stepped up to the mixing desk. 'I did!' he said with a grin. 'I've listened to thousands of symphonies, pop songs, and jazz pieces — and now I can create my own music in any style!'",
    main_lesson: "AI is composing music, producing beats, and even singing! Music AI systems like Suno and Udio can generate complete songs in any genre from a simple text prompt. AI learns music theory, instrument sounds, rhythm patterns, and emotional tone from analysing millions of tracks. It's used in film scoring (creating background music for scenes), in video game soundtracks (generating adaptive music that changes with gameplay), in helping musicians overcome creative blocks, and in creating royalty-free music. AI can also isolate vocals from a track, improve audio quality, and even clone a person's singing voice.",
    fun_facts: ["AI can compose a complete orchestral symphony in just a few seconds!", "Sony's AI system Flow Machines co-wrote a pop song called 'Daddy's Car' that was released in 2016 — many people couldn't tell it was AI-generated."],
    examples: [{ type: "activity", content: "Pick a mood (happy, mysterious, epic, sad). What kind of music would you use to express it? What tempo, instruments, and volume? You're describing what an AI would learn to compose!" }]
  },
  19: {
    topic_number: 19,
    title: "AI in Sports – Training Smarter",
    introduction: "The stadium was electric! But behind every goal, every perfect serve, and every split-second tackle, there was a secret weapon: AI. Coach Chip, a sporty robot with a stopwatch and a data tablet, jogged over. 'Athletes are using AI to train smarter, not just harder!' he said. 'I track every movement, every heartbeat, every sprint — and I use that data to make champions!'",
    main_lesson: "AI is revolutionising sports at every level! Performance analysis AI tracks athletes' movements with cameras and sensors, measuring speed, stride, body position, and fatigue. Teams like Liverpool FC and the Golden State Warriors use AI to analyse opponents' tactics and optimise their own game plans. Wearable sensors track heart rate, muscle strain, and hydration during training to prevent injuries before they happen. AI is also improving officiating — VAR (Video Assistant Referee) in football and Hawk-Eye in tennis use computer vision to make accurate decisions. Even fantasy sports apps use AI to help fans make team selections!",
    fun_facts: ["Formula 1 teams process over 100 GB of data per race using AI to optimise car performance in real time!", "AI can predict sports injuries up to 4 weeks before they happen by analysing training patterns."],
    examples: [{ type: "activity", content: "Watch a short sports clip. Count: how many times does a player change direction? How fast does the ball move? How long is each sprint? Now imagine an AI doing this for every second of every match — that's sports analytics!" }]
  },
  20: {
    topic_number: 20,
    title: "AI in Agriculture – Feeding the World",
    introduction: "The farmland stretched as far as the eye could see — rows of green crops glowing in the morning sun. But hidden amongst the plants was something surprising: tiny robots on wheels, guided by AI, carefully tending to each plant. Sprout, a cheerful agricultural robot with soil-stained wheels and a sensor antenna, rolled over. 'AI is helping us grow enough food for everyone on Earth — sustainably and smartly!'",
    main_lesson: "AI is transforming farming! Smart agriculture uses drones with cameras to scan fields and identify which plants are healthy, which are diseased, and which need more water or fertiliser — all without a farmer needing to walk every row. AI analyses soil data, weather forecasts, and crop history to tell farmers exactly when and where to plant. Autonomous tractors can plough, seed, and harvest fields with pinpoint GPS precision. AI even monitors livestock health — detecting when animals are ill or about to give birth. The result is higher crop yields, less water waste, fewer pesticides, and a more sustainable food system for our growing global population.",
    fun_facts: ["AI-powered precision agriculture can reduce water usage by up to 50% compared to traditional farming!", "John Deere's autonomous tractors use AI to plant seeds within 2.5 cm of perfect position every time."],
    examples: [{ type: "activity", content: "Grow a small plant at home (or draw one). Every day, note its height, how much water it got, and how sunny it was. After a week, can you spot any patterns? That's exactly the data an agricultural AI would analyse!" }]
  },
  21: {
    topic_number: 21,
    title: "Weather Prediction – AI and the Sky",
    introduction: "'How do meteorologists know it will rain tomorrow?' asked Sam, looking at the grey clouds gathering outside. Storm Scout, a robot with a swirling weather map for a head and lightning bolt antennae, appeared. 'Weather is one of the most complex systems on Earth!' Scout said, eyes flickering with data. 'But with AI analysing patterns from millions of weather stations, satellites, and sensors, I can predict the future — at least the weather part!'",
    main_lesson: "Weather forecasting has been transformed by AI! Traditional weather models required enormous supercomputers to run complex physics equations. AI systems like Google DeepMind's GraphCast can now produce accurate 10-day global weather forecasts in under a minute — far faster and often more accurate than traditional methods. AI analyses data from thousands of weather stations, ocean buoys, weather satellites, and radar systems to find patterns and make predictions. AI-powered early warning systems now give communities days or weeks of notice before hurricanes, floods, and wildfires — saving thousands of lives every year.",
    fun_facts: ["Google's GraphCast AI can produce a 10-day global weather forecast in under 60 seconds!", "AI weather prediction models trained on 40 years of historical weather data can now outperform the world's best supercomputers."],
    examples: [{ type: "activity", content: "Look at the sky right now. Note: cloud type, colour, and coverage; wind speed; temperature. Predict what the weather will be in 3 hours. Check back and see how you did — you've just been a junior meteorologist!" }]
  },
  22: {
    topic_number: 22,
    title: "AI in Education – Personalised Learning",
    introduction: "Every student in the classroom was working at their own pace, on their own perfect lesson — all thanks to an AI tutor on their screen. Study Star, a friendly robot with a graduation cap and a glowing lightbulb, appeared. 'Every child learns differently!' Study Star said warmly. 'I adapt to your speed, your strengths, and even your moods. I'm not replacing teachers — I'm supercharging learning!'",
    main_lesson: "AI is making education more personal and effective than ever! Adaptive learning platforms use AI to analyse how a student answers questions — if they struggle with fractions, the system gives them more fraction practice at a slower pace. If they excel at reading, it challenges them with harder texts. AI tutors are available 24/7 to explain concepts, give hints, and encourage students. Schools use AI to spot which students might fall behind before it happens, so teachers can give extra support early. AI is also helping educators create engaging lesson plans and automatically grade written work — freeing teachers to spend more time with individual students.",
    fun_facts: ["AI tutoring systems have been shown to improve student learning speeds by up to 2x compared to traditional classroom-only methods!", "Duolingo's AI personalises language lessons for over 600 million learners worldwide."],
    examples: [{ type: "activity", content: "Think about a subject you find easy and one you find hard. If an AI was watching you learn, what patterns would it notice? How many extra practice questions would it give you for the hard subject? Design your ideal AI tutor!" }]
  },
  23: {
    topic_number: 23,
    title: "Smart Traffic – AI Cities That Flow",
    introduction: "The city traffic was always perfectly smooth — no jams, no long red lights, just cars flowing like water through a smart stream. Flow Fox, a sleek robot shaped like a traffic light with glowing sensors, explained how. 'I watch every road, every junction, every car!' he said. 'I adjust traffic lights in real time to keep everything moving. I'm the invisible conductor of the city's traffic orchestra!'",
    main_lesson: "Smart Traffic AI is making cities faster, safer, and greener! Traditional traffic lights follow fixed timing patterns regardless of actual traffic. AI-powered systems use cameras and sensors at every junction to count cars and adjust light timing in real time — giving green lights longer when there's more traffic and reducing wait times elsewhere. Cities like Pittsburgh and Singapore have deployed AI traffic management and reduced average journey times by 25%. AI also predicts traffic jams before they happen and re-routes cars automatically. Ambulances and fire engines can be given priority green lights automatically, reducing emergency response times significantly.",
    fun_facts: ["AI traffic management in Pittsburgh reduced travel time by 25% and vehicle emissions by 21%!", "Singapore's traffic AI can predict congestion 30 minutes before it occurs."],
    examples: [{ type: "activity", content: "Stand near a traffic light for 5 minutes. Count the cars that pass on each road. If you were the AI, how would you adjust the light timing to keep traffic flowing best? Write your traffic plan!" }]
  },
  24: {
    topic_number: 24,
    title: "Secure Banking – AI That Guards Your Money",
    introduction: "Mr. Thompson's card was used to buy a TV in another country — at the exact moment he was shopping at his local supermarket! Within seconds, his bank's AI flagged it as fraud and cancelled the transaction. Safe Vault, a robot in a banker's suit with glowing shield armour, appeared. 'Protecting your money is my full-time job!' Safe Vault declared. 'I analyse millions of transactions every second, looking for anything suspicious.'",
    main_lesson: "AI is the invisible security guard that protects your money! Every time you use your debit or credit card, an AI system checks your transaction against your spending history — your usual shops, typical amounts, normal locations. If something unusual happens (like a purchase in another country while you're at home), the AI flags it as suspicious and may block the transaction or alert you. Banks use AI to detect complex fraud patterns that humans would never spot, to approve or reject loan applications by analysing credit history, and to offer personalised financial advice. AI processes billions of transactions every day, making banking safer for everyone.",
    fun_facts: ["Visa's AI fraud detection system processes over 65,000 transaction messages per second!", "AI fraud detection systems save banks and customers over $27 billion per year globally."],
    examples: [{ type: "activity", content: "Imagine you're an AI protecting a bank account. You notice the account holder usually spends under £50 per day locally. Today there's a £2,000 purchase in Brazil. What would you do? What questions would you ask to verify if it's real?" }]
  },
  25: {
    topic_number: 25,
    title: "Smart Shopping – AI in the Store",
    introduction: "Imagine walking into a shop, picking up everything you need, and walking straight out — no tills, no queues, no fuss! Shop Bot, a helpful retail robot with a digital shopping basket, explained. 'AI cameras tracked every item you picked up and automatically charged your account as you left. Welcome to the future of shopping!'",
    main_lesson: "AI is transforming how we shop, both online and in physical stores! Amazon Go stores use cameras and computer vision to track every item customers pick up, eliminating checkouts entirely. Online, AI personalises your shopping feed based on past purchases and browsing history. AI chatbots answer customer queries 24/7. Virtual try-on technology lets you see how clothes would look on you using augmented reality and AI. Smart inventory systems use AI to predict which products will sell out and automatically reorder stock. Even delivery is being transformed — AI routes delivery drivers and, in some cities, packages are delivered by autonomous drones or robots.",
    fun_facts: ["Amazon Go's cashierless stores use over 400 cameras per store controlled by AI!", "Online shoppers who receive AI personalised product recommendations spend 40% more per visit."],
    examples: [{ type: "activity", content: "Look at your last 5 online purchases or search terms. What would an AI recommend you buy next? Try to predict its recommendation — then check what a real shopping site suggests!" }]
  },
  26: {
    topic_number: 26,
    title: "Social Media AI – Curating Your Feed",
    introduction: "Every time Zara opened her social media app, she saw exactly the kind of posts she loved — friends she cared about, topics that fascinated her, funny videos that made her laugh. But how? Feed Flow, a robot made of scrolling tiles and notification badges, explained. 'I analyse your every like, share, comment, and view — and I use that to build the perfect feed just for you. I know what you love before you do!'",
    main_lesson: "Social media platforms use incredibly sophisticated AI to decide what you see in your feed! The algorithm scores every piece of content based on how likely you are to engage with it — based on your past behaviour, who you interact with, and what similar users engage with. AI also moderates content at massive scale: identifying hate speech, misinformation, and spam across billions of posts per day (something no human team could do). AI detects bots and fake accounts. It also powers facial recognition in photo tagging and generates automatic captions. Understanding how these algorithms work helps us be smarter and safer online.",
    fun_facts: ["Facebook's AI reviews over 100 billion pieces of content for potential policy violations every single month!", "TikTok's recommendation AI can figure out your interests within just 30 seconds of you starting to scroll."],
    examples: [{ type: "activity", content: "Keep a log of the next 10 posts you see on any social media platform. Why do you think the algorithm showed you each one? Was it from someone you interact with often? A topic you searched recently? Try to guess the AI's logic!" }]
  },
  27: {
    topic_number: 27,
    title: "AI Ethics – Using AI Responsibly",
    introduction: "The Young Explorers gathered in a great hall for an important debate. 'AI can do amazing things,' said Maya, 'but who decides how it should be used?' Ethics Echo, a wise robot with scales of justice for hands and a thoughtful, glowing expression, stepped forward. 'That question is the most important one in all of AI,' Echo said solemnly. 'Power without wisdom is dangerous. Let's explore the ethics of AI together.'",
    main_lesson: "As AI becomes more powerful, the ethical questions around it become more important! Key ethical principles in AI include: Fairness (AI must not discriminate against people based on race, gender, or background — early facial recognition systems were shown to be less accurate for darker skin tones, which is a real harm), Transparency (we should be able to understand why an AI made a decision), Privacy (AI systems that collect data must protect it carefully), Accountability (when an AI makes a mistake, who is responsible?), and Safety (AI systems that control cars, planes, or medical equipment must be rigorously tested). Many governments and organisations are now writing laws to ensure AI is developed and used responsibly.",
    fun_facts: ["The EU's AI Act is the world's first comprehensive law regulating AI — it came into force in 2024!", "Over 100 countries now have national AI ethics guidelines or strategies."],
    examples: [{ type: "activity", content: "Think of 3 AI applications you use (or would like to use). For each one, identify one potential ethical risk: Could it be unfair? Could it invade privacy? Could it be hacked? What rules would you put in place to prevent harm?" }]
  },
  28: {
    topic_number: 28,
    title: "Smart Manufacturing – AI in the Factory",
    introduction: "The factory floor hummed with perfect precision. Robot arms welded, assembled, and tested products at lightning speed — never tiring, never making a mistake. Factory Foreman, a sturdy industrial robot with welding gear and a digital display showing live production stats, stepped forward. 'AI has transformed manufacturing!' he said. 'We produce more, with less waste, in safer conditions than ever before in history.'",
    main_lesson: "Smart Manufacturing uses AI, robotics, and data to make factories more efficient and products of higher quality. AI-powered quality control cameras inspect every product coming off a production line and can spot defects that would be invisible to the human eye. Predictive maintenance AI monitors factory machines — analysing vibrations, temperatures, and sounds to predict when a machine will break down before it actually does, scheduling maintenance before it causes costly downtime. AI optimises the supply chain, ensuring raw materials arrive exactly when needed. The 'smart factory' of the future will be highly automated, highly efficient, and produce significantly less waste.",
    fun_facts: ["BMW's AI quality inspection systems check 100% of car parts — over 100,000 checks per vehicle!", "Predictive maintenance AI saves manufacturing companies an average of $1.5 billion per year."],
    examples: [{ type: "activity", content: "Think about building something — like making sandwiches for a whole school. How would you organise it for maximum speed and minimum waste? Plan the assembly line. Now imagine AI optimising every step of your plan!" }]
  },
  29: {
    topic_number: 29,
    title: "Cybersecurity – AI Defending the Digital World",
    introduction: "The digital city was under attack! Thousands of invisible hackers were probing its defences, looking for a way in. But standing guard was Cyber Shield, a sleek security robot with a glowing force-field for armour and a radar system scanning every incoming connection. 'I never sleep, I never blink, and I can see threats forming before they even arrive,' Cyber Shield said. 'The digital world is my battlefield.'",
    main_lesson: "Cybersecurity AI is the invisible guardian of the internet! Every day, billions of cyber attacks — viruses, phishing emails, ransomware, hacking attempts — target computers, phones, banks, hospitals, and governments around the world. Traditional security could only block known threats. AI security systems learn normal behaviour patterns for a network and detect any anomalies that could signal an attack — even brand-new threats never seen before. AI can automatically isolate an infected computer before a virus spreads. It analyses billions of emails to spot phishing attempts with 99.9% accuracy. As hackers use AI to attack, defenders use AI to protect — it's the world's most important invisible arms race.",
    fun_facts: ["There are over 450,000 new malicious programs (malware) detected every single day!", "AI cybersecurity systems can detect and respond to a cyber attack in under 1 millisecond."],
    examples: [{ type: "activity", content: "Think about how you protect your own digital life: passwords, app permissions, what you share online. Which of these protections could an AI automate? Which ones still need a human to decide?" }]
  },
  30: {
    topic_number: 30,
    title: "Smart Photography – AI Behind Your Camera",
    introduction: "Lena took the perfect photo — her subject was crisp and clear, the background was beautifully blurred, and the lighting was immaculate. But she had no professional camera — just her phone. Snap Lens, a robot with a camera for a head and a rainbow display of filter options, appeared. 'Your phone's camera is powered by AI magic!' Snap said. 'Portrait mode, night mode, auto-focus, scene recognition — all powered by the AI brain inside your phone!'",
    main_lesson: "Modern smartphone cameras are AI photography studios in your pocket! AI analyses every scene through the lens in real time: recognising faces (to ensure sharp focus), detecting low light (to reduce noise and brighten the image), identifying scenes (beach, food, pet, night sky) and automatically adjusting settings for each. Portrait mode uses AI to separate subjects from backgrounds and apply beautiful blur. Super-resolution AI can enhance a blurry image to make it sharp. AI can remove unwanted objects from photos and replace them with a realistic background. Video stabilisation AI smooths out shaky footage in real time. Professional photographers now use AI tools to edit, sort, and enhance thousands of images in minutes.",
    fun_facts: ["Google Pixel's Night Sight mode takes up to 15 photos in a fraction of a second and AI merges them into one bright, sharp image!", "Adobe's AI Firefly can remove any object from a photo and fill in the background realistically in seconds."],
    examples: [{ type: "activity", content: "Take 5 photos on your phone in different settings: indoors, outdoors, portrait, food, and night. Notice how the camera automatically changes what it does for each scene. That's AI scene recognition in action!" }]
  },
  31: {
    topic_number: 31,
    title: "AI in Food & Nutrition – Eating Smarter",
    introduction: "Chef Chip, a culinary robot with a digital recipe book and a nose for nutrients, stood in the AI-powered kitchen. 'What should I eat today?' asked Danny. 'Great question!' said Chef Chip, scanning Danny's health data. 'Based on your activity level today, your nutritional goals, and what's in your fridge, I'd recommend a protein-rich dinner with extra iron. And I have the perfect recipe ready for you in 30 minutes!'",
    main_lesson: "AI is revolutionising how we think about food and nutrition! Nutrition AI apps can analyse a photo of your meal and estimate its calories, protein, carbs, and vitamins in seconds. AI systems track your dietary patterns and flag nutritional gaps — perhaps you haven't had enough vitamin C this week. Food companies use AI to create new flavours and healthier recipes by simulating how ingredients combine. AI is helping food scientists develop plant-based meat alternatives that taste and feel like real meat. Supermarkets use AI to predict which fresh produce will expire soon and discount it automatically, reducing food waste by up to 30%.",
    fun_facts: ["AI nutrition apps can identify a food and estimate its nutritional content from a photo with over 90% accuracy!", "IBM's AI Chef can suggest creative new recipes by analysing millions of flavour compounds and ingredient combinations."],
    examples: [{ type: "activity", content: "Photograph your next meal (or draw it!). Try to list: the main protein, carbohydrate, fat, and one vitamin or mineral it contains. This is exactly what a nutrition AI does — breaking down what you eat into its nutritional components!" }]
  },
  32: {
    topic_number: 32,
    title: "AI in Fashion – Designing the Future",
    introduction: "The runway was alive with cutting-edge fashion — bold prints, perfect fits, sustainable fabrics. But behind every garment was an AI design partner. Style Star, a robot draped in a digital fabric of swirling patterns, took a bow. 'Fashion meets technology!' Style Star declared. 'I can design new collections, predict next season's trends, suggest outfits based on your wardrobe, and even create clothing that's made to fit you perfectly.'",
    main_lesson: "AI is transforming the entire fashion industry from design to delivery! AI trend forecasting analyses social media, runway shows, and sales data to predict what colours, styles, and materials will be popular next season — helping brands make smarter production decisions and less waste. AI design tools can generate hundreds of unique pattern and garment designs in minutes. Virtual try-on technology lets shoppers see how clothes will look on their body shape without trying them on. AI analyses returns data to identify which sizes and fits customers find most comfortable, improving future designs. Sustainability AI helps brands optimise fabric use, reduce water consumption in dyeing, and create circular fashion systems.",
    fun_facts: ["H&M uses AI to analyse local store sales data and tailor stock for each individual store — reducing unsold inventory by 20%!", "Stitch Fix's AI stylist has created over 2 million unique style profiles for its customers."],
    examples: [{ type: "activity", content: "Look at your wardrobe. Which colours, patterns, and styles do you wear most often? Which items do you never wear? An AI would spot exactly these patterns and recommend future purchases (or warn you not to buy things you'll regret!)" }]
  },
  33: {
    topic_number: 33,
    title: "AI in Movies – The Digital Director",
    introduction: "The movie was breathtaking — spectacular battles, lifelike digital characters, and special effects that seemed completely real. But many of the most impressive scenes weren't filmed at all: they were created entirely by AI. Director Digi, a robot holding a clapperboard and surrounded by holographic film reels, appeared. 'AI is reinventing Hollywood!' Digi said. 'From scriptwriting to visual effects to personalised streaming recommendations — AI is everywhere in the movies you love!'",
    main_lesson: "AI is transforming filmmaking in extraordinary ways! Visual Effects (VFX) studios use AI to create realistic digital characters, de-age actors, remove wires and rigs, and generate entire crowd scenes with thousands of unique individuals. AI can now create convincing lip-sync when dialogue is dubbed into other languages, making films feel native in every language. Script analysis AI reads thousands of screenplays to predict box office success and suggest story improvements. AI tools help editors sort through hundreds of hours of footage to find the best takes. Deepfake technology (AI-generated video of real people) is both a creative tool and an ethical challenge the industry is actively addressing.",
    fun_facts: ["The de-aging technology used in The Irishman and other films is powered entirely by AI face-replacement algorithms!", "Netflix uses AI to personalise the thumbnail artwork shown on your screen — different users see different images for the same film."],
    examples: [{ type: "activity", content: "Watch a 5-minute clip from a film with big special effects. Try to spot: what's a real person, what's a digital character, what's a digital background. It's getting harder to tell, isn't it? That's AI visual effects!" }]
  },
  34: {
    topic_number: 34,
    title: "Deep Learning – AI's Deepest Power",
    introduction: "'What makes modern AI so much smarter than old computers?' asked Marco. Deep Diver, a robot with glowing layered circuits visible through a transparent chest panel, appeared. 'The secret is deep learning!' Deep Diver said, his layers lighting up one by one. 'Just as your brain has many layers of neurons, I have many layers of digital neurons — each one learning more complex patterns than the last. Together, we can understand almost anything!'",
    main_lesson: "Deep Learning is a powerful subset of machine learning that uses neural networks with many layers (hence 'deep'). Shallow networks might learn simple patterns; deep networks learn incredibly complex ones. A deep learning image recognition network's first layers might detect edges and colours, middle layers detect shapes and textures, and deep layers recognise specific objects like faces or cars. Deep learning is the technology behind every major AI breakthrough of the past decade: image recognition, voice assistants, language models (like the one powering ChatGPT), AlphaGo, self-driving cars, and medical diagnosis AI. It requires enormous amounts of data and computational power — but it achieves accuracy that was previously thought impossible.",
    fun_facts: ["Google's deep learning image recognition system can identify over 10,000 object categories with 95%+ accuracy!", "DeepMind's AlphaFold deep learning system solved the 50-year-old 'protein folding problem' — a breakthrough that could transform medicine."],
    examples: [{ type: "activity", content: "Peel an onion — count the layers. Deep learning neural networks work like onion layers: each layer processes the data more deeply than the last. Can you imagine what each 'layer' of a dog-recognition AI might be learning?" }]
  },
  35: {
    topic_number: 35,
    title: "AI Chatbots – Conversations With Machines",
    introduction: "'I've been chatting with this customer service bot for 10 minutes and I forgot it wasn't a real person!' laughed Olivia, astonished. Chat Chase, a friendly robot with a speech bubble for a head and multiple conversation threads scrolling across his screen, introduced himself. 'Modern chatbots powered by large language models can hold natural, helpful conversations!' Chase explained. 'We're available 24/7, in every language, on every topic — and we never get tired or grumpy!'",
    main_lesson: "AI Chatbots have evolved enormously! Early chatbots followed simple rules — if the user says X, reply with Y. Modern chatbots powered by Large Language Models (LLMs) like GPT-4 can have fluid, contextual conversations on almost any topic. They're used for customer service (handling millions of enquiries so human agents can focus on complex problems), in healthcare (offering mental health support and medical information), in education (acting as personalised tutors), and as personal productivity assistants. The most advanced chatbots can understand context across a long conversation, write code, summarise documents, and generate creative writing. They do sometimes 'hallucinate' (make up incorrect information) — so it's always important to verify critical information from other sources.",
    fun_facts: ["ChatGPT reached 100 million users in just 2 months — the fastest-growing app in history!", "AI chatbots now handle over 85% of customer service interactions for many large companies."],
    examples: [{ type: "activity", content: "Have a short conversation with an AI chatbot (like ChatGPT or Google Gemini — with a parent's help if needed). Ask it something factual, something creative, and something personal. How does it handle each one differently?" }]
  },
  36: {
    topic_number: 36,
    title: "Emergency Services – AI That Saves Lives",
    introduction: "The emergency call centre was the heartbeat of the city. Every second counted. Response Ranger, a robot in paramedic colours with a built-in radar and real-time city map, monitored everything. 'Every minute of delay in an emergency can cost a life,' Ranger said urgently. 'AI is helping us respond faster, smarter, and more effectively — directing ambulances, predicting fires, and even triaging patients before they arrive at hospital.'",
    main_lesson: "AI is transforming emergency services and potentially saving millions of lives! AI dispatch systems analyse 999 calls and automatically assign the closest available ambulance, fire truck, or police car — optimising routes in real time around traffic. AI can listen to emergency calls and detect signs of stress or medical urgency to prioritise responses. Predictive policing AI analyses crime data to identify high-risk areas before crimes occur. Fire prediction AI uses weather, vegetation, and historical data to predict where wildfires are likely to start. Hospital AI systems predict patient deterioration hours before a medical emergency, so staff can intervene early. AI-powered drones can deliver defibrillators to cardiac arrest patients within minutes.",
    fun_facts: ["AI dispatch systems have reduced ambulance response times by up to 3 minutes on average — which can be life-saving for heart attacks and strokes!", "In Denmark, an AI system analyses emergency calls and identifies cardiac arrests with 93% accuracy, automatically alerting nearby trained bystanders."],
    examples: [{ type: "activity", content: "Map your local area (or draw a simple grid). Place 3 emergency incidents and 3 ambulance stations. Try to decide which ambulance should respond to each incident to minimise travel time. Now imagine AI doing this for an entire city, instantly!" }]
  },
  37: {
    topic_number: 37,
    title: "Digital Archaeology – Uncovering Ancient Secrets",
    introduction: "Deep beneath the ground lay the ruins of a 3,000-year-old city — buried, shattered, and forgotten. But from satellite imagery and ground-penetrating radar scans, AI was already mapping its streets. Digi Dug, a robot archaeologist with a digital trowel and ancient scroll display, looked up from his work. 'AI is helping us solve the greatest mysteries of human history!' Dug said excitedly. 'We can find lost cities, read faded ancient texts, and reconstruct broken artefacts — all without touching a single stone!'",
    main_lesson: "Digital Archaeology combines AI with cutting-edge technology to explore human history in revolutionary ways! AI analyses satellite and drone imagery to spot patterns in the landscape that indicate buried structures — roads, walls, plazas — invisible to the naked eye. Ground-penetrating radar scans beneath the earth and AI interprets the results to create 3D maps of buried ruins. AI can read ancient, damaged texts that human scholars struggle to decipher — including scrolls burned in the eruption of Vesuvius that have been sealed for 2,000 years. 3D scanning and AI reconstruction can digitally rebuild broken sculptures and mosaics. AI is helping archaeologists process and catalogue millions of artefacts in museum archives that have never been studied.",
    fun_facts: ["AI discovered over 300 new ancient lines in the famous Nazca region of Peru in 2020 — lines that had been invisible to archaeologists for decades!", "The Vesuvius Challenge used AI to read 2,000-year-old carbonised scrolls from Herculaneum — unlocking ancient text that hasn't been read since 79 AD."],
    examples: [{ type: "activity", content: "Find an old, blurry photograph. Try to identify every object, person, and location in it — note how hard some details are to see. Now imagine AI doing this for thousands of ancient artefact photos, identifying objects, dates, and cultural origins automatically!" }]
  }
};

// Quiz questions for all 37 topics
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export const ALL_QUIZZES: Record<number, QuizQuestion[]> = {
  1: [
    { question: "What is Computer Vision?", options: ["Teaching computers to hear sounds", "Teaching computers to see and understand images", "Teaching computers to taste food", "Teaching computers to smell flowers"], answer: "Teaching computers to see and understand images" },
    { question: "True or False: Computer Vision can help identify objects in photos.", options: ["True", "False"], answer: "True" },
    { question: "Which of these uses Computer Vision?", options: ["Face recognition on your phone", "Playing music", "Sending text messages", "Charging your phone"], answer: "Face recognition on your phone" }
  ],
  2: [
    { question: "What does Speech Recognition do?", options: ["Helps computers see pictures", "Helps computers understand spoken words", "Helps computers smell things", "Helps computers move around"], answer: "Helps computers understand spoken words" },
    { question: "True or False: Speech Recognition turns sound waves into text.", options: ["True", "False"], answer: "True" },
    { question: "Which device commonly uses Speech Recognition?", options: ["Smart speakers", "Pencils", "Shoes", "Books"], answer: "Smart speakers" }
  ],
  3: [
    { question: "What does AI Translation do?", options: ["Translates words between different languages", "Translates music into colours", "Translates pictures into sounds", "Translates numbers into letters"], answer: "Translates words between different languages" },
    { question: "True or False: AI Translation can help people from different countries communicate.", options: ["True", "False"], answer: "True" },
    { question: "How many languages can Google Translate work with?", options: ["About 10 languages", "About 50 languages", "Over 100 languages", "Only 2 languages"], answer: "Over 100 languages" }
  ],
  4: [
    { question: "What does AI use to make decisions?", options: ["Data and logic", "Guessing and luck", "Asking a human for every choice", "Random selections"], answer: "Data and logic" },
    { question: "True or False: AI can make decisions much faster than humans.", options: ["True", "False"], answer: "True" },
    { question: "What is a 'decision tree' in AI?", options: ["A program that grows plants", "A series of yes/no questions that lead to different outcomes", "A chart of random guesses", "A type of database"], answer: "A series of yes/no questions that lead to different outcomes" }
  ],
  5: [
    { question: "How does Heal-o-Bot help doctors?", options: ["By finding health problems in medical scans", "By performing surgeries solo", "By taking patients' temperatures", "By prescribing medicine without a doctor"], answer: "By finding health problems in medical scans" },
    { question: "What makes AI good at medical diagnosis?", options: ["It can analyse millions of medical images very fast", "It has a better memory than any human", "It never needs to sleep", "All of the above"], answer: "All of the above" },
    { question: "True or False: AI can detect diseases in medical scans.", options: ["True", "False"], answer: "True" }
  ],
  6: [
    { question: "What is the main role of AI in video games?", options: ["To create smart opponents and realistic characters", "To make the graphics look prettier", "To speed up the game loading time", "To fix bugs in the game code"], answer: "To create smart opponents and realistic characters" },
    { question: "True or False: AI in games can learn how you play and change its strategy.", options: ["True", "False"], answer: "True" },
    { question: "What game did an AI first beat world champion humans at?", options: ["Chess", "Football", "Basketball", "Tennis"], answer: "Chess" }
  ],
  7: [
    { question: "What helps self-driving cars 'see' the world?", options: ["Cameras and sensors like LIDAR", "Special headlights", "A human driver watching through a screen", "Magic mirrors"], answer: "Cameras and sensors like LIDAR" },
    { question: "How does AI make self-driving cars safer?", options: ["It can see in every direction and reacts very fast", "It never gets tired or distracted", "It follows traffic rules perfectly", "All of the above"], answer: "All of the above" },
    { question: "True or False: Self-driving cars can react faster than human drivers.", options: ["True", "False"], answer: "True" }
  ],
  8: [
    { question: "How does AI help in space?", options: ["It cooks food for astronauts", "It guides rovers and satellites safely", "It builds extra stars", "It paints the moon red"], answer: "It guides rovers and satellites safely" },
    { question: "What is the name of the rover that uses AI to drive on Mars?", options: ["Speedy", "Perseverance", "Moonwalker", "Spacebus"], answer: "Perseverance" },
    { question: "Why can't humans remotely control a Mars rover in real time?", options: ["The rover has no controls", "Radio signals take too long to travel between Earth and Mars", "Mars has no signal coverage", "The rover is too fast"], answer: "Radio signals take too long to travel between Earth and Mars" }
  ],
  9: [
    { question: "What are Neural Networks?", options: ["A type of computer screen", "A way for computers to learn patterns like a brain", "A network of wires under the ocean", "A game about spiders"], answer: "A way for computers to learn patterns like a brain" },
    { question: "True or False: Neural Networks are inspired by the human brain.", options: ["True", "False"], answer: "True" },
    { question: "What do the layers in a neural network do?", options: ["They store files", "Each layer learns increasingly complex patterns", "They display images", "They control the power"], answer: "Each layer learns increasingly complex patterns" }
  ],
  10: [
    { question: "How can AI help the environment?", options: ["By tracking rare animals and protecting them", "By building more concrete buildings", "By turning off the sun", "By making the oceans salty"], answer: "By tracking rare animals and protecting them" },
    { question: "True or False: AI can detect if forests are in danger.", options: ["True", "False"], answer: "True" },
    { question: "What does AI use to spot illegal deforestation?", options: ["Weather reports", "Satellite and drone images", "Human scouts", "Sound sensors only"], answer: "Satellite and drone images" }
  ],
  11: [
    { question: "What is Machine Learning?", options: ["Programming a computer with exact rules for everything", "Letting computers find patterns and learn from data", "Teaching humans to use machines", "Building physical robots"], answer: "Letting computers find patterns and learn from data" },
    { question: "Which type of learning uses labelled examples?", options: ["Reinforcement Learning", "Unsupervised Learning", "Supervised Learning", "Random Learning"], answer: "Supervised Learning" },
    { question: "True or False: Netflix uses Machine Learning to recommend what to watch.", options: ["True", "False"], answer: "True" }
  ],
  12: [
    { question: "What does NLP stand for?", options: ["Network Learning Protocol", "Natural Language Processing", "New Logic Programming", "Neural Link Protocol"], answer: "Natural Language Processing" },
    { question: "Which of these is an example of NLP?", options: ["Controlling a robot arm", "A chatbot answering your questions", "A camera taking photos", "A car's GPS"], answer: "A chatbot answering your questions" },
    { question: "True or False: AI can automatically detect if a review is positive or negative.", options: ["True", "False"], answer: "True" }
  ],
  13: [
    { question: "What three fields does Robotics combine?", options: ["Art, music, and dance", "Mechanical engineering, electronics, and AI", "Chemistry, biology, and physics", "History, geography, and language"], answer: "Mechanical engineering, electronics, and AI" },
    { question: "True or False: Modern robots are used in hospitals to help surgeons.", options: ["True", "False"], answer: "True" },
    { question: "What are actuators in a robot?", options: ["The robot's power source", "Parts that allow the robot to move or act in the world", "The robot's memory chips", "The robot's camera sensors"], answer: "Parts that allow the robot to move or act in the world" }
  ],
  14: [
    { question: "What do recommendation systems do?", options: ["Fix broken computers", "Predict what content or products you will enjoy", "Build social media profiles", "Create new programming languages"], answer: "Predict what content or products you will enjoy" },
    { question: "True or False: Spotify's AI creates personalised playlists for users.", options: ["True", "False"], answer: "True" },
    { question: "What percentage of Amazon sales come from its recommendations?", options: ["5%", "15%", "35%", "75%"], answer: "35%" }
  ],
  15: [
    { question: "What does facial recognition identify?", options: ["The colour of your clothes", "Your unique facial features to verify your identity", "Your height and weight", "The language you speak"], answer: "Your unique facial features to verify your identity" },
    { question: "True or False: Your phone's Face ID uses facial recognition.", options: ["True", "False"], answer: "True" },
    { question: "What is a potential ethical concern with facial recognition?", options: ["It uses too much battery", "It can be biased and less accurate for some groups of people", "It takes too many photos", "It makes phones too expensive"], answer: "It can be biased and less accurate for some groups of people" }
  ],
  16: [
    { question: "Which technologies does a virtual assistant combine?", options: ["Only speech recognition", "Speech recognition, NLP, and text-to-speech", "Computer vision and robotics", "GPS and mapping"], answer: "Speech recognition, NLP, and text-to-speech" },
    { question: "True or False: Siri, Alexa, and Google Assistant are all virtual assistants.", options: ["True", "False"], answer: "True" },
    { question: "What can virtual assistants do?", options: ["Only set alarms", "Only play music", "Answer questions, set reminders, control smart home devices, and more", "Only make phone calls"], answer: "Answer questions, set reminders, control smart home devices, and more" }
  ],
  17: [
    { question: "What can AI art generators create?", options: ["Only text documents", "Images and artwork from text descriptions", "Only music", "Only videos"], answer: "Images and artwork from text descriptions" },
    { question: "True or False: An AI-generated artwork was sold for over $400,000 at auction.", options: ["True", "False"], answer: "True" },
    { question: "What is an 'AI art prompt'?", options: ["A code command", "A text description you give to an AI to tell it what image to create", "A type of paintbrush", "A camera setting"], answer: "A text description you give to an AI to tell it what image to create" }
  ],
  18: [
    { question: "What can Music AI systems do?", options: ["Only play existing songs", "Compose original music in any genre from a text prompt", "Only record live music", "Only adjust volume levels"], answer: "Compose original music in any genre from a text prompt" },
    { question: "True or False: AI has been used to co-write pop songs.", options: ["True", "False"], answer: "True" },
    { question: "How is AI used in film music?", options: ["AI cannot be used in film music", "Creating adaptive background music that changes with scenes", "Only choosing which songs to license", "Replacing all human musicians"], answer: "Creating adaptive background music that changes with scenes" }
  ],
  19: [
    { question: "How does AI help athletes?", options: ["By playing in their place", "By tracking movements and analysing performance data", "By choosing their diet randomly", "By scheduling their social media"], answer: "By tracking movements and analysing performance data" },
    { question: "True or False: AI can help predict sports injuries before they happen.", options: ["True", "False"], answer: "True" },
    { question: "What is VAR in football?", options: ["Video Assistant Referee — an AI system for accurate match decisions", "A type of penalty kick", "A football scoring system", "A team formation"], answer: "Video Assistant Referee — an AI system for accurate match decisions" }
  ],
  20: [
    { question: "How does AI help farmers?", options: ["By replacing farmers entirely", "By analysing crop health, soil data, and weather to optimise farming", "By only predicting rain", "By choosing food prices"], answer: "By analysing crop health, soil data, and weather to optimise farming" },
    { question: "True or False: AI-powered precision agriculture can significantly reduce water usage.", options: ["True", "False"], answer: "True" },
    { question: "What do agricultural drones with AI do?", options: ["Deliver food to shops", "Scan fields to detect plant health and needs", "Plant seeds manually", "Only spray chemicals"], answer: "Scan fields to detect plant health and needs" }
  ],
  21: [
    { question: "How has AI improved weather forecasting?", options: ["By guessing based on past seasons", "By analysing huge amounts of data to produce faster and more accurate forecasts", "By only reading cloud shapes", "By copying human meteorologists"], answer: "By analysing huge amounts of data to produce faster and more accurate forecasts" },
    { question: "True or False: AI weather systems can produce a 10-day global forecast in under a minute.", options: ["True", "False"], answer: "True" },
    { question: "Why is early weather prediction so important?", options: ["It helps people choose outfits", "It gives communities time to prepare for dangerous storms and floods", "It saves electricity", "It helps TV stations plan their schedules"], answer: "It gives communities time to prepare for dangerous storms and floods" }
  ],
  22: [
    { question: "What does adaptive learning AI do?", options: ["Sets homework for the whole class equally", "Personalises lessons to each student's pace, strengths, and needs", "Only teaches maths", "Replaces all teachers"], answer: "Personalises lessons to each student's pace, strengths, and needs" },
    { question: "True or False: AI tutoring systems can help students learn faster.", options: ["True", "False"], answer: "True" },
    { question: "How does Duolingo use AI?", options: ["Only for translation", "To personalise language lessons for hundreds of millions of learners", "To grade essays", "To schedule classes"], answer: "To personalise language lessons for hundreds of millions of learners" }
  ],
  23: [
    { question: "How does AI improve traffic flow in cities?", options: ["By removing traffic lights", "By adjusting traffic light timing in real time based on actual traffic", "By building more roads automatically", "By reducing the number of cars allowed"], answer: "By adjusting traffic light timing in real time based on actual traffic" },
    { question: "True or False: AI traffic systems can give emergency vehicles priority green lights automatically.", options: ["True", "False"], answer: "True" },
    { question: "By how much did AI traffic management reduce travel time in Pittsburgh?", options: ["5%", "10%", "25%", "50%"], answer: "25%" }
  ],
  24: [
    { question: "How does AI protect your bank account?", options: ["By hiding your money in a vault", "By detecting unusual transactions that don't match your normal behaviour", "By limiting what you can spend", "By reporting all transactions to the government"], answer: "By detecting unusual transactions that don't match your normal behaviour" },
    { question: "True or False: Visa's AI can process tens of thousands of transactions per second.", options: ["True", "False"], answer: "True" },
    { question: "What might trigger an AI fraud alert?", options: ["Buying the same item twice", "A purchase made in a foreign country while you're at home", "Spending under your usual amount", "Using contactless payment"], answer: "A purchase made in a foreign country while you're at home" }
  ],
  25: [
    { question: "What technology do Amazon Go stores use to eliminate checkouts?", options: ["Self-scanning barcode guns", "AI cameras that track every item customers pick up", "Staff watching on CCTV", "Automatic trolleys"], answer: "AI cameras that track every item customers pick up" },
    { question: "True or False: AI personalises online shopping feeds based on your past purchases.", options: ["True", "False"], answer: "True" },
    { question: "How does virtual try-on technology work?", options: ["You physically try clothes in a store", "AI uses your image to show how clothes would look on you", "You watch a model wearing the clothes", "AI picks clothes randomly"], answer: "AI uses your image to show how clothes would look on you" }
  ],
  26: [
    { question: "What does a social media algorithm decide?", options: ["Who can create a social media account", "What content you see in your feed based on your behaviour", "The price of social media services", "What time you can use the platform"], answer: "What content you see in your feed based on your behaviour" },
    { question: "True or False: AI is used to detect spam and hate speech on social media.", options: ["True", "False"], answer: "True" },
    { question: "How quickly can TikTok's AI determine your interests?", options: ["After 1 hour of use", "Within 30 seconds of scrolling", "After a week", "It never truly knows"], answer: "Within 30 seconds of scrolling" }
  ],
  27: [
    { question: "Which of these is a key principle of AI ethics?", options: ["Making AI as fast as possible", "Ensuring AI is fair and doesn't discriminate", "Making AI available only to rich countries", "Keeping AI systems secret"], answer: "Ensuring AI is fair and doesn't discriminate" },
    { question: "True or False: The EU's AI Act is the world's first comprehensive law regulating AI.", options: ["True", "False"], answer: "True" },
    { question: "What does 'AI transparency' mean?", options: ["Making AI invisible", "Being able to understand why an AI made a decision", "Making AI systems free to use", "Publishing all AI code online"], answer: "Being able to understand why an AI made a decision" }
  ],
  28: [
    { question: "What does predictive maintenance AI do?", options: ["Predicts the weather in factories", "Monitors machines to predict breakdowns before they happen", "Automatically fires lazy workers", "Designs new machines"], answer: "Monitors machines to predict breakdowns before they happen" },
    { question: "True or False: AI quality control can inspect 100% of products on a production line.", options: ["True", "False"], answer: "True" },
    { question: "What does a 'smart factory' produce compared to a traditional factory?", options: ["Less product but more expensive", "More product, with less waste, in safer conditions", "Only luxury goods", "The exact same output"], answer: "More product, with less waste, in safer conditions" }
  ],
  29: [
    { question: "How does AI cybersecurity differ from traditional security?", options: ["It only protects physical buildings", "It can detect brand-new threats by spotting unusual behaviour patterns", "It works more slowly than traditional methods", "It requires more human analysts"], answer: "It can detect brand-new threats by spotting unusual behaviour patterns" },
    { question: "True or False: AI cybersecurity can respond to attacks in under a millisecond.", options: ["True", "False"], answer: "True" },
    { question: "Approximately how many new malicious programs are detected every day?", options: ["About 100", "About 10,000", "Over 450,000", "Over 10 million"], answer: "Over 450,000" }
  ],
  30: [
    { question: "What does AI portrait mode on a smartphone do?", options: ["Makes portraits look older", "Separates the subject from the background and applies a blur effect", "Only works in daylight", "Adds cartoon filters"], answer: "Separates the subject from the background and applies a blur effect" },
    { question: "True or False: AI can enhance a blurry photo to make it sharper.", options: ["True", "False"], answer: "True" },
    { question: "What is scene recognition in smartphone cameras?", options: ["Identifying famous landmarks only", "AI detecting what's being photographed to automatically adjust camera settings", "A manual setting chosen by the user", "A filter for professional cameras only"], answer: "AI detecting what's being photographed to automatically adjust camera settings" }
  ],
  31: [
    { question: "What can nutrition AI apps do?", options: ["Cook your food automatically", "Analyse a photo of your meal and estimate its nutritional content", "Order groceries for you", "Only count calories if you manually enter them"], answer: "Analyse a photo of your meal and estimate its nutritional content" },
    { question: "True or False: AI is helping food scientists develop plant-based meat alternatives.", options: ["True", "False"], answer: "True" },
    { question: "How does AI help reduce food waste in supermarkets?", options: ["By stopping people from buying too much", "By predicting which produce will expire soon and discounting it automatically", "By only selling frozen food", "By reducing portion sizes"], answer: "By predicting which produce will expire soon and discounting it automatically" }
  ],
  32: [
    { question: "How does AI trend forecasting help fashion brands?", options: ["By designing clothes automatically without human input", "By predicting future popular styles to make smarter production decisions", "By forcing people to buy certain clothes", "By copying competitor designs"], answer: "By predicting future popular styles to make smarter production decisions" },
    { question: "True or False: AI virtual try-on technology lets shoppers see how clothes look on their body.", options: ["True", "False"], answer: "True" },
    { question: "How does AI help make fashion more sustainable?", options: ["By banning the use of certain fabrics", "By optimising fabric use and reducing production waste", "By making clothes last forever", "By only producing black and white clothing"], answer: "By optimising fabric use and reducing production waste" }
  ],
  33: [
    { question: "How does AI help create movie special effects?", options: ["By replacing all human actors", "By generating realistic digital characters, de-ageing actors, and creating crowd scenes", "By writing the entire script automatically", "By choosing what music to use"], answer: "By generating realistic digital characters, de-ageing actors, and creating crowd scenes" },
    { question: "True or False: Netflix uses AI to personalise the thumbnail image you see for each film.", options: ["True", "False"], answer: "True" },
    { question: "What is 'deepfake' technology?", options: ["A type of underwater camera", "AI-generated video that realistically replaces a person's face or voice", "A very deep zoom lens", "A type of film editing technique"], answer: "AI-generated video that realistically replaces a person's face or voice" }
  ],
  34: [
    { question: "What makes Deep Learning 'deep'?", options: ["It only works underground", "It uses neural networks with many layers to learn complex patterns", "It requires deep sea computers", "It is slow and methodical"], answer: "It uses neural networks with many layers to learn complex patterns" },
    { question: "True or False: Deep Learning was the technology behind AlphaGo beating world champion players.", options: ["True", "False"], answer: "True" },
    { question: "What problem did DeepMind's AlphaFold solve?", options: ["How to build faster rockets", "The protein folding problem — predicting 3D shapes of proteins from their sequence", "How to make better batteries", "How to cure all diseases instantly"], answer: "The protein folding problem — predicting 3D shapes of proteins from their sequence" }
  ],
  35: [
    { question: "How do modern AI chatbots differ from early rule-based chatbots?", options: ["They can only answer yes/no questions", "They use Large Language Models to have fluid, contextual conversations on almost any topic", "They are less helpful than early chatbots", "They can only speak one language"], answer: "They use Large Language Models to have fluid, contextual conversations on almost any topic" },
    { question: "True or False: ChatGPT reached 100 million users faster than any other app in history.", options: ["True", "False"], answer: "True" },
    { question: "What does it mean when an AI chatbot 'hallucinates'?", options: ["It sees images in its data", "It generates incorrect or made-up information as if it were true", "It becomes confused and shuts down", "It speaks in a foreign language"], answer: "It generates incorrect or made-up information as if it were true" }
  ],
  36: [
    { question: "How does AI improve emergency dispatch systems?", options: ["By replacing all emergency operators", "By automatically assigning the closest vehicle and optimising routes in real time", "By predicting emergencies only", "By prioritising non-urgent calls first"], answer: "By automatically assigning the closest vehicle and optimising routes in real time" },
    { question: "True or False: AI can predict wildfires before they start.", options: ["True", "False"], answer: "True" },
    { question: "How much can AI dispatch systems reduce ambulance response times?", options: ["By a few seconds only", "By up to 3 minutes on average", "By exactly 1 hour", "Response times don't change"], answer: "By up to 3 minutes on average" }
  ],
  37: [
    { question: "How does AI help archaeologists find buried ancient ruins?", options: ["By digging faster", "By analysing satellite and drone images to spot patterns indicating buried structures", "By reading ancient texts only", "By interviewing local people"], answer: "By analysing satellite and drone images to spot patterns indicating buried structures" },
    { question: "True or False: AI helped discover over 300 new ancient lines in the Nazca region of Peru.", options: ["True", "False"], answer: "True" },
    { question: "What ancient text did the Vesuvius Challenge AI help read?", options: ["Egyptian hieroglyphics", "2,000-year-old carbonised scrolls from Herculaneum that hadn't been read since 79 AD", "Medieval manuscripts from the Middle Ages", "Ancient Greek stone carvings"], answer: "2,000-year-old carbonised scrolls from Herculaneum that hadn't been read since 79 AD" }
  ]
};
