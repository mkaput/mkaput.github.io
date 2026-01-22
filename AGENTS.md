# murek.dev

This is a personal website of Marek Kaput.
Stack: Bun, Astro, TailwindCSS, GitHub Pages; KISS.

## Rules

- you may be running in parallel with other agents; cooperate to avoid
  conflicts but avoid commiting changes made by others
- we target the latest Chrome and latest Safari / iOS Safari
- if changing some part of the website, make sure changes work by inspecting
  them in a browser (use `chrome-devtools` mcp)
- use `ios-simulator` skill when tasked to debug website on iOS; just open
  http://localhost:4321 in Safari inside the simulator and do inspections

## Tools

- usually `bun run dev` is already running in background and listening on
  http://localhost:4321
- all scripts are defined in `package.json`

## Git

- only commit what has changed in the current thread, don't commit parallel
  agent's work
- short, imperative commit titles (e.g., "add game server S3 bucket")
- detailed commit descriptions telling:
  - context behind the changes: what, how and why,
  - manual testing steps,
  - special considerations.
- if commit is meant to fix an issue, add `fix #123` at the end of the commit
  message.
