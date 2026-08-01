<div align="center">
  <img width="128" src="logo.png" alt="KICK Enhancer logo" />
  <h1>KICK Enhancer</h1>
  <p>A userscript that makes KICK cleaner and puts useful viewing information back in sight.</p>
</div>

## Features

- Unhide viewer counts that **KICK** hides.
- Show stream uptime without visiting the stream.
- Remove unwanted discovery sections, including recommended channels and channels you might "like".
- Hide live gambling streams from followed channels.
- Hide auto-playing front page streams to avoid bloat and noise.
- Customizable chat settings (size, spacing, weight, fonts etc.).
- Chat statistics (messages per minute, active chatters, socket latency etc.)
- A download manager for downloading clips directly _without_ watermark.

## Installation

1. Install a userscript manager for your browser.
2. Open [KICK Enhancer on Greasy Fork](https://greasyfork.org/en/scripts/589209-kick-enhancer).
3. Click **Install this script** and approve the installation.
4. Open or reload [KICK](https://kick.com/) and look for the **K+** button in the top-right to get started.

Greasy Fork is the recommended installation method and provides automatic updates.
If you prefer to install directly from GitHub, open the
[KICK Enhancer userscript](https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist/kick-enhancer.user.js)
and approve the installation when prompted, or import the code manually into your userscript manager.

## Development

```sh
pnpm install
pnpm dev
pnpm format
pnpm check
pnpm build
```

Production builds are written to: `./dist/kick-enhancer.user.js`.
