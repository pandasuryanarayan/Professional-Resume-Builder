# Resume Builder

Create a professional resume in minutes — no signup, no payment. Fill in your details across a few guided steps, pick one of **13 templates** grouped by style & profession, live-preview it, and download a **PDF** ready to share.

Built with plain **HTML, CSS and JavaScript** (no build tools). Just open `index.html` and go.

---

## Features

- **13 resume templates** grouped into 4 categories:
  - **Professional** — Classic, Executive, Corporate, Compact
  - **Modern** — Modern, Tech, Snapshot
  - **Minimal** — Minimal, Simple, Elegant
  - **Creative** — Bold, Creative, Colorful
- **Live preview** — side-by-side on desktop: pick a template on the left, the resume re-renders instantly on the right (sticky), with ⬅➡ prev/next controls and a *Template · name · 3/13* indicator.
- **PDF download** — the chosen template is rendered to a print-ready A4 PDF via [jsPDF](https://github.com/parallax/jsPDF).
- **Guided 5-step form** — Personal Info → Academic Qualifications → Work Experience → Projects → Skills & Certifications, with dynamic add/remove qualification entries and input validation.
- **Session persistence** — your data *and* selected template are saved in `sessionStorage`, so a refresh (within the session) keeps your work.
- **Mobile-friendly** and uses the same glassmorphism + green theme across the whole app.

---

## Project Structure

The app is split into small, single-responsibility modules instead of one monolithic file.

```
.
├── index.html          # Page structure, views, forms, template picker + preview layout
├── css/
│   └── style.css       # Theme, template-picker, and resume-preview styles
├── js/
│   ├── storage.js      # Module 1: sessionStorage read/write
│   ├── templates.js    # Module 2: all 13 templates + shared engine
│   ├── ui-manager.js   # Module 3: views, forms, picker, preview, toasts
│   └── app.js          # Module 4: PDF service + controller (state, navigation)
└── favicon.ico
```

**How the template engine works:** each template is one small object. Three are hand-crafted layouts (Classic, Modern, Minimal); the rest are tiny style configs consumed by `enginePreview()` (on-screen HTML) and `engineDraw()` (jsPDF). That guarantees the preview and the downloaded PDF always match. Stylable tokens include header mode, section mode, education layout, skills layout, palette, and even font family (helvetica / times / courier).

---

## Using the builder

1. Click **Create Resume** on the landing page and fill in the steps.
2. On the final step, choose a template from the left panel (or use ⬅➡ under the preview).
3. Review the live preview on the right.
4. Hit **Download PDF**. The file is saved as `<Your_Name>_Resume.pdf`.

> Loaded over a plain `file://` and from a static server alike — no build step required. External assets (Tailwind CSS, Font Awesome, jsPDF) are pulled from CDNs; an internet connection is needed for full styling/PDF export.

---

## Notes

- Resume data lives only in the user's browser (`sessionStorage`).
- Empty optional sections (e.g. no work experience for freshers) are hidden automatically in both preview and PDF.
- Validation: phone must be exactly 10 digits; required fields are marked inline.

© 2024 Resume Builder — created by Suryanarayan Panda.