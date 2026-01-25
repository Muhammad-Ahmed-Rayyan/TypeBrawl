// More paragraphs for AI mode to reduce repetition
export const paragraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence is a classic pangram, which means it contains every letter of the alphabet. It's often used for testing typewriters and keyboards, as well as for typography samples. Learning to type it quickly and accurately is a great exercise for any aspiring typist. The flow of the letters challenges both hands.",
  "Exploring the vast, open ocean is a dream for many. The sheer scale of it can be both intimidating and inspiring. Marine biologists spend their lives studying the incredible diversity of life beneath the waves, from microscopic plankton to the majestic blue whale. Every dive reveals new secrets and deepens our respect for this vital ecosystem. The pressure at great depths is immense.",
  "Technology has revolutionized the way we live and work. From the invention of the wheel to the rise of artificial intelligence, human ingenuity continues to push the boundaries of what is possible. The internet connects billions of people worldwide, allowing for instant communication and access to information on an unprecedented scale. What future innovations will shape our world next?",
  "Cooking is an art form that engages all the senses. The sizzle of onions in a hot pan, the vibrant colors of fresh vegetables, and the aromatic blend of herbs and spices all contribute to the experience. A well-prepared meal not only provides nourishment but also brings people together, creating lasting memories around the dinner table. Every culture has its own unique culinary traditions.",
  "The world of finance can be complex, with its own jargon and intricate systems. Understanding concepts like compound interest, asset allocation, and market volatility is crucial for making informed investment decisions. Financial literacy empowers individuals to build wealth and achieve their long-term goals, whether it's saving for retirement, buying a home, or funding an education.",
  "Cybersecurity is a critical field in our increasingly digital world. Protecting sensitive data from unauthorized access is a constant battle against evolving threats. Experts use a variety of tools and techniques, including encryption, firewalls, and intrusion detection systems, to safeguard networks and information. A single vulnerability can have far-reaching consequences.",
  "The study of astronomy is the study of celestial objects, space, and the physical universe as a whole. From ancient civilizations gazing at the stars to modern telescopes peering into distant galaxies, humanity has always been fascinated by the cosmos. Each new discovery, like the detection of gravitational waves, opens up new avenues for research and deepens our understanding of our place in the universe.",
  "Music has a profound effect on the human brain, influencing everything from mood to memory. It's a universal language that transcends cultural barriers. Whether it's the complex structure of a classical symphony or the simple melody of a folk song, music has the power to evoke strong emotions and connect people. Neuroscientists are still uncovering the secrets of how our brains process musical patterns.",
  "Climate change is one of the most pressing issues of our time. The rising global temperatures, caused by the increase of greenhouse gases in the atmosphere, are leading to more extreme weather events, melting ice caps, and rising sea levels. Addressing this challenge requires a concerted global effort to transition to renewable energy sources and adopt more sustainable practices in all aspects of life.",
  "The art of storytelling is as old as humanity itself. Through stories, we share knowledge, pass down traditions, and make sense of the world around us. A good story can transport us to another time and place, allowing us to experience different perspectives and empathize with characters unlike ourselves. From epic poems to modern novels, storytelling remains a fundamental part of the human experience.",
  "Urban planning shapes the functionality and feel of our cities. Good design can foster community, improve public health, and create economic opportunities. It involves balancing the needs of residents, businesses, and the environment. Walkable neighborhoods with green spaces and efficient public transit are becoming the gold standard for modern urban development.",
  "The history of philosophy is a journey through the greatest minds of human history. From Socrates and Plato to Kant and Nietzsche, philosophers have grappled with the fundamental questions of existence, knowledge, values, reason, and mind. Their ideas continue to influence how we think about ethics, politics, and our own purpose in the world. It is a field of endless debate.",
  "Genetic engineering holds both immense promise and significant ethical dilemmas. The ability to edit DNA could lead to cures for inherited diseases and more resilient crops, but it also raises concerns about unforeseen consequences and the potential for misuse. Society must carefully navigate these waters, balancing scientific advancement with responsible oversight and public discourse.",
  "The psychology of motivation explores why we do what we do. Intrinsic motivation comes from within, driven by interest or enjoyment, while extrinsic motivation comes from external rewards like money or praise. Understanding these drivers is key to personal development, education, and effective management. What motivates you to perform at your best?",
  "Renewable energy is the future of our planet's power grid. Technologies like solar, wind, and geothermal offer a clean alternative to fossil fuels, helping to combat climate change. The transition requires massive investment in infrastructure and innovation to overcome challenges like energy storage and grid stability. It is a marathon, not a sprint, but one we must run.",
  "The concept of justice is a cornerstone of any civilized society. It encompasses fairness in the distribution of resources and the administration of law. Legal systems around the world strive to uphold justice, but they often fall short. The pursuit of a more just world is a continuous struggle that requires constant vigilance and reform from all citizens.",
  "Learning a new language opens up a new world of culture and communication. It challenges the brain, improves cognitive abilities, and fosters a greater appreciation for diversity. While it can be a difficult process, the rewards are immeasurable. Every conversation with a native speaker is a step towards fluency and a deeper connection with another part of the world.",
  "The human immune system is a remarkably complex network of cells and proteins that defends the body against infection. It can recognize and remember millions of different enemies, and it can produce a customized attack for each one. Sometimes, it can mistakenly attack the body itself, leading to autoimmune diseases. Scientists are still learning its secrets.",
  "Volcanoes are a powerful and awe-inspiring force of nature. They are openings in the Earth's crust that allow molten rock, ash, and gases to escape from below the surface. While their eruptions can be devastating, they also create new land and enrich the soil, making it incredibly fertile for agriculture. Living in the shadow of a volcano is a life of both risk and reward.",
  "Entrepreneurship is the engine of economic innovation. It's about identifying a need and creating a business to fill it. Successful entrepreneurs are often characterized by their resilience, creativity, and willingness to take calculated risks. They drive change, create jobs, and introduce new products and services that can change the way we live. The journey is often challenging."
];

// This function is still used as a fallback.
export function getRandomParagraph(): string {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}

const wordBank = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
    "is", "are", "was", "were", "has", "had", "does", "did", "said", "went", "goes", "seen", "made", "makes", "making", "taken", "took", "takes",

    "system", "program", "question", "work", "government", "company", "number", "night", "point", "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot", "right",
    "study", "book", "eye", "job", "word", "business", "issue", "side", "kind", "head", "house", "service", "friend", "father", "power", "hour", "game", "line", "end", "member",
    "law", "car", "city", "community", "name", "president", "team", "minute", "idea", "kid", "body", "information", "parent", "face", "others", "level", "office", "door", "health", "person",
    "art", "war", "history", "party", "result", "change", "morning", "reason", "research", "girl", "guy", "moment", "air", "teacher", "force", "education", "is",
    "very", "great", "real", "own", "early", "big", "small", "large", "long", "little", "important", "political", "bad", "white", "black", "huge", "different", "best", "wrong", "old",
    "high", "public", "human", "local", "sure", "private", "major", "better", "economic", "strong", "possible", "whole", "free", "military", "true", "federal", "international", "full", "special", "easy",
    "clear", "recent", "certain", "personal", "open", "red", "difficult", "available", "likely", "short", "single", "medical", "current", "wrong", "private", "past", "foreign", "fine", "common", "poor",
    "natural", "significant", "similar", "hot", "dead", "central", "happy", "serious", "huge", "ready", "simple", "left", "physical", "general", "environmental", "financial", "blue", "democratic", "dark", "various",
    "always", "never", "often", "sometimes", "usually", "rarely", "quickly", "slowly", "carefully", "easily", "finally", "exactly", "certainly", "probably", "possibly", "perhaps", "maybe", "truly", "really", "almost",

    "run", "move", "play", "live", "believe", "hold", "bring", "happen", "write", "provide", "sit", "stand", "lose", "pay", "meet", "include", "continue", "set", "learn", "change",
    "lead", "understand", "watch", "follow", "stop", "create", "speak", "read", "allow", "add", "spend", "grow", "open", "walk", "win", "offer", "remember", "love", "consider", "appear",
    "buy", "wait", "serve", "die", "send", "expect", "build", "stay", "fall", "cut", "reach", "kill", "remain", "suggest", "raise", "pass", "sell", "require", "report", "decide"
];

export function getLongParagraph(): string {
    const wordCount = 150;
    const words = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(wordBank[Math.floor(Math.random() * wordBank.length)]);
    }

    let paragraph = '';
    let sentenceLength = 0;
    const minSentenceLength = 5;
    const maxSentenceLength = 14;
    let nextSentenceLength = Math.floor(Math.random() * (maxSentenceLength - minSentenceLength + 1)) + minSentenceLength;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (sentenceLength === 0) {
            // Capitalize first word of sentence
            paragraph += word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            paragraph += word;
        }
        sentenceLength++;

        if (sentenceLength >= nextSentenceLength || i === words.length - 1) {
            paragraph += '. ';
            sentenceLength = 0;
            nextSentenceLength = Math.floor(Math.random() * (maxSentenceLength - minSentenceLength + 1)) + minSentenceLength;
        } else {
            // Add a comma sometimes
            if (Math.random() < 0.15 && sentenceLength > 3) {
                 paragraph += ', ';
            } else {
                 paragraph += ' ';
            }
        }
    }
    return paragraph.trim().replace(/\s\./g, '.').replace(/\s,/g, ',');
}
