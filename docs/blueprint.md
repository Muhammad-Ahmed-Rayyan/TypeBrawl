# **App Name**: TypeBrawl

## Core Features:

- Typing Engine: Display unlimited-length random text, capture user input, calculate WPM, accuracy, and highlight mistakes. Optimized for both desktop and mobile typing.
- AI Opponent: Simulate typing at adjustable WPM with animated progress, showing AI typing in real-time. Allows for 'cheating' behavior (slightly faster than user). Difficulty (easy, medium, hard) automatically sets the AI speed, with a 60-second timer on each difficulty.
- Trash Talk: AI trash talk tool powered by a LLM. The model decides on its own whether it's appropriate to trash talk.
- Leaderboard: Track scores in Firestore. Create three separate leaderboards, one per difficulty, that track username, WPM, accuracy, and timestamp. Ensure scores are added only to the leaderboard of the selected difficulty and displayed properly.
- Game UI: Clean, professional, readable interface for displaying the game, optimized for both desktop and mobile.

## Style Guidelines:

- Dark Theme: Background color: #0d1b2a for readability and modern feel.
- Dark Theme: Primary color: #1b263b for energy and futuristic vibe.
- Dark Theme: Accent color: #415a77 for contrast.
- Light Theme: Background color: White (#d5bdaf) for clean and bright feel.
- Light Theme: Primary color: #d6ccc2 for a calm and inviting vibe.
- Light Theme: Accent color: #edede9 to complement the blue and provide contrast.
- Body and headline font: 'Space Grotesk', sans-serif, for headlines; and 'Inter', sans-serif, for body.
- Code font: 'Source Code Pro' for any displayed code.
- Use clean, minimalist icons to represent different game functions and leaderboard elements.
- Side-by-side display for user and AI typing progress. Progress bars for visual feedback. Responsive layout for both desktop and mobile.
- Subtle animations for typing progress, trash talk messages, and leaderboard updates.