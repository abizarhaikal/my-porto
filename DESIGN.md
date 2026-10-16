---
name: Haikal Abizar Portfolio
description: Calm editorial portfolio for a software engineer.
colors:
  paper: "#fafafa"
  ink: "#242723"
  muted: "#59605a"
  line: "#d5d9d7"
  rust: "#9f4f3d"
  forest: "#263a35"
  section-soft: "#f2f5f3"
  skill-surface: "#252824"
  skill-card: "#32352f"
typography:
  display:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(5rem, 8.8vw, 8.7rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(3.1rem, 5.2vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
  card: "26px"
  card-mobile: "19px"
  pill: "100px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.paper}"
    rounded: "0"
    padding: "15px 21px"
    height: "54px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "15px 18px"
  journey-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(26px, 3vw, 42px)"
  project-chip:
    backgroundColor: "#f0f0e9"
    textColor: "#535e53"
    rounded: "{rounded.pill}"
    padding: "8px 10px"
  skill-card:
    backgroundColor: "{colors.skill-card}"
    textColor: "#f0eee8"
    rounded: "14px"
    padding: "24px"
---

# Design System: Haikal Abizar Portfolio

## Overview

**Creative North Star: "Portofolio editorial yang tenang"**

The portfolio presents a software engineer's profile, work history, and case studies for recruiters and hiring managers. Its visual voice is clear and grounded: editorial serif headlines give the content character, while a direct sans-serif keeps descriptions and controls easy to scan.

The page uses a neutral-light foundation with restrained terracotta accents. Dark forest and charcoal surfaces distinguish the contact and skills areas. Cards use a thin border and soft shadow to separate content without making the page feel heavy. The layout leaves room for project previews, career details, and the candidate's portrait to carry the story.

**Key Characteristics:**
- Calm editorial typography with Georgia headlines and Arial body text.
- Neutral light surfaces, with terracotta used sparingly for emphasis.
- Clear, tactile controls and softly separated cards.
- Claims and project details stay grounded in available evidence.

## Colors

The palette is neutral and light, with a restrained terracotta accent and two darker section surfaces for contrast.

### Primary
- **Terracotta** (#9f4f3d): Accent for the hero name, primary calls to action, timeline markers, and interactive emphasis.

### Secondary
- **Forest** (#263a35): Dark green surface for contact content, timeline dates, and selected project actions.

### Neutral
- **Paper** (#fafafa): Main page and card background.
- **Ink** (#242723): Main text and strong foreground content.
- **Muted** (#59605a): Supporting paragraph text.
- **Line** (#d5d9d7): Borders and dividers.
- **Soft section** (#f2f5f3): Project, journey, and footer section background.
- **Charcoal section** (#252824): Skills section background.
- **Charcoal card** (#32352f): Skills group surface.

### Named Rules
**The Evidence Before Assertion Rule.** Keep profile and project claims accurate, and do not add figures or internal company details without public evidence.

**The Restrained Accent Rule.** Use terracotta to direct attention to a specific action or timeline detail; let neutral surfaces carry the page.

## Typography

**Display Font:** Georgia (serif)
**Body Font:** Arial, Helvetica (sans-serif)
**Label Font:** Arial, Helvetica (sans-serif)

**Character:** Georgia gives the portfolio a measured editorial voice. Arial keeps longer descriptions, navigation, and interface labels familiar and readable.

### Hierarchy
- **Display** (400, `clamp(5rem, 8.8vw, 8.7rem)`, `.9` line-height, `-.02em` tracking): Candidate name in the hero.
- **Headline** (400, `clamp(3.1rem, 5.2vw, 6rem)`, `1.04` line-height, `-.02em` tracking): Journey and contact section headings.
- **Card title** (400, `clamp(1.8rem, 2.6vw, 2.8rem)`, `1.12` line-height): Career and project titles.
- **Body** (400, `1rem`, `1.65` line-height): Profile and career descriptions.
- **Label** (700, `.7rem`, normal tracking): Navigation context, dates, and compact supporting labels.

## Layout

The main content uses a centered container capped at 1440px, with side gutters that scale with the viewport and become 20px on small screens. The hero pairs profile copy with a portrait on desktop and stacks them on mobile. Project previews use a contained visual area with supporting copy. The career journey uses a vertical timeline beside its cards and an introduction column; at 700px and below, the introduction moves above a two-column timeline and card list. The page prioritizes readable text blocks and clear section transitions over dense dashboards.

## Elevation & Depth

Depth is subtle and functional. Thin borders establish card edges; soft, low-contrast shadows separate project previews and journey cards from their backgrounds. Keep cards calm at rest and reserve stronger emphasis for interactive or scroll-linked states.

### Shadow Vocabulary
- **Journey card** (`0 18px 45px -42px #263a3570`): Soft separation from the pale journey section.
- **Project card** (`0 20px 55px -32px #3a453d5c`): Low, diffuse depth for project surfaces.
- **Preview surface** (`0 28px 45px -37px #1f232180`): Anchors illustrative interface previews.

### Named Rules
**The Thin Layer Rule.** Prefer a clear border and soft shadow over stacked, high-contrast elevation.

## Shapes

The interface combines square primary hero actions with rounded secondary controls, pill-shaped project tags, and softly rounded cards. Journey cards use a 26px radius on desktop and 19px on mobile; project cards use 28px, while their preview frames use 18px. Borders stay light and surfaces remain uncluttered.

## Components

### Buttons
- **Shape:** The hero primary action is square-cornered; secondary resume and project controls are rounded.
- **Primary:** Terracotta fill with paper text, `15px 21px` padding, and `54px` minimum height.
- **Hover / Focus:** Primary darkens on hover and lifts slightly. Keyboard focus uses a visible 2px terracotta outline with a 5px offset.
- **Secondary:** White surface and fine border; the resume action uses a 12px radius, while project actions use pill shapes.

### Chips
- **Style:** Project technology tags use a muted pale background, green-gray text, and pill radius.
- **State:** Tags describe the project stack; they are not presented as filters.

### Cards / Containers
- **Corner Style:** Journey cards are 26px desktop / 19px mobile; project cards are 28px.
- **Background:** White cards sit on a pale green-gray section surface.
- **Shadow Strategy:** Use the soft shadows described in Elevation & Depth.
- **Border:** Fine green-gray border on journey cards.
- **Internal Padding:** Journey cards use a responsive `clamp(26px, 3vw, 42px)`; project cards use 30px on desktop and 22px on small screens.

### Navigation
- **Style:** Compact bold sans-serif links centered in the desktop header, with a separate two-option language toggle.
- **States:** Links shift to terracotta on hover; the selected language uses a white surface and soft shadow.
- **Mobile:** Navigation links move to a full-width row below the brand and language toggle, with at least 44px tap targets.

### Career Timeline
The journey pairs white career cards with a fine vertical track, terracotta markers, and short connectors. Scroll-linked highlighting is restrained and respects reduced-motion preferences.

## Do's and Don'ts

### Do:
- **Do** keep the neutral-light foundation and use terracotta for focused emphasis.
- **Do** use Georgia for editorial headings and Arial for readable body copy and controls.
- **Do** preserve the distinct dark skills and contact sections as structural contrast.
- **Do** keep project descriptions factual and protect internal company details.
- **Do** preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- **Don't** add unverified metrics, testimonials, or claims.
- **Don't** introduce decorative gradient-heavy backgrounds or multiple competing accents.
- **Don't** use tight display tracking beyond the existing `-.02em` headline treatment.
