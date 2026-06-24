-- Seed Data for Young AI Explorers (37 Topics)


-- Lesson 1
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (1, 'Computer Vision - Teaching Computers to See', 'Deep inside the glowing Heavenly Tech Lab, Maya discovered something amazing. ''How does my tablet know it''s me?'' she wondered. Suddenly, Vision Vee appeared, surrounded by a magical holographic glow. ''Hi Maya!'' Vee said warmly. ''Just like we see the beauty in the world, I use Computer Vision to see and understand the smart patterns around us! Want to join my adventure?'' Maya smiled, ready to see the world through AI eyes.', 'Computer Vision is a special gift for computers! It teaches them to see and understand the wonderful world, just like our eyes and hearts work together to recognize the people we love.', '[{"type":"activity","content":"Let''s play ''Spot the Difference''! Look at these two pictures and click on the differences you can find. This is exactly what computer vision does - it compares images and finds patterns and differences to understand what it''s looking at."}]'::jsonb, '["Did you know that your smartphone camera takes about 1 billion calculations every second just to focus on your face when taking a selfie? That''s faster than you can blink!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 1), '[{"question":"What is Computer Vision?","options":["Teaching computers to hear sounds","Teaching computers to see and understand images","Teaching computers to taste food","Teaching computers to smell flowers"],"answer":"Teaching computers to see and understand images"},{"question":"True or False: Computer Vision can help identify objects in photos.","options":["True","False"],"answer":"True"},{"question":"Which of these uses Computer Vision?","options":["Face recognition on your phone","Playing music","Sending text messages","Charging your phone"],"answer":"Face recognition on your phone"}]'::jsonb);

-- Lesson 2
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (2, 'Speech Recognition - Teaching Computers to Listen', 'Alex loves talking to his smart instruments at home. Suddenly, Echo Ed, a robot with glowing soundwave patterns like a digital ripple on a pond, appears. ''Hi Alex!'' Echo Ed explains with a smile. ''Your voice is like a beautiful song! I help computers catch your words and turn them into smart ideas. It''s like being a detective for the invisible music of talk!''', 'Speech Recognition helps computers listen with their hearts! It turns the sound of our voices into words that help the AI understand how it can help us best.', '[{"type":"activity","content":"Let''s practice with sound patterns! Clap your hands in different rhythms and see if you can match the sound waves on screen. This is exactly how computers learn to recognize your voice."}]'::jsonb, '["The first speech recognition system was created in 1952 and could only understand the numbers 0-9, but today''s systems can understand millions of words in hundreds of languages!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 2), '[{"question":"What does Speech Recognition do?","options":["Helps computers see pictures","Helps computers understand spoken words","Helps computers smell things","Helps computers move around"],"answer":"Helps computers understand spoken words"},{"question":"True or False: Speech Recognition turns sound waves into text.","options":["True","False"],"answer":"True"},{"question":"Which device commonly uses Speech Recognition?","options":["Smart speakers","Pencils","Shoes","Books"],"answer":"Smart speakers"}]'::jsonb);

-- Lesson 3
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (3, 'AI Translation - Breaking Language Barriers', 'Sofia wants to be friends with Yuki from Japan, but they speak different languages. Suddenly, Linky Lex appears, holding a glowing digital globe. ''I''ll help you build a bridge of friendship!'' Lex says. ''I know the rules of many languages and can turn your words into Japanese so Yuki can understand your heart. It''s like a magic bridge of kindness!'' Yuki''s face lights up as they start sharing stories.', 'AI Translation is like a magic bridge! It helps children from all over the world understand each other, turning different languages into the same message of friendship.', '[{"type":"activity","content":"Match the Greetings! Connect the greeting words from around the world with their meanings. Drag and drop to build your own bridge of friendship - just like AI translation does!"}]'::jsonb, '["Google Translate can translate between over 100 languages and processes more than 500 million translation requests every single day - that''s like translating a library of books every minute!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 3), '[{"question":"What does AI Translation do?","options":["Translates words between different languages","Translates music into colors","Translates pictures into sounds","Translates numbers into letters"],"answer":"Translates words between different languages"},{"question":"True or False: AI Translation can help people from different countries communicate.","options":["True","False"],"answer":"True"},{"question":"How many languages can Google Translate work with?","options":["About 10 languages","About 50 languages","Over 100 languages","Only 2 languages"],"answer":"Over 100 languages"}]'::jsonb);

-- Lesson 4
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (4, 'AI Decision Making - Smart Choices', 'Tommy is playing a game where a character has to find treasure in a maze. The character is controlled by AI! Tommy wonders how it knows where to go. Logic Leo, a robot mentor with glowing gear eyes and a floating map, appears. ''I''ll show you!'' Logic Leo says. ''Just like you think about your choices, I look at all the paths and pick the best one using rules. It''s like having a super-powered brain for puzzles!''', 'AI Decision Making is when computers learn to make smart choices by looking at different options and picking the best one based on rules and past experiences.', '[{"type":"activity","content":"Play a game of ''AI Logic''! Think of a task and see how many steps you can break it down into, just like an AI would."}]'::jsonb, '["AI can make over a billion decisions in just one second!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 4), '[{"question":"What does AI use to make decisions?","options":["Data and logic","Guessing and luck","Asking a human for every choice","Random selections"],"answer":"Data and logic"},{"question":"True or False: AI can make decisions much faster than humans.","options":["True","False"],"answer":"True"}]'::jsonb);

-- Lesson 5
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (5, 'AI in Healthcare - Helping Doctors Help You', 'Heal-o-Bot is a caring AI who works in a state-of-the-art medical center! He helps doctors by looking at medical scans and identifying potential health issues very early. One morning, Heal-o-Bot noticed a tiny problem in an X-ray that was hard for even expert doctors to see. Because of Heal-o-Bot''s quick eye, the patient was treated right away and felt better soon! He explains that he''s trained on millions of medical images to recognize even the smallest signs of illness. ''By being a smart partner for doctors,'' Heal-o-Bot says gently, ''I help keep everyone healthy and happy!''', 'AI assists doctors in diagnosing illnesses and finding treatments faster and more accurately.', '[{"type":"activity","content":"Learn about how AI can help track your sleep and activity to keep you fit!"}]'::jsonb, '["Some AI can predict a heart problem days before it even happens!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 5), '[{"question":"How does Heal-o-Bot help doctors?","options":["By finding health problems in medical scans","By performing surgeries solo","By taking patients'' temperatures","By prescribing medicine without a doctor"],"answer":"By finding health problems in medical scans"},{"question":"What makes AI good at medical diagnosis?","options":["It can analyze millions of medical images very fast","It has a better memory than any human","It never needs to sleep","All of the above"],"answer":"All of the above"}]'::jsonb);

-- Lesson 6
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (6, 'AI in Games - Your Smart Playing Partner', 'Game Gus is an incredible AI who loves playing video games! He lives inside your favorite games as a smart opponent or a helpful teammate. Whether he''s playing soccer or a racing game, Gus learns how you play and adapts to keep the game fun and challenging. ''If I''m too easy, you''ll get bored,'' Gus says with a playful wink, ''but if I''m too hard, you''ll get frustrated. I find the perfect balance so we always have a great time!'' He explains that AI makes game characters feel alive and makes every play instance unique.', 'AI creates challenging opponents and realistic characters in video games to make them more fun.', '[{"type":"activity","content":"Play a game against an AI opponent! Pay attention to how it reacts to your moves."}]'::jsonb, '["AI can now beat the world''s best players at complex games like Chess and Go!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 6), '[{"question":"What is the main role of AI in video games?","options":["To create smart opponents and realistic characters","To make the graphics look prettier","To speed up the game loading time","To fix bugs in the game code"],"answer":"To create smart opponents and realistic characters"},{"question":"True or False: AI can learn how you play and change its strategy.","options":["True","False"],"answer":"True"}]'::jsonb);

-- Lesson 7
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (7, 'Self-Driving Cars - Cars That Drive Themselves', 'Drive Dash is a futuristic self-driving car powered by advanced AI! Dash has special ''eyes'' called LIDAR and cameras that see everything around him for blocks. While driving through a busy city street, Dash safely stopped for a crossing puppy and navigated around a construction site. ''I can see in every direction at once,'' Dash says with a hum, ''and I never get distracted or tired!'' He explains that AI helps cars understand traffic signs, other vehicles, and pedestrians to keep everyone on the road safe.', 'AI enables cars to navigate safely and drive autonomously, reducing accidents and traffic.', '[{"type":"activity","content":"Watch a video about how self-driving cars ''see'' the world around them!"}]'::jsonb, '["Self-driving cars can react much faster than any human driver can!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 7), '[{"question":"What helps self-driving cars ''see'' the world?","options":["Cameras and sensors like LIDAR","Special headlights","A human driver watching through a screen","Magic mirrors"],"answer":"Cameras and sensors like LIDAR"},{"question":"How does AI make self-driving cars safer?","options":["It can see in every direction and reacts very fast","It never gets tired or distracted","It follows traffic rules perfectly","All of the above"],"answer":"All of the above"}]'::jsonb);

-- Lesson 8
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (8, 'AI in Space Exploration - To the Stars!', 'High above our world, the silent stars were calling. Maya and Alex looked through a giant telescope and saw something moving fast—it was a smart Mars Rover! Suddenly, Astro Ace appeared in a brilliant suit of stardust. ''Greetings, fellow explorers!'' Ace said. ''I use AI to navigate across distant planets, helping rovers find water and special rocks. I''m like a super-navigator for the universe!''', 'AI helps us explore the unknown! It guides space rovers and satellites to stay safe and send back amazing secrets from the deepest parts of space.', '[{"type":"activity","content":"Help Astro Ace land the rover! Click the ''Thrust'' button at the right time to guide the rover safely onto the red planet. This is how AI makes quick decisions to land spaceships."}]'::jsonb, '["AI controllers on the Mars Perseverance Rover can plan their own path around dangerous rocks without waiting for humans to tell them what to do!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 8), '[{"question":"How does AI help in space?","options":["It cooks food for astronauts","It guides rovers and satellites safely","It builds extra stars","It paints the moon red"],"answer":"It guides rovers and satellites safely"},{"question":"What is the name of the rover that uses AI to drive on Mars?","options":["Speedy","Perseverance","Moonwalker","Spacebus"],"answer":"Perseverance"}]'::jsonb);

-- Lesson 9
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (9, 'Neural Networks - How AI Learns', 'Maya wondered, ''How does a robot actually think?'' Suddenly, Layer Leo appeared, surrounded by glowing lines that looked like a digital web. ''Think of me like a team of friends!'' Leo explained. ''My Neural Network has many layers. Each layer learns a small part of a puzzle, and when they work together, they can recognize anything—like a cat, a car, or even your favorite song!''', 'Neural Networks are like a brain for AI! They use many layers of ''digital neurons'' to learn patterns from information, just like your brain learns new things every day.', '[{"type":"activity","content":"Connect the dots! Draw lines between the glowing circles to help the information travel through the network layers. This is how AI processes data!"}]'::jsonb, '["Digital neural networks were inspired by the way the billions of neurons in your own human brain work together to help you think and feel!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 9), '[{"question":"What are Neural Networks?","options":["A type of computer screen","A way for computers to learn patterns like a brain","A network of wires under the ocean","A game about spiders"],"answer":"A way for computers to learn patterns like a brain"},{"question":"True or False: Neural Networks are inspired by the human brain.","options":["True","False"],"answer":"True"}]'::jsonb);

-- Lesson 10
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (10, 'AI & Planet Earth - Protecting Our Home', 'The forest was whispering, and Maya and Alex wanted to help. Green Gaia, a robot with leaf-green patterns and a heartbeat like a soft drum, appeared. ''I use AI to listen to the Earth!'' Gaia said. ''I can detect when trees are in danger or track rare animals to keep them safe. I help humans be better guardians of our beautiful planet.''', 'AI helps protect nature! By analyzing weather and tracking wildlife, it gives us the smart tools we need to keep the world healthy and green for everyone.', '[{"type":"activity","content":"Protect the animals! Move the AI sensor to track the movement of a family of elephants through the jungle. This helps scientists protect them from danger."}]'::jsonb, '["Some AI systems can listen to the sounds of the ocean and identify the ''songs'' of different whales from thousands of miles away!"]'::jsonb, '[]'::jsonb, '[]'::jsonb);

INSERT INTO quizzes (lesson_id, questions)
VALUES ((SELECT id FROM lessons WHERE topic_number = 10), '[{"question":"How can AI help the environment?","options":["By tracking rare animals and protecting them","By building more concrete buildings","By turning off the sun","By making the oceans salty"],"answer":"By tracking rare animals and protecting them"},{"question":"True or False: AI can detect if forests are in danger.","options":["True","False"],"answer":"True"}]'::jsonb);

-- Lesson 11
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (11, 'Machine Learning', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Machine Learning!', 'Content for Machine Learning is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 12
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (12, 'Natural Language Processing', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Natural Language Processing!', 'Content for Natural Language Processing is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 13
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (13, 'Robotics', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Robotics!', 'Content for Robotics is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 14
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (14, 'Recommendation Systems', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Recommendation Systems!', 'Content for Recommendation Systems is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 15
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (15, 'Facial Recognition', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Facial Recognition!', 'Content for Facial Recognition is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 16
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (16, 'Virtual Assistants', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Virtual Assistants!', 'Content for Virtual Assistants is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 17
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (17, 'AI in Art', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Art!', 'Content for AI in Art is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 18
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (18, 'AI in Music', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Music!', 'Content for AI in Music is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 19
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (19, 'AI in Sports', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Sports!', 'Content for AI in Sports is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 20
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (20, 'AI in Agriculture', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Agriculture!', 'Content for AI in Agriculture is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 21
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (21, 'Weather Prediction', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Weather Prediction!', 'Content for Weather Prediction is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 22
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (22, 'AI in Education', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Education!', 'Content for AI in Education is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 23
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (23, 'Smart Traffic', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Smart Traffic!', 'Content for Smart Traffic is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 24
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (24, 'Secure Banking', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Secure Banking!', 'Content for Secure Banking is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 25
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (25, 'Smart Shopping', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Smart Shopping!', 'Content for Smart Shopping is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 26
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (26, 'Social Media AI', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Social Media AI!', 'Content for Social Media AI is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 27
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (27, 'AI Ethics', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI Ethics!', 'Content for AI Ethics is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 28
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (28, 'Smart Manufacturing', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Smart Manufacturing!', 'Content for Smart Manufacturing is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 29
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (29, 'Cybersecurity', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Cybersecurity!', 'Content for Cybersecurity is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 30
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (30, 'Smart Photography', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Smart Photography!', 'Content for Smart Photography is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 31
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (31, 'AI in Food & Nutrition', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Food & Nutrition!', 'Content for AI in Food & Nutrition is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 32
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (32, 'AI in Fashion', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Fashion!', 'Content for AI in Fashion is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 33
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (33, 'AI in Movies', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI in Movies!', 'Content for AI in Movies is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 34
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (34, 'Deep Learning', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Deep Learning!', 'Content for Deep Learning is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 35
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (35, 'AI Chatbots', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of AI Chatbots!', 'Content for AI Chatbots is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 36
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (36, 'Emergency Services', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Emergency Services!', 'Content for Emergency Services is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);

-- Lesson 37
INSERT INTO lessons (topic_number, title, introduction, main_lesson, examples, fun_facts, did_you_know, key_takeaways)
VALUES (37, 'Digital Archaeology', 'This exciting chapter is currently locked. Keep exploring to unlock the secrets of Digital Archaeology!', 'Content for Digital Archaeology is coming soon to the Young AI Explorers platform!', '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb);
