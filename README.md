<div align="center">

<table>
  <tr>
    <td>
      <img
        src="https://raw.githubusercontent.com/Muhammad-Ahmed-Rayyan/TypeBrawl/main/src/app/typebrawllogo.png"
        width="64"
      />
    </td>
    <td>
      <h1 style="margin:0; padding-left:10px;">TypeBrawl</h1>
    </td>
  </tr>
</table>
 
**Typing Race Against AI — Speed, Accuracy & Trash Talk**

![Last Commit](https://img.shields.io/github/last-commit/Muhammad-Ahmed-Rayyan/TypeBrawl)
![TypeScript](https://img.shields.io/badge/TypeScript-97.7%25-blue?logo=typescript)
![Languages](https://img.shields.io/github/languages/count/Muhammad-Ahmed-Rayyan/TypeBrawl)

<br>

Built with the tools and technologies:

![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338BDF8.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN/UI-black?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-%23FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=c1121f)

</div>

---

## 🧠 Project Summary

**TypeBrawl** is a modern, fast-paced typing game where players compete against a dynamic AI opponent that **types alongside you and trash-talks your performance in real time**.  

The project blends **speed typing**, **competitive gameplay**, and **personality-driven AI responses** to create an addictive typing experience — inspired by platforms like Monkeytype, but with attitude.

Players can challenge AI across difficulty levels or train solo using a focused practice mode, all within a sleek and responsive UI.

🔗 Check it out: [TypeBrawl](https://typebrawl.netlify.app)

---

## 🚀 Features

- 🤖 **AI Challenge Mode**
  - Compete against AI opponents on **Easy, Medium, and Hard** difficulty levels.
  - AI reacts dynamically to your typing speed and accuracy.

- 📝 **Custom Practice Mode**
  - Practice typing without pressure.
  - Choose time limits: **15s, 30s, or 60s**.

- 📊 **Real-Time Performance Tracking**
  - Live **WPM**, **accuracy**, and completion stats.

- 🗣️ **Offline AI Trash Talk**
  - AI roasts, mocks, or encourages you using a curated offline message library.
  - No API calls required — instant responses.

- 🔁 **Dynamic Paragraph Generation**
  - Custom mode generates virtually unlimited unique text from a large word bank.
  - AI mode uses shuffled paragraph pools to avoid repetition.

- 🏆 **Local Leaderboard**
  - Saves top scores per difficulty level.
  - Compare past performance locally.

- 🎨 **Modern UI & UX**
  - Clean, minimal interface using **ShadCN/UI** and **Tailwind CSS**.
  - Fully responsive for desktop and mobile.

- 🌗 **Light / Dark Mode**
  - Toggle themes with preference saved locally.

---

## 🔧 Setup & Installation

> Ensure **Node.js (v18 or later)** and **npm** are installed.

```bash
# Clone the repository
git clone https://github.com/Muhammad-Ahmed-Rayyan/TypeBrawl.git
cd TypeBrawl

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 🗃️ Project Structure

```bash
TypeBrawl/
├── .idx/
│   ├── dev.nix
│   └── icon.png
├── docs/
│   └── blueprint.md
├── src/
│   ├── ai/
│   │   ├── dev.ts
│   │   ├── genkit.ts
│   │   └── flows/
│   │       └── generate-trash-talk.ts
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── type-brawl-game.tsx
│   │   ├── typebrawllogo.png
│   │   └── leaderboard/
│   │       └── page.tsx
│   ├── components/
│   │   ├── game-summary-dialog.tsx
│   │   ├── leaderboard.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── use-typing-game.ts
│   └── lib/
│       ├── placeholder-images.json
│       ├── placeholder-images.ts
│       ├── trashTalkMessages.ts
│       ├── types.ts
│       ├── utils.ts
│       └── words.ts
├── .gitignore
├── .modified
├── apphosting.yaml
├── components.json
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
---

## 🔥 Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: ShadCN/UI
- Icons: Lucide React

---

<div align="center">

⭐ Enjoyed the project? Drop a star on GitHub!

</div>
