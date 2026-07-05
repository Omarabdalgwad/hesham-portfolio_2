Hesham Ahmed Foad — Portfolio Website
======================================

Files:
- index.html  → page structure/content
- style.css   → all styling (colors, layout, fonts)
- script.js   → interactivity (nav menu, scroll animations, hero effect, contact form)

All three files must stay in the same folder — index.html links to the
other two by filename (style.css, script.js).

How to host it (pick any):
1) Netlify Drop
   - Go to https://app.netlify.com/drop
   - Drag this whole folder in
   - You get a live link instantly (e.g. yourname.netlify.app)

2) GitHub Pages
   - Create a GitHub repo, upload all 3 files
   - Settings > Pages > Deploy from branch (main) > root
   - Live at https://username.github.io/repo-name

3) Any shared hosting / cPanel
   - Upload all 3 files into public_html/ (same folder level)
   - That's it — no build step, no dependencies needed

Editing basics:
- Contact info (email, phone, LinkedIn) is near the bottom of index.html,
  inside the <section id="contact"> block.
- Colors are defined once at the top of style.css under :root —
  change the hex values there to re-theme the whole site.

No backend, database, or build tools required. Just static files.
