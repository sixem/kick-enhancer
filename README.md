<div align="center">
  <img width="128" src="logo.png" alt="Kick Enhancer logo" />
  <h1>Kick Enhancer</h1>
  <p>A userscript that makes KICK cleaner and puts useful viewing information back in sight.</p>
</div>

## Features

- Unhide viewer counts that **KICK** hides.
- Show stream uptime without visiting the stream.
- Remove unwanted discovery sections, including recommended channels and channels you might "like".
- Hide live gambling streams from followed channels.
- Hide auto-playing front page streams to avoid bloat and noise.
- Customizable chat settings (size, spacing, weight, fonts etc.).
- A download manager for downloading clips directly _without_ watermark.

## Installation

1. Install a userscript manager for your browser.
2. Open [Install Kick Enhancer](https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist/kick-enhancer.user.js).
3. Install it when prompted, or import the code manually into your userscript manager.
4. Open or reload [Kick](https://kick.com/) and look for the **K+** button in the top-right to get started.

## Development

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
```

Production builds are written to `dist/kick-enhancer.user.js`.
