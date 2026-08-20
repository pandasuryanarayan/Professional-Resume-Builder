# Professional Resume Builder

Create a polished, professional resume in minutes — no signup, no payment, no tracking. Fill in your details across guided steps, choose from **13 resume templates** grouped into 4 distinct styles, inspect the **live preview**, and download a print-ready **A4 PDF**.

Built with modern **HTML5, Tailwind CSS, Font Awesome, and Vanilla JavaScript** (no build step or server required). Just open `index.html` in any modern web browser.

---

## ✨ Key Features

### 📱 Optimized Mobile Experience
- **3-Line Hamburger Category Menu**: Clean, accessible hamburger icon button (`fas fa-bars`) near the *"Choose a Template"* header that opens a stylish dropdown for the 4 core design styles (**Professional**, **Modern**, **Minimal**, and **Creative**).
- **Active Category Indicator**: Displays the currently active category name and template count directly below the title.
- **Horizontal Swipe Cards Carousel**: Template designs are presented in a compact, touch-friendly horizontal swipe deck (`scroll-snap`) with miniature layout previews, template badges, and active state highlights.
- **Instant Above-the-Fold Resume Preview**: Eliminates long vertical scrolling by keeping the template picker compact, showing the live resume preview immediately below.

### 💻 Seamless Desktop Workspace
- **Full-Height Vertical Template Sidebar**: Takes advantage of the entire vertical space matching the resume preview column, cleanly displaying templates with a modern custom scrollbar when needed.
- **Sticky Live Preview & Controls**: Side-by-side layout where selecting any template instantly re-renders the live document on the right with sticky positioning and ⬅️ ➡️ template cycling controls (*Template · Name · X/13*).

### 🎨 13 Resume Templates Across 4 Categories
1. **Professional** (4 Templates)
   - `Classic`: Traditional single-column layout with an academic qualifications table.
   - `Executive`: Premium dark header band with gold accents and serif typography.
   - `Corporate`: Centered blue branding tailored for managers and corporate roles.
   - `Compact`: Dense, structured one-page layout for seasoned professionals.
2. **Modern** (3 Templates)
   - `Modern`: Two-column layout with dark emerald sidebar and clean main section.
   - `Tech`: Monospace developer aesthetic with cyan accent lines and skill badges.
   - `Snapshot`: Split header with right-aligned contact details and bold indigo rules.
3. **Minimal** (3 Templates)
   - `Minimal`: Clean, airy single-column design with generous spacing.
   - `Simple`: Monochrome black & white layout focused on straightforward clarity.
   - `Elegant`: Centered serif typography with fine gold hairline dividers.
4. **Creative** (3 Templates)
   - `Bold`: Oversized name header with rose accents for high visual impact.
   - `Creative`: Vibrant purple band with an orange timeline for designers and creators.
   - `Colorful`: Multi-color section headers for a lively, easy-to-scan document.

### 📄 Accurate PDF Export
- Direct client-side PDF generation using [jsPDF](https://github.com/parallax/jsPDF).
- Each template provides both an on-screen HTML preview and a matching jsPDF drawing routine to guarantee **1:1 visual fidelity** between preview and download.
- Proper page wrapping, safe percentage and CGPA formatting, and multi-line bullet preservation.

### 🔒 Client-Side & Privacy First
- **No Login / No Tracking**: All data remains local in the browser.
- **Session Persistence**: State is automatically saved in `sessionStorage`, allowing page refreshes without data loss.
- **Dynamic Academic Fields**: Easily add, edit, or remove multiple degrees (UG, PG, diplomas) alongside Class XII and Class X records.

---

## 📁 Project Architecture

The codebase is organized into modular single-responsibility components:

```
Professional-Resume-Builder/
├── index.html          # Semantic HTML structure, forms, mobile swipe deck, & preview
├── favicon.ico         # Application icon
├── README.md           # Documentation
├── css/
│   └── style.css       # Glassmorphic panels, thumbnail previews, swipe cards, scrollbars
└── js/
    ├── storage.js      # Module 1: Session storage read/write/clear helpers
    ├── templates.js    # Module 2: Template definitions, layout engine, HTML & jsPDF draw methods
    ├── ui-manager.js   # Module 3: View transitions, hamburger menu, swipe cards, DOM rendering
    └── app.js          # Module 4: PDFService + controller (state, event handling, navigation)
```

### How the Template Engine Works:
- Templates are defined as modular objects with `id`, `name`, `category`, `desc`, `preview(state)`, and `draw(doc, state)`.
- Handcrafted templates (`classic`, `modern`, `minimal`) handle specialized layouts (e.g. sidebar and timeline).
- Engine-driven templates configure styling tokens (header mode, section mode, education mode, font family, color palettes) executed by `enginePreview()` and `engineDraw()`.

---

## 🚀 Getting Started

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/pandasuryanarayan/Professional-Resume-Builder.git
   cd Professional-Resume-Builder
   ```

2. **Open the Application**:
   - Double-click `index.html` or open it with your favorite browser.
   - Alternatively, serve it locally:
     ```bash
     python3 -m http.server 8000
     # Visit http://localhost:8000 in your browser
     ```

---

## 📝 User Workflow

1. Click **Create Resume** on the landing page.
2. Fill in the guided steps:
   - **Personal Information**: Name, contact, links, languages, address, and summary.
   - **Academic Qualifications**: Dynamic university qualifications + Class XII and Class X.
   - **Work Experience**: Jobs, internships, or freelance roles (optional).
   - **Projects**: Academic and personal projects.
   - **Skills & Certifications**: Technical skills, certifications, and hobbies.
3. Click **Generate Resume** to reach the review view.
4. Pick a template via the mobile swipe cards or desktop sidebar (or use the category filter menu).
5. Click **Download PDF** to save your resume as `<Your_Name>_Resume.pdf`.

---

## 📜 License

Distributed under the Apache License 2.0. See `LICENSE` for details.

© 2024–2026 Professional Resume Builder — Created by **Suryanarayan Panda**.