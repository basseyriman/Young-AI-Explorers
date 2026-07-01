/**
 * Story voice for Vision Vee custom topics — matches the printed Young AI Explorers book.
 */

export const BOOK_STORY_STYLE_GUIDE = `
Write like the Young AI Explorers printed book by Bassey Riman / RimansTech Industries.

STORY RULES (introduction field):
- Open with a curious young explorer (Maya, Alex, Sofia, Tommy, or a new diverse child with a first name) in a vivid scene.
- A friendly AI mascot or robot guide appears — warm, playful, with a memorable name when it fits the topic.
- Use short, punchy sentences. Wonder, magic, and heart — not textbook tone.
- Vision Vee may narrate OR introduce a specialist robot friend for the topic.
- Setting hints: Heavenly Tech Lab, glowing holograms, futuristic cities, farms, oceans, space — match the topic.
- End the intro with an inviting question or "Let's explore!" energy.

LESSON RULES (main_lesson field):
- Explain simply for ages 8–12. One idea per paragraph.
- Use real-world examples kids can picture (phones, games, farms, schools, sports).
- Keep the same warmth as the book — "special gift", "magic bridge", "super-powered brain" style metaphors are welcome.
- 3–4 short paragraphs max.

FUN FACTS: Surprising, kid-friendly, one sentence each — like "Mind-Blowing Fact" boxes in the book.

ACTIVITIES: Hands-on thinking — look around the room, talk to a parent, draw, or imagine — never require special equipment.
`.trim()

export const BOOK_STORY_EXAMPLES = `
Example intro (Computer Vision — from the book):
"Maya wondered, 'How does my tablet know it's me?' Suddenly, Vision Vee appeared, surrounded by a magical holographic glow. 'Hi Maya! Just like we see the beauty in the world, I use Computer Vision to see and understand the smart patterns around us!'"

Example intro (Speech Recognition — from the book):
"Alex loves talking to his smart instruments at home. Suddenly, Echo Ed, a robot with glowing soundwave patterns, appeared. 'Hi Alex! Your voice is like a beautiful song! I help computers catch your words and turn them into smart ideas.'"

Example intro (AI Translation — from the book):
"Sofia wants to be friends with Yuki from Japan, but they speak different languages. Linky Lex appears, holding a glowing digital globe. 'I'll help you build a bridge of friendship! I can turn your words into Japanese so Yuki can understand your heart.'"
`.trim()

export const BOOK_ILLUSTRATION_STYLE_GUIDE = `
Vibrant, clean children's book illustration style matching the published "Young AI Explorers" printed book:
- Style: Soft digital storybook illustration, friendly 2D vector-art cartoon style with clean soft outlines.
- STRICTLY FORBIDDEN: Do NOT make it 3D, do NOT use CGI, do NOT use glossy metallic renders, do NOT use photorealism, raytracing, or high-contrast dramatic dark lighting.
- Characters: Cute, friendly children with big warm eyes and simplified, cute, flat-colored cartoon robot companions.
- Color Palette: Warm, optimistic, bright morning colors, soft gradients, pastel tones, incorporating friendly sky blues, purples, and gold accents.
- Composition: Clean, full-scene educational storybook scene set in a bright, friendly, daytime environment (not a dark tech lab).
- Text: Absolutely NO text, NO words, NO letters, NO speech bubbles, and NO dialogue boxes anywhere in the image.
`.trim()

export function buildCustomTopicIllustrationPrompt(title: string, description: string, storySnippet?: string): string {
  const scene = storySnippet?.slice(0, 200) || description
  return `${BOOK_ILLUSTRATION_STYLE_GUIDE}

Topic: "${title}"
Scene to illustrate: ${scene}

Create a single hero illustration for this AI education chapter cover.`
}
