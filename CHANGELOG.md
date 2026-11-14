# Changelog

All notable improvements to the developer portfolio project are documented in this file.

## [5.0.0] - 2026 Abokor Tech Brand Identity & Architecture Elevation

### Added & Rebranded
- **Official Brand System (Abokor Tech)**: Fully harmonized brand identity as **Abokor Tech** across nav, footer, preloader, metadata, social previews, structured data, and web manifest.
- **Brand Palette Integration (#FB5800 & #1A1A1A)**: Rebuilt the primary color system around `#FB5800` (Cyber Tech Orange) and dark background `#1A1A1A` with elevated dark surfaces (`#222222`, `#262626`), high-contrast body typography (`#F5F5F7`, `#A1A1AA`), and refined ambient glass cards.
- **Positioning Alignment**: Promoted core professional positioning across hero, typed strings, and dictionaries: **Full Stack Developer, Cloud Solutions, UI/UX Designer**.
- **Hero Conversion Architecture**: Streamlined vertical spacing and introduced a prominent CTA action cluster ("View Projects", "Contact Me", and "Hire Me" WhatsApp deep-link) plus a dedicated "Arag CV-ga" trigger.
- **SMS Project Asset Integration**: Linked the authentic School Management System preview (`sms.png`) directly to the project card with live credentials link.
- **Canonical & Domain Remediation**: Updated all canonical links, OpenGraph URLs, Twitter images, JSON-LD schema, `sitemap.xml`, and `robots.txt` from outdated `sommarket.shop` subdomains to the official production domain `https://abokor.shop`.
- **Accessibility & Form Semantics**: Added explicit accessible `for` bindings to all contact form inputs and styled WCAG-compliant `:focus-visible` rings in brand `#FB5800`.
- **PWA Cache Bump**: Upgraded service worker cache to `abokor-tech-v5-0-0` and bumped assets to `v=5.0.0`.

## [4.2.0] - 2026 3D Immersion & Error Elimination

### Added
- **Three.js 3D Interactive Hero World**: Integrated Three.js (`r128`) on `#heroCanvas` with an interactive rotating 3D holographic Icosahedron wireframe, inner geodesic glowing sphere, and dual orbital rings matching the brand colors (`#ff6a1f` cyber orange, `#6c63ff` electric violet, `#22d3ee` aqua cyan). Includes a 3D galaxy starfield with 200+ particle nodes, smooth cursor/touch parallax damping (lerp), and battery-saving `IntersectionObserver` pause when scrolled away.
- **Resilient 2D Particle Fallback**: If WebGL is disabled, offline, or `prefersReducedMotion` is active, the system automatically runs a fluid 2D canvas particle mesh.
- **Advanced 3D Card Perspective & Specular Sheen**: Added `transform-style: preserve-3d` and dynamic specular light sheen that tracks mouse coordinates (`--mouse-x`, `--mouse-y`) across project cards, services, stats, certificates, pricing, and testimonial cards with multi-layered depth (`translateZ`).
- **Interactive 3D Hero Avatar Stage**: Wrapped the hero profile container in an interactive 3D stage (`#heroImageStage`) with dynamic cursor tilt, 3D pulsing ambient glow, floating 3D status badge, and 4th floating chip (`.chip-4` with 3D cube icon).
- **Intelligent Offline AI Chatbot Knowledge Base**: Implemented an immediate local knowledge engine for the AI Assistant. If the external n8n webhook times out, is sleeping, or returns non-2xx errors, the chatbot provides intelligent answers in Somali or English about Abokor's top projects, service packages, contact info, and technology stack.

### Fixed
- **Typed.js Race Condition**: Fixed potential blank hero text on slow network connections by providing an instant default text fallback and retry watcher until the deferred Typed CDN script finishes loading.
- **AOS Initialization Timing**: Guarded AOS with both direct initialization and `window.load` fallback.
- **Cache-Busted Assets & PWA**: Updated service worker cache to `abokor-portfolio-v4-2-0` and bumped query parameters for `style.css?v=4.2.0` and `app.js?v=4.2.0`.

## [4.1.1] - 2026 Bug Fixes

### Fixed
- **AI Chat Raw JSON Error**: When the n8n webhook returned an error payload (e.g. `{"error":"The resource you are requesting could not be found"}`), the raw JSON was shown in the chat. The chat now detects JSON error payloads and non-2xx responses and shows the friendly fallback message instead (Somali/English).
- **Chat Window / Header Overlap**: On shorter viewports the AI chat window could grow tall enough to slide underneath the sticky navbar. It is now capped with `max-height: calc(100dvh - 280px)` so it always stays below the header.
- **Cache-Busted Assets**: `style.css?v=4.1.1` and `app.js?v=4.1.1` (service worker cache bumped to `abokor-portfolio-v4-1-1`).

## [4.1.0] - 2026 Polish Pass

### Added
- **Browser-Frame Project Shots**: Every project card image now renders inside a mini browser chrome (`screen-bar`) with traffic-light dots and the live URL pill, giving a premium "screenshot" feel. Gradient-only projects (SO! Gasho, Hibo Foundation) got a **mock dashboard** (`mock-dash`) with animated stat bars and overlay cards instead of a flat gradient.
- **Nav Underline Animation**: Animated gradient underline slides under nav links and footer links on hover/active.
- **Hero Conic Ring**: Third spinning ring (`ring-3`) around the profile photo built with a conic gradient + mask — adds depth without extra assets.
- **Section Rhythm**: `section-tinted` bands on Experience, Projects, and Testimonials (soft gradient over `--bg-soft` + hairline borders) to visually separate major blocks.
- **Keyboard Focus Rings**: Visible `:focus-visible` outlines on links, buttons, inputs, and textareas for accessibility polish.
- **Footer Gradient Hairline + Back-to-Top**: Gradient top-border on the footer and a "Kor" (up) quick link in the footer nav.
- **Button Icon Micro-Interaction**: Icons inside `.btn` slide 3px on hover; new `.btn-block` utility replaces inline `width:100%` styles.
- **Balanced Text Wrapping**: `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs for cleaner line breaks.

### Changed
- **Inline Styles → Classes**: Removed scattered `style="..."` attributes (pricing headings, buttons, hero/about images, contact map link, CTA icons) and moved them into `style.css` (`.about-role`, `.pricing-custom-text`, `.btn-block`, `.contact-details a`, `.hero-image-container img`).
- **Hero/About Image Crop**: About photo now uses `object-fit: cover` + `object-position: center 22%` with a 1:1 aspect ratio, so the repeated `hr.png` reads differently from the circular hero crop; added a soft glow blob inside the About card.
- **AOS Variety**: Services and Pricing cards now use `zoom-in` instead of uniform `fade-up`.
- **Light Theme Fixes**: Preloader background/label and `.animated-preview` overlays now follow the active theme instead of hard-coded dark values; screen-bar adapts in light mode.
- **Cache-Busted Assets**: `style.css?v=4.1.0` and `app.js?v=4.1.0` (service worker cache bumped to `abokor-portfolio-v4-1-0`).

## [4.0.0] - 2026 Full Redesign

### Added
- **2026 Obsidian Design System**: Complete visual redesign with deep obsidian base (`#05070f`), Space Grotesk display font + Inter body, refined gradient palette (cyber orange `#ff6a1f`, electric violet `#6c63ff`, aqua cyan `#22d3ee`), animated gradient mesh backgrounds, dot-grid overlay, and SVG noise texture.
- **Tech Marquee Strip**: Infinite auto-scrolling technology ticker (React, Next.js, Node.js, PHP, Laravel, PostgreSQL, MySQL, Docker, n8n, AI Agents, Python, TailwindCSS) between hero and about sections, with pause-on-hover.
- **Hero Floating Tech Chips**: Floating React / AI Robot / Node.js icon chips around the profile image with alternating float animation.
- **Final CTA Band**: New conversion section before the contact area with gradient glass card, WhatsApp deep-link CTA button, and full Somali/English i18n support (`cta_title`, `cta_text`, `cta_btn`).
- **About Facts Grid**: New quick-fact list (education, university, location, remote/on-site readiness) with icon bullets.
- **PWA Support**: Added `manifest.webmanifest` (installable, standalone display, generated 192px/512px icons), `sw.js` service worker (pre-caches core assets, cache-first strategy, offline fallback for navigations), apple-touch-icon, and theme-color meta.
- **SEO & Crawling**: Added `canonical`, `og:type`, absolute social preview image URLs, `robots.txt` and `sitemap.xml`.
- **Accessibility**: Skip-to-content link, `aria-label`s on nav/chat/modal/buttons, `role="dialog"` on modal and chat window, keyboard `Escape` to close modal & chat, keyboard support on scroll-top, chat button and close buttons.
- **Reduced Motion Support**: `prefers-reduced-motion` disables particle canvas, 3D card tilt, counters animation and cursor effects while keeping content fully visible.
- **Performance**: `preconnect` hints for Google Fonts / CDN / unpkg, `defer` on all third-party and local scripts, lazy-loaded profile images.
- **Footer Year Auto-Update**: `#year` is now set dynamically by JavaScript.

### Changed
- **Design Refresh on CV Page**: `cv.html` rebuilt with the same 2026 design tokens (Space Grotesk, obsidian glass, gradient accents), new reference cards grid, improved print styles, and reduced-motion handling.
- **Hero Particle Colors**: Particle canvas now uses the new `255,106,31` orange and `108,99,255` violet accents.
- **FAQ Accordion**: Reworked to use class-based open state (`open`) for cleaner CSS transitions.
- **Typing Roles**: Added "AI & Automation Expert" to the hero typed rotation in both languages.
- **Toast instead of Alert**: Contact form success/error feedback now uses the toast notification system instead of native `alert()` popups.
- **Cache-Busted Assets**: `style.css?v=4.0.0` and `app.js?v=4.0.0` for clean deployments.

## [3.0.0] - 2026-08-02

### Added
- **2026 Ultra-Modern Design System**: Overhauled color tokens with obsidian dark base (`#060812`), glowing HSL variables, cyber orange & electric cyan linear accents, and frosted glass cards (`backdrop-filter: blur(20px)`).
- **Toast Notifications System**: Integrated lightweight toast feedback UI (`.toast-container`, `.toast`) with animated slide-in and icon alerts for copy actions and contact form submissions.
- **Project Quick View Modal**: Added interactive slide-up modal backdrop (`#projectModal`) allowing users to view full details, key features, and live links for any project card.
- **3D Card Hover Perspective**: Implemented smooth interactive 3D tilt movement on project cards, service cards, stat containers, and certificates (`transform: perspective(1000px) rotateX(...) rotateY(...)`).
- **Skills Category Filter Tabs**: Introduced filter buttons (*Dhammaan*, *Frontend*, *Backend & DB*, *AI & Automation*, *Tools & DevOps*) to instantly categorize tech stack items.
- **Quick Copy Buttons**: Added interactive copy buttons next to phone numbers and email addresses with instant clipboard feedback.
- **Circular Scroll Progress Ring**: Upgraded back-to-top button with a dynamic SVG circular progress ring indicating scroll percentage.
- **CV View Print & Back Nav Optimization**: Synchronized `cv.html` theme, layout glass containers, and hidden navigation buttons in print view mode.

## [2.0.0] - 2026-07-25

### Added
- **Hire Me Announcement Banner**: Animated gradient banner at top of page showing availability for new projects, with close button and localStorage persistence so dismissed users don't see it again.
- **Hero Particle Canvas**: Animated connected particle network rendered on an HTML5 canvas behind the hero section for a premium, dynamic feel.
- **Hero Image Animated Rings**: Two pulsing orbital rings around the profile photo with orange and purple accent colors.
- **Hero Gradient Text**: The hero name now uses a white-to-orange gradient text effect, and the typing text uses an orange-to-cyan gradient.
- **4th Proof Pill**: Added "20+ Projects Delivered" proof pill to the hero section social proof bar.
- **Third Background Blob**: Added a subtle cyan accent blob for more visual depth.
- **Preloader Label**: Added "Abokor Keyse" branding label below the loading dots.
- **Hospital Management System (HMS) Project**: Added a new project card for the HMS with heartbeat and stethoscope animated preview, "Cusub/New" badge, and full translations in both Somali and English.
- **Expanded Testimonials (3 → 5)**: Added two new testimonials from Dr. Najma Osman (Medical Director) and Jama Abdi (CEO, SO! Gasho ISP) with star ratings and colored avatars for each card.
- **Star Ratings**: All testimonial cards now feature a 5-star gold rating display.
- **Colored Avatars**: Each testimonial avatar now has a unique color (orange, purple, cyan, red, green) matching the project/client.
- **Expanded FAQ (2 → 4)**: Added payment methods FAQ (EVC Plus, Zaad, E-Dahab, Western Union with 50/50 split) and Somali language website FAQ.
- **WhatsApp Social Link in Footer**: Added WhatsApp icon to the footer social links row.
- **Footer Navigation Links**: Added quick nav links (Home, About, Projects, Contact, CV) to the footer.
- **Footer Brand Name**: Added stylized "AbokorKeyse" branding in the footer.

### Changed
- **Page Title**: Updated to "Abokor Keyse | Full Stack Developer & AI Automation Expert" for better SEO impact.
- **Footer Upgrade**: Completely redesigned footer with brand name, tagline, styled circular social icon buttons, and quick nav links.
- **Social Icons Style**: Social link icons now render as circular glass-style buttons with hover elevation effects.
- **Testimonials Grid**: Upgraded to 3-column grid layout with responsive 2-column and 1-column breakpoints.

## [1.1.0] - 2026-07-07

### Added
- **Honeypot Protection**: Added a hidden honeypot input field (`#form_honeypot`) in the contact form to silently catch and discard automated spam submissions.
- **Interactive Project Previews**: Implemented custom hover overlay animations for each project card:
  - **AgentWorks AI**: Connected pulsing AI nodes and floating line flow.
  - **BloodSave**: Pulsing red heartbeat animation.
  - **SO! Gasho ISP CRM**: Dynamic billing statistics scaling bar charts.
  - **School Management System**: Bouncing academic graduation cap animation.
  - **Karti POS**: Slow rotating cash register mechanism.
  - **Hibo Foundation Website**: Heartbeat scale animation indicating social impact outreach.
- **Fluid Layout Grid**: Modified `.projects-grid` structure using CSS `min(100%, 360px)` inside `grid-template-columns` to prevent horizontal scrolling/breakages on ultra-narrow devices (e.g., iPhone SE).

### Changed
- **Project Showcase Overhaul**: Upgraded the showcase section in [index.html](file:///C:/Users/abokor%20keyse/Desktop/abokor/index.html) to display exactly the six requested premium projects:
  1. **AgentWorks AI** (Automation)
  2. **Somali Blood Donation System (BloodSave)** (Web Dev)
  3. **SO! Gasho ISP CRM** (Web Dev / Fintech)
  4. **School Management System** (Web Dev - Next.js, PostgreSQL, Docker at school.abokor.shop/login with parent WhatsApp Automation for exams)
  5. **Inventory/POS System (Karti POS)** (Web Dev)
  6. **Hibo Foundation Website** (Web Dev)
- **Internationalization (i18n)**: Updated Somali and English translation dictionaries in [app.js](file:///C:/Users/abokor%20keyse/Desktop/abokor/app.js) to support details, tags, badges, and features for all six premium projects.
- **Contact Form Validation & Security**: Rewrote [send_mail.php](file:///C:/Users/abokor%20keyse/Desktop/abokor/send_mail.php):
  - Added session-based rate limiting (maximum of 3 messages per 10 minutes).
  - Implemented strict input validation (length limits and format verification).
  - Enforced CORS origin checks to restrict third-party CSRF exploitation.
  - Upgraded email notification body into a clean, modern HTML table layout.
  - Implemented a graceful Ajax fallback to FormSubmit.co in JavaScript if local server mail configuration fails.
- **Lazy Loading**: Enabled lazy loading (`loading="lazy"`) for below-the-fold assets, specifically the profile image in the About section, to boost initial rendering performance.
