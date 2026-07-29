<div align="center">
  <img width="128" src="logo.png" alt="Kick Enhancer logo" />
  <h1>Kick Enhancer</h1>
  <p>A userscript that makes Kick cleaner and puts useful viewing information back in sight.</p>
</div>

## Features

- Show viewer counts that Kick hides.
- Show stream uptime without visiting the stream.
- Remove unwanted discovery sections, including recommended channels and channels you might "like".
- Hide gambling streams from streamers you follow.
- Hide autoplaying home page streams to avoid noise.
- Customizable chat settings (size, spacing, weight, fonts etc.).

## Installation

1. Install a userscript manager for your browser.
2. Open [Install Kick Enhancer](https://raw.githubusercontent.com/sixem/kick-enhancer/main/dist/kick-enhancer.user.js).
3. Install it when prompted, or save the linked file and import it manually.
4. Open or reload [Kick](https://kick.com/).

## Development

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
```

Production builds are written to `dist/kick-enhancer.user.js`.
