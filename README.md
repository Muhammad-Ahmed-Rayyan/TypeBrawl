# TypeBrawl

![TypeBrawl]([https://i.imgur.com/eQJt3sU.png](https://github.com/Muhammad-Ahmed-Rayyan/TypeBrawl/blob/main/src/app/typebrawllogo.png))

TypeBrawl is a modern and engaging typing game where you can test your speed and accuracy.
Challenge a dynamic AI opponent across three difficulty levels or enjoy a focused practice
session in a custom game mode. With a sleek interface, real-time performance tracking, and
endless replayability, TypeBrawl is the ultimate typing showdown.

This project was built using Firebase Studio.

------------------------------------------------------------

PROJECT OVERVIEW

TypeBrawl blends competitive typing practice with an AI-powered opponent that reacts to
your performance in real time. The game focuses on speed, accuracy, and consistency while
keeping the experience fun through trash talk, clean UI, and smooth animations.

------------------------------------------------------------

FEATURES

- AI Challenge Mode with Easy, Medium, and Hard difficulty levels
- Custom Practice Mode with selectable durations (15s, 30s, 60s)
- Real-time WPM and accuracy calculation
- Offline AI trash talk system with dynamic messages
- Dynamic paragraph generation to avoid repetition
- Local leaderboard for storing top scores
- Modern, responsive UI built with ShadCN/UI and Tailwind CSS
- Light and Dark mode with persistent user preference

------------------------------------------------------------

TECH STACK

Framework     : Next.js (App Router)
Language      : TypeScript
Styling       : Tailwind CSS
UI Components : ShadCN/UI
Icons         : Lucide React

------------------------------------------------------------

GETTING STARTED

PREREQUISITES

- Node.js (v18 or later recommended)
- npm or yarn

INSTALLATION

1. Clone the repository
   git clone https://github.com/Muhammad-Ahmed-Rayyan/TypeBrawl.git
   cd TypeBrawl

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

------------------------------------------------------------

PROJECT STRUCTURE

TypeBrawl/
│
├── .idx/
│   ├── dev.nix
│   └── icon.png
│
├── docs/
│   └── blueprint.md
│
├── src/
│   ├── ai/
│   │   ├── dev.ts
│   │   ├── genkit.ts
│   │   └── flows/
│   │       └── generate-trash-talk.ts
│   │
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── type-brawl-game.tsx
│   │   ├── typebrawllogo.png
│   │   └── leaderboard/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── game-summary-dialog.tsx
│   │   ├── leaderboard.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ui/
│   │       └── (ShadCN UI components)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── use-typing-game.ts
│   │
│   └── lib/
│       ├── placeholder-images.json
│       ├── placeholder-images.ts
│       ├── trashTalkMessages.ts
│       ├── types.ts
│       ├── utils.ts
│       └── words.ts
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md

------------------------------------------------------------

LICENSE

This project is open for educational and personal use.
