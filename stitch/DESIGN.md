---
name: Pulse Card Desk
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#424656'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#737687'
  outline-variant: '#c2c6d9'
  surface-tint: '#0053da'
  primary: '#004cca'
  on-primary: '#ffffff'
  primary-container: '#0062ff'
  on-primary-container: '#f3f3ff'
  inverse-primary: '#b4c5ff'
  secondary: '#00677f'
  on-secondary: '#ffffff'
  secondary-container: '#00ccf9'
  on-secondary-container: '#005266'
  tertiary: '#9e3100'
  on-tertiary: '#ffffff'
  tertiary-container: '#c84000'
  on-tertiary-container: '#fff1ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  data-table:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin-mobile: 16px
  margin-desktop: 24px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for high-density task management and deterministic data environments. It prioritizes utility over aesthetics, following a **refined minimalist** approach with subtle **brutalist** structural influences. The visual narrative is "Industrial Precision": every element serves a functional purpose, utilizing whitespace not for decoration, but for visual separation of dense data sets. 

The target audience consists of power users who require high information density and low cognitive load. The UI should evoke a sense of reliability, speed, and technical mastery. Avoid all decorative gradients, organic shapes, or illustrative fluff.

## Colors
The palette is dominated by a range of neutral grays to provide a "quiet" foundation for complex data. 
- **Primary (Electric Blue):** Reserved strictly for active states, primary actions, and critical focus indicators. 
- **Neutral Scale:** Uses a cool-toned gray scale. Backgrounds utilize a very light gray to reduce eye strain compared to pure white, while surfaces (cards/containers) remain white for maximum contrast.
- **Pulse Accent:** Emerald Green is used sparingly for status indicators and "online" signals to provide a high-contrast visual "pulse" against the neutral backdrop.
- **Borders:** A consistent #E5E7EB is used for structural definition.

## Typography
Typography is the primary driver of hierarchy. **Inter** is used for all UI labels and body text to ensure maximum legibility at small sizes. **JetBrains Mono** is introduced for technical data, IDs, timestamps, and status labels to reinforce the utility-first aesthetic and ensure character alignment in dense lists.

Scale is kept tight; avoid large display type. Content should feel compact and efficient. On mobile, headlines scale down slightly, but body text remains constant to preserve readability.

## Layout & Spacing
This design system utilizes a **fluid grid** with a strict 4px baseline rhythm. 
- **Density:** Elements are packed tightly. Default padding for cards is 12px or 16px. 
- **Column System:** A 12-column grid for desktop, 6-column for tablet, and 4-column for mobile.
- **Alignment:** All elements must align to the grid edges. Use "Inner Gutters" within cards to maintain a structured, table-like feel throughout the application.
- **Reflow:** On mobile, sidebars collapse into a bottom navigation bar or a compact hamburger menu to prioritize the "Card Desk" workspace.

## Elevation & Depth
Depth is communicated through **Low-contrast outlines** rather than shadows. 
- **Surface Tiering:** Use background color shifts (e.g., a slightly darker gray for the workspace background and white for the cards) to create a sense of layering.
- **Borders:** Every card and interactive element has a 1px solid border. 
- **Active State:** Use a 2px primary color border or a subtle 4px blur shadow only when an element is "Focused" or "Selected" to indicate system priority.
- **Backdrop:** No glassmorphism or blurs. Layers are opaque to maintain high performance and visual clarity.

## Shapes
Shapes are functional and sharp. A "Soft" setting (4px radius) is used globally for buttons and cards to prevent the UI from feeling overly aggressive while maintaining a professional, structured appearance. 
- **Inputs & Buttons:** 4px radius.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from structural blocks.
- **Icons:** Use square-ended strokes (2px weight) to match the technical nature of the system.

## Components
- **Compact Cards:** Should have a 1px border (#E5E7EB) and no shadow. Headers should be separated by a subtle horizontal rule.
- **Buttons:** 
  - *Primary:* Solid Electric Blue with white text. 
  - *Secondary:* Ghost style with 1px border. 
  - *Utility:* Icon-only, 32x32px hit area, neutral gray icons that turn primary on hover.
- **Lists:** High-density rows with 8px vertical padding. Use JetBrains Mono for secondary metadata.
- **Toggles:** Small, rectangular switches rather than rounded ones to fit the industrial aesthetic.
- **Input Fields:** Flat background (#F9FAFB) with a 1px bottom border that transforms into a full primary border on focus.
- **Chips/Status:** Compact, utilizing the "Pulse" Emerald Green for active/healthy states and a muted gray for inactive states.