# Den - Denvil's Portfolio

A modern, interactive portfolio website featuring a Bento grid layout, glassmorphism design, 3D effects, and premium visual experiences.

![Portfolio Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Layout & Design
- **Bento Grid Layout** - Modern, responsive grid system for content organization
- **Glassmorphism** - Premium frosted glass effect on cards and components
- **Dark/Light Theme** - Persistent theme toggle with localStorage

### Visual Effects
- **Background Effects**
  - Liquid morphing blobs
  - Gradient mesh animations
  - Aurora light effects
  - Particle stars system
- **Card Light Effects**
  - Holographic shimmer
  - Neon glow borders
  - Light sweep animation
  - Prism refraction
  - Mouse-following spotlight
  - Glowing edges

### Interactive Features
- **Magnetic Buttons** - Buttons that attract to cursor on hover
- **3D Tilt Effect** - Cards respond to mouse movement with 3D rotation
- **Swipe Navigation** - Mobile swipe gestures between pages
- **Project Reactions** - Like/react to projects (stored in localStorage)
- **Page Transitions** - Smooth fade transitions between pages
- **Scroll Animations** - Elements animate on scroll into view
- **Typewriter Effect** - Animated text typing in hero section

### Pages
- **Home** (`index.html`) - Main landing page with featured projects and timeline
- **Projects** (`projects.html`) - Complete project showcase
- **Nexus AI** (`nexus.html`) - Dedicated page for the Nexus AI bot
- **Pulse Protector** (`pulse-protector.html`) - Healthcare project details
- **Stats** (`stats.html`) - Live GitHub statistics and contribution heatmap

### Projects Featured
- **Nexus AI** - AI-powered Telegram bot [@NexusAiProbot](https://t.me/NexusAiProbot)
- **Dark Userbot** - Telegram automation bot
- **Pulse Protector** - Health monitoring application
- **MITRA AI** - Intelligent assistant
- **SYNAPSE WEB** - Modern web framework
- And more...

### Timeline
Journey from 2020 to present, including:
- Started coding (2020)
- Project Hecker (2021)
- Project X9, E-Certificate, TEAM KYRO (2022)
- Dark Userbot, Started MBBS (2023)
- Pulse Protector (2024)
- MITRA AI, Nexus AI, SYNAPSE WEB (2025)
- Future: Arduino, Robot Hardware, Pyboard/MicroPython, denx.me

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: A local web server for development

### Running Locally

**Option 1: Direct File Opening**
```bash
# Simply open index.html in your browser
open index.html
```

**Option 2: Using Python's HTTP Server**
```bash
# Navigate to the project directory
cd Den

# Start a local server
python -m http.server 8000

# Visit http://localhost:8000 in your browser
```

**Option 3: Using Node.js**
```bash
# Install serve globally (if not installed)
npm install -g serve

# Serve the directory
serve .

# Visit the provided URL
```

**Option 4: Using VS Code Live Server**
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
Den/
├── index.html              # Main landing page
├── projects.html           # Projects showcase
├── nexus.html              # Nexus AI dedicated page
├── pulse-protector.html    # Pulse Protector project page
├── stats.html              # GitHub statistics page
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with theming
│   └── js/
│       ├── main.js         # Core functionality
│       ├── magnetic.js     # Magnetic button effect
│       ├── swipe.js        # Swipe navigation
│       ├── reactions.js    # Project reactions system
│       ├── transitions.js  # Page transitions
│       ├── timeline.js     # Timeline component
│       └── stats.js        # GitHub API integration
└── logo/
    ├── denvil-3d-element.svg
    ├── harsh-3d-element.svg
    ├── nexus-ai-3d.svg
    ├── dark-userbot-3d.svg
    ├── pulse-protector-3d.svg
    └── timeline-icon.svg
```

## 🎨 Customization

### Theming
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-tertiary: #ec4899;
  /* ... more variables */
}
```

### Adding Projects
1. Add project card in the HTML grid
2. Create SVG logo in `logo/` folder
3. Add reaction buttons with `data-project` attribute

### Timeline
Edit timeline data in `assets/js/timeline.js`:
```javascript
const timelineData = [
  { year: '2020', title: 'Event', description: '...' },
  // Add more entries
];
```

## 🔧 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Respects `prefers-reduced-motion` preference
- High contrast text

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 1024px
- Touch-friendly interactions
- Swipe navigation on mobile

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Denvil**
- GitHub: [@DenxVil](https://github.com/DenxVil)
- Telegram: [@NexusAiProbot](https://t.me/NexusAiProbot)

---

Made with ❤️ and lots of ☕