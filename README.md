# Tech Frontier Lounge — Landing Page

Registration landing page for a casual monthly dev meetup in Delhi. Built to feel
friendly but sponsor-ready: chrome/silver metallic headlines, deep-navy CTAs, a
faint violet glow, a live animated network background, and a Caveat script accent.

Implemented from a Claude Design handoff bundle as a plain static site — no build
step, no framework. Open `index.html` in a browser and it runs.

## Files

- `index.html` — page markup (nav → hero → about → schedule → speakers → gallery → sponsors → FAQ → newsletter → footer)
- `styles.css` — all styling and responsive rules
- `app.js` — nav scroll state, mobile menu, scroll reveals, FAQ accordion, toast, newsletter capture, animated canvas network
- `assets/` — drop real photos here

Fonts (Saira / Hanken Grotesk / Caveat) load from Google Fonts.

## Run

Any static server, e.g.:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html`.

## Going live — placeholders left intentionally open

The design ships with friendly placeholders. To make it real:

1. **Register links** — every `Register` / `Reserve your spot` / `Register on the
   host page` button and the footer `Register` link carry `class="js-register"` and
   `href="#"`. They currently fire a "link coming soon" toast. Replace each `href="#"`
   on a `.js-register` element with your Luma/Eventbrite/Meetup URL (add
   `target="_blank" rel="noopener"`). Anything with a real `href` skips the toast
   automatically — see the guard in `app.js`.
2. **Pitch a talk** — same mechanism (`.js-register`, `href="#"`); point it at a
   form or the same host page.
3. **Become a sponsor / Sponsor us** — `class="js-sponsor"`, `href="#"`. Point at a
   `mailto:` or sponsor form.
4. **Photos** — the striped `.ph` placeholders (community shot, speaker headshots,
   gallery) are ready to swap for `<img>` tags pointing at files in `assets/`.
5. **Speakers & schedule** — hardcoded in `index.html`; edit the `.spk` cards and
   `.sched-row` entries as the lineup and dates firm up.
6. **Contact / social** — the footer X / LinkedIn / Discord / email links are `href="#"`.

Real event details already baked in: **Hauz Khas Social, New Delhi · 3:30 PM ·
in person · monthly**. Event title kept vague ("Vol. 01 · Coming Soon") and
dates as "TBA" per the brief.

## Accessibility / motion

The network animation respects `prefers-reduced-motion` — it renders a single static
frame instead of animating for users who opt out.
