# Apoam — placeholder site

This repository contains a simple single-page website scaffold pushed to the `gh-pages` branch so GitHub Pages can serve a project site.

Live URL (project site): https://Apoam.github.io/apoam

Files added:
- `index.html` — single-page HTML with placeholders for the logo, association history, and an embedded Google Form.
- `styles.css` — simple responsive styles.
- `assets/logo.svg` — placeholder logo (SVG).
- `.nojekyll` — prevents Jekyll processing.

How to replace placeholders:
- Logo: replace `assets/logo.svg` with your logo (same filename) or update the `img` src in `index.html`.
- History text: edit the content in the `#history` section of `index.html`.
- Google Form: open your Google Form, click Send → &lt;&gt; (embed), copy the iframe and paste it into the `#form` section in `index.html` (replace the commented example iframe).

If the site does not appear immediately, wait a minute for GitHub Pages to build. If you prefer the site served from a different branch or from `/docs`, adjust the Pages settings in the repository Settings → Pages.
