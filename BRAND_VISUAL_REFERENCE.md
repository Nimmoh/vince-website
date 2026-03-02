# 🎨 Brand Visual Reference

## Quick Visual Guide for Vincevic Shades Interprises

### 🎯 Logo Usage at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                    WHEN TO USE WHAT                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Dark Background (Website Header, Dark Emails)              │
│  → Use: logo.svg                                            │
│  → Colors: White text + Gold accents                        │
│                                                             │
│  Light Background (Print, Documents, Light Emails)          │
│  → Use: logo-light.svg                                      │
│  → Colors: Dark text + Gold accents                         │
│                                                             │
│  Square Format (Social Media Profiles)                      │
│  → Use: logo-square.svg                                     │
│  → Size: 400x400px                                          │
│                                                             │
│  Browser Tab                                                │
│  → Use: favicon.svg                                         │
│  → Size: 32x32px (auto-scaled)                             │
│                                                             │
│  Mobile Home Screen                                         │
│  → Use: icon.svg (Android) or apple-touch-icon.svg (iOS)   │
│  → Size: 512x512 / 180x180                                 │
│                                                             │
│  Social Media Sharing                                       │
│  → Use: og-image.svg                                        │
│  → Size: 1200x630px                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Palette Reference

```css
/* Primary Colors */
--ink:        #0f1117  /* █████ Dark background */
--gold:       #c9a84c  /* █████ Primary gold */
--gold-light: #e4c97a  /* █████ Light gold */
--gold-dim:   #8a6f34  /* █████ Dark gold */
--surface:    #f7f5f0  /* █████ Light background */
--white:      #ffffff  /* █████ Pure white */

/* Usage Examples */
Background (Dark):  #0f1117
Background (Light): #f7f5f0
Primary Accent:     #c9a84c
Highlights:         #e4c97a
Shadows:            #8a6f34
Text (on dark):     #ffffff
Text (on light):    #0f1117
```

## 📐 Logo Dimensions

```
Horizontal Logo (logo.svg / logo-light.svg)
┌────────────────────────────────┐
│  [Icon]  VINCEVIC SHADES       │  200px × 60px
│          INTERPRISES           │  Aspect: 10:3
└────────────────────────────────┘

Square Logo (logo-square.svg)
┌──────────────┐
│   [Icon]     │
│              │  400px × 400px
│  VINCEVIC    │  Aspect: 1:1
│   SHADES     │
└──────────────┘

Main Icon (icon.svg)
┌──────────────┐
│              │
│   [Gazebo]   │  512px × 512px
│      VS      │  Aspect: 1:1
│              │
└──────────────┘
```

## 🎯 Minimum Sizes

```
Logo (Horizontal):
  Minimum width:  120px
  Recommended:    200px
  Maximum:        No limit (SVG scales)

Logo (Square):
  Minimum:        100px × 100px
  Recommended:    400px × 400px
  Maximum:        No limit (SVG scales)

Icon:
  Minimum:        48px × 48px
  Recommended:    512px × 512px
  Maximum:        No limit (SVG scales)

Favicon:
  Fixed:          32px × 32px
  (Browser auto-scales)
```

## 📱 Platform-Specific Sizes

```
iOS App Icon:
  180×180px  → apple-touch-icon.svg

Android App Icon:
  512×512px  → icon.svg

Browser Favicon:
  32×32px    → favicon.svg

PWA Splash Screen:
  512×512px  → icon.svg

Social Media Profile:
  400×400px  → logo-square.svg

Social Media Share:
  1200×630px → og-image.svg
```

## 🎨 Typography Pairing

```
Headings (Elegant, Formal)
┌─────────────────────────────────┐
│  Cormorant Garamond             │
│  Weights: 400, 500, 600, 700    │
│  Style: Serif                   │
│  Use: Titles, headings, logo    │
└─────────────────────────────────┘

Body Text (Clean, Modern)
┌─────────────────────────────────┐
│  DM Sans                        │
│  Weights: 300, 400, 500, 600    │
│  Style: Sans-serif              │
│  Use: Body, buttons, UI         │
└─────────────────────────────────┘
```

## 🎯 Clear Space Rules

```
Minimum clear space around logo:

┌─────────────────────────────────┐
│                                 │
│    ┌───────────────────┐        │
│    │                   │        │
│    │   [LOGO]          │  ← 20px minimum
│    │                   │        │
│    └───────────────────┘        │
│                                 │
└─────────────────────────────────┘
     ↑
   20px minimum
```

## 🎨 Background Combinations

```
✅ GOOD COMBINATIONS:

Dark Background + Gold Logo
█████████████████████████
█████████████████████████  #0f1117 + #c9a84c
█████  [LOGO]  ██████████
█████████████████████████

Light Background + Dark Logo
░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░  #f7f5f0 + #0f1117
░░░░  [LOGO]  ░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░

Gold Background + Dark Text
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  #c9a84c + #0f1117
▓▓▓▓  [LOGO]  ▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓


❌ AVOID:

Gold on Light (Low contrast)
░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░  [LOGO]  ░░░░░░░░░░░  ← Hard to read
░░░░░░░░░░░░░░░░░░░░░░░░░

Dark on Dark (No contrast)
█████████████████████████
█████  [LOGO]  ██████████  ← Invisible
█████████████████████████
```

## 📊 File Size Reference

```
All SVG files are optimized:

favicon.svg           ~2 KB
icon.svg              ~4 KB
apple-touch-icon.svg  ~3 KB
logo.svg              ~3 KB
logo-light.svg        ~3 KB
logo-square.svg       ~4 KB
og-image.svg          ~6 KB

Total: ~25 KB for all assets
(Extremely lightweight!)
```

## 🎯 Export Settings (If Converting to PNG)

```
For Web:
  Format: PNG-24
  Resolution: 72 DPI
  Color: RGB
  Transparency: Yes

For Print:
  Format: PNG-24 or PDF
  Resolution: 300 DPI
  Color: CMYK (for print)
  Transparency: Optional

For Social Media:
  Format: PNG or JPG
  Resolution: 72 DPI
  Color: RGB
  Quality: 90%
```

## 🎨 Icon Design Elements

```
The icon represents:

    ◯  ← Top ornament (elegance)
    │
   ╱│╲  ← Curved roof (protection)
  ╱ │ ╲
 ╱  │  ╲
│   │   │ ← Three columns (stability)
│   │   │
│   │   │
└───┴───┘ ← Base platform (foundation)

   VS    ← Brand initials
```

## 📱 Responsive Logo Usage

```
Desktop (>1024px):
  Use: logo.svg (200px width)
  Position: Header left

Tablet (768-1024px):
  Use: logo.svg (160px width)
  Position: Header left

Mobile (<768px):
  Use: icon.svg (48px square)
  Position: Header center
  OR logo.svg (120px width)
```

## 🎯 Brand Personality

```
Visual Attributes:
  ✓ Elegant
  ✓ Professional
  ✓ Premium
  ✓ Trustworthy
  ✓ Sophisticated
  ✓ Stable
  ✓ Modern yet timeless

Avoid:
  ✗ Playful
  ✗ Casual
  ✗ Cheap-looking
  ✗ Overly complex
  ✗ Trendy (dates quickly)
```

## 📋 Quick Checklist

```
Before using any logo:
□ Correct version for background?
□ Sufficient clear space?
□ Minimum size maintained?
□ Colors not altered?
□ Aspect ratio preserved?
□ Legible at intended size?
□ High enough resolution?
□ Proper file format?
```

## 🎨 Color Accessibility

```
Contrast Ratios (WCAG AA):

Dark text on Light bg:  21:1  ✅ Excellent
Gold on Dark bg:        4.5:1 ✅ Good
Gold on Light bg:       2.8:1 ⚠️  Use carefully
Light text on Dark bg:  21:1  ✅ Excellent

Always test readability!
```

## 📞 Quick Reference Card

```
╔════════════════════════════════════════╗
║  VINCEVIC SHADES INTERPRISES          ║
║  Brand Quick Reference                 ║
╠════════════════════════════════════════╣
║                                        ║
║  Primary Color:    #c9a84c (Gold)     ║
║  Background:       #0f1117 (Dark)     ║
║  Light BG:         #f7f5f0 (Cream)    ║
║                                        ║
║  Heading Font:     Cormorant Garamond ║
║  Body Font:        DM Sans            ║
║                                        ║
║  Logo Files:       /public/*.svg      ║
║  Min Logo Width:   120px              ║
║  Clear Space:      20px all sides     ║
║                                        ║
╚════════════════════════════════════════╝
```

---

**Keep this reference handy when creating any brand materials!**

All assets are in `/public/` directory and ready to use.
