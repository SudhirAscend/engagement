# Reception Invitation Website

A modern, mobile-first, single-page reception invitation website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Hero Section**: Above-the-fold display with couple names, event details, and action buttons
- **Lottie Animation**: Subtle couple animation (replace with your own)
- **Action Buttons**: One-click actions for Maps, WhatsApp, Call, and Calendar
- **Event Timeline**: Visual schedule of the reception
- **Photo Gallery**: Responsive image grid with lightbox
- **Venue Information**: Complete venue details with parking info
- **Couple Message**: Personalized message section
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **SEO Optimized**: Meta tags and Open Graph support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Animation Library**: Lottie React

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Customize the event details in `config/eventConfig.ts`:
   - Update couple names
   - Set date, time, and venue information
   - Add contact numbers and links
   - Replace gallery image URLs
   - Customize the couple message

3. Replace the Lottie animation (optional):
   - Place your custom Lottie JSON file at `public/lottie/couple-animation.json`
   - Or keep the sample animation provided

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Event Configuration

All customizable values are in `config/eventConfig.ts`. Update:

- **Couple Information**: `groomName`, `brideName`
- **Event Details**: `eventTitle`, `eventSubtext`
- **Date & Time**: `date`, `time`
- **Venue**: `venueName`, `venueAddress`, `venueLandmark`, `parkingInfo`
- **Contact**: `mapsUrl`, `whatsappNumber`, `phoneNumber`
- **Gallery**: `galleryImages` array
- **Message**: `coupleMessage`
- **Developer Credit**: `developerCredit`

### Primary Accent Color

To change the primary accent color, update the CSS variable in `app/globals.css`:

```css
:root {
  --primary: #d4a574; /* Change this to your preferred color */
  --primary-dark: #b89464;
  --primary-light: #e8c5a0;
}
```

### Fonts

The project uses:
- **Playfair Display** (serif) for headings
- **Inter** (sans-serif) for body text

To change fonts, update `app/layout.tsx` and import different Google Fonts.

## Project Structure

```
engagement/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles and Tailwind config
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── ActionButtons.tsx    # Action buttons
│   ├── CoupleAnimation.tsx  # Lottie animation
│   ├── CalendarModal.tsx    # Calendar options modal
│   ├── Timeline.tsx         # Event timeline
│   ├── Gallery.tsx          # Photo gallery
│   ├── VenueInfo.tsx        # Venue information
│   ├── Message.tsx          # Couple message
│   └── Footer.tsx           # Footer credit
├── config/
│   └── eventConfig.ts       # Event configuration
└── public/
    └── lottie/
        └── couple-animation.json  # Lottie animation file
```

## Building for Production

```bash
npm run build
npm start
```

## Notes

- The page is designed to be opened from QR codes, so it's optimized for quick loading
- All animations are optimized for performance
- Images should be optimized before adding to the gallery
- The calendar modal generates .ics files and provides links to major calendar services
- No RSVP functionality is included (as per requirements)

## License

This project is private and created for a specific event.
