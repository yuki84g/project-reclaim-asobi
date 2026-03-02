# PROJECT RECLAIM: $ASBI Launch Kit

This repository contains all the assets and strategy documents required to launch the `$ASBI` token and the "PROJECT RECLAIM" initiative.

## 📁 Directory Structure

- `docs/sns_strategy.md`: The complete 18-day SNS operation strategy, including daily post templates for X (Y), X (Rin), and YouTube, hashtag strategies, iStep automation flows, and sniper bot countermeasures.
- `lp/`: The cinematic landing page for `$ASBI`.
  - `lp/index.html`: The fully self-contained HTML file using Tailwind CSS.
  - `lp/assets/`: Contains generated cinematic images (e.g., the dark studio manifesto image).

## 🚀 How to Deploy the Landing Page

The landing page (`lp/index.html`) is designed to be easily deployable on any modern static hosting platform like Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel (Recommended)
1. Navigate to [Vercel](https://vercel.com/) and create a new project.
2. Link your Git repository containing this folder, or use the Vercel CLI.
3. If using Vercel CLI, open your terminal, navigate to the `lp` directory, and run:
   ```bash
   npx vercel
   ```
4. Follow the prompts. No special build configuration is required because the project uses a CDN for Tailwind CSS. The Root Directory should be set to `lp` if deploying from the root of this repository.

### Updating Smart Contract Details
Before the official launch (Day 18), make sure to update the following in `lp/index.html`:
- Replace the placeholder social links in the footer with the actual X and Telegram URLs.
- Update the "Buy $ASBI on Raydium" link with the actual Raydium pair URL.

## 📱 Executing the SNS Strategy

Please refer to `docs/sns_strategy.md` for the day-by-day playbook.
- **Day 1 - Day 7:** Focus purely on storytelling and emotional engagement from the `Y` account. Do not mention the token.
- **Day 8 - Day 12:** Introduce the AI anime and the concept of "Reclaim".
- **Day 13 - Day 18:** Shift to Web3/Crypto audiences, announce `$ASBI`, and prepare for the Solana DEX launch.
