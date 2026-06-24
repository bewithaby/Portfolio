---
name: abhilash-portfolio
description: >
  Updates and maintains Abhilash Emmanuel's personal portfolio website (a
  dark "orchestration" themed static site: index.html + photography.html).
  Use this skill whenever the user wants to edit, update, extend, restyle,
  or deploy the portfolio. Triggers on phrases like "update my portfolio",
  "add a project to my site", "add a new photo / film", "change the
  portfolio colour", "edit the keyboard section", "add a section to my
  portfolio", "fix my portfolio", "swap in real images", or any request to
  modify the portfolio's HTML, sections, content, or styling. Always reads
  the relevant template in assets/ and references/editing-guide.md BEFORE
  editing, and preserves the existing design system unless told otherwise.
---

# Abhilash Emmanuel — Portfolio Maintainer

## Overview

This skill maintains Abhilash's personal portfolio: a self-contained,
dependency-light static site in the dark "orchestration" theme (ink-navy
background, amber accent, JetBrains Mono labels, Space Grotesk display).

It is two HTML files, each fully self-contained (CSS in `<style>`, JS in a
single `<script>` at the bottom, no build step, no frameworks):

- `assets/index.html` — the home page. Sections: hero (with an interactive
  A-Z keyboard + an "open to work" avatar), Recent projects (click-to-open
  modal), Where I've worked (timeline), AI films (YouTube embeds), The stack
  (animated skill chips), Through the lens (photo selection), Contact.
- `assets/photography.html` — a standalone photography gallery (masonry
  layout, category filter, lightbox).

The two files link to each other (`index.html` ⇄ `photography.html`) and
share the same design tokens, so they must stay visually consistent.

**Before making any change, read `references/editing-guide.md`.** It is the
authoritative map of the design tokens, every section, and copy-paste recipes
for the common edits. Do not guess at structure or colours from memory.

---

## Golden rules (apply to every edit)

1. **Preserve the design system** unless the user explicitly asks to change
   it. Use the CSS variables in `:root`, never hard-coded hex values, for any
   new element. The accent is `--amber`; the theme is dark.
2. **No em dashes** anywhere in copy. Use "to", commas, or restructure. (This
   is a standing preference of Abhilash's across all his work.)
3. **Never fabricate credentials or assets.** Do not invent client names,
   testimonials, awards, metrics, screenshots, or photographs. Where a real
   asset is missing, keep a clearly-labelled placeholder. Honest-fit-first,
   same as the resume skill.
4. **Keep it self-contained.** No new external dependencies or build steps
   without asking. The only runtime external call is the devicon CDN for
   skill icons (which already degrades gracefully to text badges on failure).
5. **Keep both files consistent.** If you change a shared token (colour,
   font, nav), apply it to both `index.html` and `photography.html`.
6. **Accessibility and motion.** Preserve the `prefers-reduced-motion` block,
   keyboard operability, and `aria` labels already present.

---

## Workflow

### Step 1: Identify the edit type and load context

Match the request to a recipe in `references/editing-guide.md` and read that
section. The common edit types are:

| Request | Guide section | Where it lives in the file |
|---|---|---|
| Change theme / accent colour | §1 Design tokens | `:root` in both files |
| Add or edit a project | §2 Projects | `.pgrid` markup + `PROJ` JS object |
| Add / remove an AI film | §3 Films | `.vgrid` markup |
| Edit the A-Z keyboard facts | §4 Keyboard | `AZ` JS object |
| Update work history | §5 Experience | `.tl` timeline markup |
| Edit skills / tech stack | §6 Skills | `.skill-cat` blocks (+ devicon names) |
| Add / curate photos | §7 Photography | `FRAMES` array in `photography.html` |
| Toggle "open to work" | §8 Status | `.av .status` in hero |
| Swap placeholders for real assets | §9 Going live | photo, films, email, CV, OG tags |
| Add a brand-new section | §10 New sections | follow the section pattern |
| Deploy to GitHub Pages | §11 Deploy | rename, localise icons, favicon, meta |

### Step 2: Make the change in the actual file

Edit `assets/index.html` and/or `assets/photography.html` directly (copy to a
writeable location first if the skill is installed read-only). Use the exact
patterns in the guide so new content matches existing structure. Keep edits
surgical; do not reformat unrelated code.

### Step 3: Sanity-check

- Confirm any new colours use CSS variables.
- Confirm no em dashes were introduced.
- Confirm cross-page links and anchors still resolve.
- If JS data objects changed (`PROJ`, `AZ`, `FRAMES`), confirm the markup and
  the data still line up (e.g. every `.pcard[data-proj]` has a `PROJ` entry).
- Open the file mentally section by section; check the reduced-motion and
  responsive `@media` blocks still cover any new element.

### Step 4: Deliver

Save the updated file(s) to `/mnt/user-data/outputs/` and call `present_files`.
Briefly summarise what changed, and flag any remaining placeholders the user
still needs to fill with real content.

---

## Important context

- **Owner:** Abhilash Emmanuel, Wollongong NSW. AI consultant, PMP-certified
  technical project manager, designer, and AI filmmaker. ~15 years experience.
- **Roles for the timeline:** Sequency (co-founder, 2026–now), Freelance AI
  consulting (2023–now), Akamai (Technical PM, 2020–2023), Infosys
  (2009–2020, lead → trainee). Keep public-facing; do not expose Sequency
  internal architecture terms on the public site.
- **AI films:** two YouTube videos already embedded (IDs `qTOToRxtrRI` and
  `NxaVQ67XbiA`). Captions are placeholders to be renamed to real titles.
- **Socials:** LinkedIn `/in/abhilash-emmanuel/`, GitHub `bewithaby`, YouTube
  `@Abhilash_Emmanuel`, Facebook `bewithaby`.
- **Deploy target:** GitHub Pages. Home file must be renamed to `index.html`
  (already named that in `assets/`).

---

## Reference files

- `references/editing-guide.md` — Design tokens, full section map, and
  copy-paste recipes for every common edit. **Read the relevant section
  before editing.**
- `assets/index.html` — Canonical home page template.
- `assets/photography.html` — Canonical photography page template.
