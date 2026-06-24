# Portfolio Editing Guide

Authoritative reference for editing `assets/index.html` and
`assets/photography.html`. Read the section you need before editing. Every
code block below mirrors the real structure in the files, so new content
should be pasted and adapted, not invented from scratch.

## Contents
1. Design tokens (theme + colour)
2. Projects (cards + modal)
3. AI films
4. The A-Z keyboard
5. Experience timeline
6. Skills / tech stack
7. Photography page
8. "Open to work" status
9. Going live: swapping placeholders for real assets
10. Adding a new section
11. Deploy to GitHub Pages

---

## 1. Design tokens (theme + colour)

All colour and theme values live in the `:root` block at the top of **both**
files. Change them there, never inline. The current palette:

```css
:root{
  --ink:#0d1521; --ink-2:#121d2e; --ink-3:#16243a; --line:#22344b; --line-2:#2c4262;
  --text:#e7edf5; --muted:#8da3bd; --faint:#56708f;
  --amber:#e7a93b; --amber-soft:#f2c878; --green:#3ddc84; --teal:#2dd4bf; --coral:#ff6b4d; --blue:#4d94ff;
}
```

- `--ink*` = backgrounds (darkest to lighter panels). `--line*` = borders.
- `--text/--muted/--faint` = text from brightest to dimmest.
- `--amber` = the single accent (links, highlights, active states). To
  re-skin the whole site to a different accent, change `--amber` and
  `--amber-soft` in BOTH files; everything else inherits.
- Fonts: `Space Grotesk` (display, via `.mono` → `JetBrains Mono` for labels).
  Loaded from Google Fonts in `<head>`. To change, swap the `<link>` and the
  `font-family` on `body` / `.mono`.

**Rule:** any new element must reference these variables (e.g.
`border:1px solid var(--line)`), so a future re-theme stays one-file-cheap.

---

## 2. Projects (cards + modal)

Projects are Salman-style: a grid of clickable cards that open an animated
modal. There are **two** places to edit, and they must stay in sync by the
`data-proj` / object-key.

### 2a. The card (in `#projects .pgrid`)

```html
<div class="pcard" data-proj="NEWID">
  <div class="cover"><div class="ph"></div><div class="tagrow"><span>Tag1</span><span>Tag2</span></div><div class="open">↗</div></div>
  <div class="pad"><div class="role mono">Your Role</div><h3>Project Name</h3></div>
</div>
```

- `data-proj` must match a key in the `PROJ` object (2b).
- `.cover .ph` is the placeholder hatch. To use a real cover image, replace
  `<div class="ph"></div>` with `<img src="assets/projects/NEWID-cover.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`.

### 2b. The modal data (in the `PROJ` JS object, bottom `<script>`)

```js
NEWID:{
  role:'Your Role',
  title:'Project Name',
  scope:['Scope 1','Scope 2','Scope 3'],
  cover:'Project Name · cover',          // label shown on modal hero placeholder
  link:'https://real-link-or-#',
  palette:['#0d1521','#e7a93b','#2dd4bf','#4d94ff'],
  desc:'<p><b>The problem.</b> ...</p><p><b>The approach.</b> ...</p>'
},
```

- Keep `desc` as short HTML paragraphs with `<b>` lead-ins. Be truthful; if
  real metrics aren't known, leave a `Replace this` note rather than invent.
- The modal's screenshot grid is fixed placeholder markup (`.shots .s`). To
  show real screens, replace those three `<div class="s">` with `<img>` tags
  the same way as the cover.

### 2c. Removing a project

Delete its `.pcard` block AND its `PROJ` entry. The grid is 2-up on desktop,
1-up on mobile; any even number looks best.

---

## 3. AI films

YouTube embeds in `#films .vgrid`. To add a film, duplicate a `.vid` block
and change the video ID and caption:

```html
<div class="vid"><div class="fr">
  <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="..." loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div><div class="cap"><b>Real Film Title</b><span class="t mono">tag · tag</span></div></div>
```

- The video ID is the part after `v=` in a YouTube URL.
- Current IDs: `qTOToRxtrRI`, `NxaVQ67XbiA`. Captions ("AI Film 01/02") are
  placeholders; rename to real titles.
- The grid is 2-up; for 3+ films it wraps fine, but consider 1fr columns if
  the count is odd.

---

## 4. The A-Z keyboard

The hero's interactive device. Pressing a letter (click or physical key)
shows a fact about Abhilash starting with that letter. Data is the `AZ`
object in the bottom `<script>`:

```js
const AZ={
  A:['AI','Practical AI','Building LLM and agent systems that hold up in production.'],
  // LETTER:['short kicker','title line','one-sentence description']
  ...
};
```

- Each entry: `[kicker, title, description]`. Keep descriptions to one
  sentence, public and professional (no Sequency internal terms).
- All 26 letters are currently mapped. Unmapped keys simply do nothing.
- The QWERTY layout is generated from `const rows=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM']`.
  You normally won't touch this.
- To make the section auto-demo on load (signal interactivity), add
  `setTimeout(()=>reveal('A'),900);` after the keydown listener.

---

## 5. Experience timeline

In `#experience .tl`. Each role is a `.job` block; current roles carry the
`now` class (live amber dot):

```html
<div class="job now">   <!-- drop "now" for past roles -->
  <div class="when">2026 — Now</div>
  <div>
    <div class="co"><div class="lg">SQ</div><div>
      <div class="nm">Company</div><div class="role mono">Title</div>
    </div></div>
    <ul><li>Point one.</li><li>Point two.</li></ul>
  </div>
</div>
```

- `.lg` is a 2-letter monogram badge. To use a real logo, replace its text
  with `<img src="assets/logos/company.svg" alt="" style="width:100%;height:100%;object-fit:contain">`.
- Order is reverse-chronological. First `.job` has its top border removed by
  CSS automatically.
- Note: visible date ranges in this file use an en dash "—" inside the
  `.when` span only. Do not introduce em dashes into prose copy.

---

## 6. Skills / tech stack

In `#skills`, grouped into `.skill-cat` blocks. Each chip:

```html
<span class="chip"><img data-src="ICON_PATH" alt="">Label</span>   <!-- icon chip -->
<span class="chip"><span class="ph2">XY</span>Label</span>          <!-- text-badge chip -->
```

- Icon chips load from devicon: `data-src` is `name/name-original` (the JS
  prepends `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/` and appends
  `.svg`). Verified names already in use: `python/python-original`,
  `typescript/typescript-original`, `react/react-original`,
  `nodejs/nodejs-original`, `supabase/supabase-original`,
  `postgresql/postgresql-original`, `docker/docker-original`,
  `git/git-original`, `jira/jira-original`, `confluence/confluence-original`,
  `figma/figma-original`. Find more at https://devicon.dev.
- If an icon name is wrong/missing, it auto-falls back to a 2-letter badge,
  so the page never breaks. For tools with no devicon (Claude, n8n, Cursor),
  use the `.ph2` text-badge form.
- Chips animate in on scroll via the `.chip.in` IntersectionObserver; new
  chips inherit this automatically.

---

## 7. Photography page

`photography.html` is driven by the `FRAMES` array in its `<script>`:

```js
const FRAMES=[
  ['street','Crossing','tall'],   // [category, title, size]
  ['portrait','Stillness',''],    // size: '' normal, 'tall', 'wide'
  ...
];
```

- Categories must match the filter buttons in `#cats` (`all`, `street`,
  `portrait`, `landscape`, `detail`). To add a category, add a
  `<button class="cat" data-cat="newcat">New</button>` and use `newcat` in
  FRAMES.
- To use real photos, replace the tile's placeholder `.img` div. In the
  `render()` function, swap the `<div class="img">...` template for an
  `<img loading="lazy" src="assets/photos/FILE.webp">` and store the filename
  as a 4th item in each FRAMES entry. Keep `break-inside:avoid` on `.tile`.
- The home page (`index.html`) shows only a 6-frame selection in `#photo`
  with a "full gallery" link; curate those separately from the full set.
- Curation guidance: 12–24 strongest shots, compressed WebP, lazy-loaded.

---

## 8. "Open to work" status

The hero avatar (`.av`) has a green dot that expands to "OPEN TO WORK" on
hover (`.av .status`). To switch it OFF when not job-hunting, delete the
`.status` element from `.av` (the avatar still renders). To change the label,
edit the `.txt` span and the `width` value in `.av:hover .status` if the text
length changes.

---

## 9. Going live: swapping placeholders for real assets

Checklist of every placeholder to replace before the site is "real":

- **Profile photo:** `.av .pic` text → `<img>` (hero) and `.avatar`/portrait
  spots if added.
- **Project covers & screenshots:** see §2.
- **Film titles:** the `<b>` captions in §3.
- **Email:** replace `your.email@here.com` (appears in the `.mail` link and
  the `mailto:` in contact) with the real address. Search both files.
- **CV link:** the `.cv-btn` `href="#"` in the nav → real CV URL or PDF path.
- **Photos:** the `FRAMES` array + home selection (§7).
- **Meta/OG tags & favicon:** see §11.

Searching for `your.email@here.com`, `YOUR PHOTO`, `placeholder`, `Replace
this`, and `AI Film 0` will surface most stubs.

---

## 10. Adding a new section

Follow the existing section pattern so spacing, dividers, and the numbered
eyebrow stay consistent:

```html
<section id="newsection"><div class="wrap">
  <div class="shead"><span class="num mono">06</span><h2>Section Title</h2><div class="line"></div></div>
  <!-- section content -->
</div></section>
```

- Increment the `.num` and renumber later sections if order changes.
- Add a matching `<a href="#newsection">` to the nav `.navlinks`.
- If content should reveal on scroll, give items a base hidden style plus an
  `.in` class and register them with an IntersectionObserver (copy the
  `.pcard` reveal pattern at the bottom of the script).

---

## 11. Deploy to GitHub Pages

1. The home file is already named `index.html` (required by GitHub Pages).
   Keep `photography.html` alongside it; the cross-links assume same folder.
2. **Localise the icons** (optional but recommended): download each devicon
   SVG used in §6 into `assets/icons/` and change the JS `img.src` prefix to
   `assets/icons/`. This removes the only runtime external dependency and
   makes the site work fully offline.
3. **Favicon:** add `<link rel="icon" href="assets/favicon.svg">` to both
   `<head>`s.
4. **Open Graph / SEO:** add to `<head>` (use a real OG image once available):
   ```html
   <meta property="og:title" content="Abhilash Emmanuel — AI Consultant, Designer & Filmmaker">
   <meta property="og:description" content="...">
   <meta property="og:image" content="https://YOURDOMAIN/assets/og.png">
   <meta property="og:type" content="website">
   <meta name="twitter:card" content="summary_large_image">
   ```
5. Push `index.html`, `photography.html`, and `assets/` to the repo, enable
   Pages on the default branch, done.

---

## Quick reference: where things live

| Thing | File | Locator |
|---|---|---|
| Colours / fonts | both | `:root`, `<head>` font `<link>` |
| Nav links | both | `nav .navlinks` |
| Hero keyboard facts | index | `AZ` object |
| Open-to-work dot | index | `.av .status` |
| Projects (cards) | index | `#projects .pgrid` |
| Projects (details) | index | `PROJ` object |
| Experience | index | `#experience .tl` |
| Films | index | `#films .vgrid` |
| Skills | index | `#skills .skill-cat` |
| Home photo selection | index | `#photo .gal` |
| Full gallery | photography | `FRAMES` array, `#cats` |
| Contact / email / socials | index | `#contact` |
