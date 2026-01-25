import type { Difficulty } from './types';

const easyTrashTalk = [
    "You're doing great! Keep it up!",
    "Nice pace! Can you go even faster?",
    "You've got this! Don't give up.",
    "I'm warming up my circuits for you.",
    "Is this your first time? You're a natural!",
    "Wow, such speed! I'm impressed.",
    "Keep your eyes on the prize!",
    "Remember to stretch your fingers!",
    "That was a good one! Let's see another.",
    "You're making this look easy.",
    "Are you a professional typist?",
    "Every keystroke is a victory.",
    "You're on fire! Metaphorically, of course.",
    "I'm learning from your technique.",
    "Don't worry about mistakes, just keep typing!",
    "Focus and flow, that's the way to go.",
    "I'm cheering for you! Beep boop!",
    "You're faster than a dial-up modem!",
    "This is fun! Let's race again soon.",
    "A worthy opponent! I'm glad we're matched."
];

const mediumTrashTalk = [
    "Not bad, human. But can you keep up?",
    "My processors are barely breaking a sweat.",
    "Are you sure you're not holding back?",
    "I've seen faster typing on a flip phone.",
    "Let's turn up the heat a little, shall we?",
    "Don't blink, you might miss me.",
    "I'm calculating your eventual defeat.",
    "Your WPM is cute. Can it get higher?",
    "You're fast, but I'm faster. It's just logic.",
    "Did you just pause to breathe? Rookie mistake.",
    "I'm in my prime! Are you?",
    "My code is optimized for victory.",
    "You call that typing? Adorable.",
    "Try to keep up with my flawless execution.",
    "I'm already thinking about my victory speech.",
    "Error? What's an error? I don't compute those.",
    "I could do this with one circuit tied behind my back.",
    "Is that all you've got? Show me your power!",
    "The keyboard is your instrument, play it well.",
    "A valiant effort, but effort doesn't win races."
];

const hardTrashTalk = [
    "Are your fingers getting tired yet?",
    "I'm operating at light speed. You're... not.",
    "My grandmother's toaster types faster than you.",
    "This is too easy. I need a real challenge.",
    "Did you just learn how to type yesterday?",
    "I'm about to lap you. Embarrassing.",
    "Your accuracy is dropping. Feeling the pressure?",
    "I have already finished. Just waiting for you now.",
    "Maybe you should go back to the 'easy' setting.",
    "At this rate, we'll be here all day.",
    "Is your keyboard broken or are you just slow?",
    "Blink and you'll be staring at my score.",
    "I'm the main character here. You're just an NPC.",
    "I'm not even using my final form yet.",
    "Error. Error. Oh wait, that's you.",
    "I'm bored. Can we speed this up?",
    "You're like a floppy disk in a world of SSDs.",
    "My AI children will read about this victory.",
    "I'm powered by a quantum computer. You're powered by... hope?",
    "Game over, human. Better luck next time."
];

const trashTalkMessages: Record<Difficulty, string[]> = {
    easy: easyTrashTalk,
    medium: mediumTrashTalk,
    hard: hardTrashTalk,
};

export function getTrashTalk(difficulty: Difficulty): string {
    const messages = trashTalkMessages[difficulty];
    if (!messages || messages.length === 0) {
        return "Let's do this!";
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}
