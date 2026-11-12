# PyTalavera · Comunidad Pythonista en Puebla

Official website for PyTalavera, the Python community in Puebla, Mexico.

## 🎨 About

PyTalavera is a bilingual (Spanish/English) community website featuring traditional Talavera pottery-inspired design. The site connects Python developers, organizes events, and builds community in Puebla.

## 🚀 Project Status

### ✅ Completed
- Project structure and directories
- Talavera SVG patterns and decorative elements
- Complete CSS design system with Talavera color palette
- Talavera-specific decorative CSS
- Responsive CSS (mobile-first)
- Bilingual language toggle (JavaScript)
- Main JavaScript for navigation and interactions
- Homepage with all main sections

### 🚧 In Progress
- Additional pages (Events, Team, Sponsors, Blog, Code of Conduct)
- Content collection (photos, bios, social media links)
- Google Forms creation
- Instagram feed integration
- Luma calendar integration

## 📁 Project Structure

```
/comunidad/
├── index.html                     # Homepage
├── css/
│   ├── tokens.css                # Tokens de marca (fuente de verdad)
│   ├── main.css                  # Core design system
│   ├── talavera-patterns.css    # Decorative elements
│   └── responsive.css            # Mobile-first responsive
├── js/
│   ├── main.js                   # Navigation & interactions
│   └── language.js               # Bilingual toggle
├── assets/
│   ├── images/
│   │   ├── logo.svg              # Sello (copia de logos/logo1.svg, se conserva por compatibilidad)
│   │   ├── logos/                # Logos oficiales y versiones a una tinta
│   │   ├── favicon/              # Favicon oficial (.ico, .svg, PNG 16–512, apple-touch-icon)
│   │   ├── talavera-patterns/    # SVG decorative patterns
│   │   ├── team/                 # Team member photos
│   │   └── sponsors/             # Sponsor logos
│   └── icons/                    # Social media icons
└── blog/
    └── posts/                    # Blog post pages
```

## 🎨 Design System

### Sistema de marca PyTalavera
La fuente de verdad son `css/tokens.css` y `assets/brand/tokens.json`. Los textos oficiales están en `assets/brand/descripciones-oficiales.md`.

**Paleta del sello**
- **Amarillo** `#FFCC00` — acentos y decoración. Nunca como texto sobre blanco (1.51:1); sí sobre azul (6.68:1) o tinta (11.55:1).
- **Azul Talavera** `#0232AF` — color principal (10.11:1 sobre blanco).
- **Azul brillante** `#1D40D9` — hover y acentos (7.53:1 sobre blanco).

**Neutros**
- **Tinta** `#0B1640` — texto y pie de página.
- **Crema** `#FFF8E6` — fondos alternos.
- **Blanco** `#FFFFFF`.

**Logos** (`assets/images/logos/`)
- `logo1.svg` isotipo a color (el sello completo), `logo2.svg` isotipo negro, `logo3.svg` lockup vertical, `logo4.svg` lockup horizontal.
- `una-tinta/` versiones a una tinta (blanco, negro, tinta). Sobre fondos azules va la versión a una tinta en blanco.
- Nunca se recolorea el sello y se usa completo en todos los tamaños (no hay isotipo simplificado).
- Favicon oficial: sello completo sobre disco blanco, en `assets/images/favicon/`.

**Patrón Talavera**: `assets/images/talavera-patterns/patron-talavera-tile-azul.svg` y `patron-talavera-tile-crema.svg`.

### Typography
- **Titulares**: Literata Italic 700 (Google Fonts)
- **Código**: JetBrains Mono
- **Body**: Inter (clean, readable)
- **Fluid sizing**: Uses `clamp()` for responsive typography

## 🌐 Bilingual Support

The site supports Spanish (default) and English using:

- HTML `lang` attribute switching
- `data-lang` attributes for inline content
- `.lang-es` and `.lang-en` classes for block content
- LocalStorage to persist language preference

**Toggle language:**
```javascript
PyTalaveraLang.toggle(); // Switch between ES/EN
PyTalaveraLang.set('es'); // Set specific language
PyTalaveraLang.get(); // Get current language
```

## 🛠️ Development

### Local Development

1. Clone the repository
2. Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server extension
```

3. Visit `http://localhost:8000`

### Editing Content

Content is managed through HTML files. Each page has bilingual content using `data-lang` attributes:

```html
<h1>
  <span data-lang="es">Título en Español</span>
  <span data-lang="en">Title in English</span>
</h1>
```

## 📝 Next Steps

### Content Needed

1. **Team Member Information**
   - Photos (400x400px minimum)
   - Names, roles, bios (2-3 sentences)
   - Social media links

2. **Social Media URLs**
   - Instagram: @pytalavera
   - LinkedIn company page
   - WhatsApp group/channel
   - Luma calendar page
   - YouTube channel
   - GitHub organization

3. **Google Forms**
   - Sponsor form
   - Speaker proposal form
   - Contact form

4. **Sponsor Information**
   - Logos (SVG or PNG, transparent background)
   - Descriptions (for Gold tier)
   - Website URLs

### Pages to Create

1. **eventos.html** - Events page with Luma calendar embed
2. **equipo.html** - Team/organizers page
3. **patrocinadores.html** - Sponsors page
4. **blog.html** - Blog listing page
5. **codigo-de-conducta.html** - Code of Conduct (bilingual)

### Integrations to Configure

1. **Luma Calendar**
   - Get embed code from Luma dashboard
   - Add to eventos.html

2. **Instagram Feed** (Optional)
   - Set up NoCodeAPI account
   - Generate Instagram feed URL
   - Add embed script to index.html

3. **Google Forms**
   - Create 3 forms (sponsor, speaker, contact)
   - Update links in footer and relevant pages

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from `main` branch
4. Folder: `/ (root)`
5. Save

Site will be live at: `https://[username].github.io/comunidad/`

### Custom Domain (Optional)

1. Add `CNAME` file with domain name
2. Configure DNS A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Enable HTTPS in GitHub Pages settings

## 📋 Features

- ✅ Bilingual (Spanish/English) with language toggle
- ✅ Responsive design (mobile-first)
- ✅ Talavera pottery-inspired aesthetics
- ✅ Mobile navigation menu
- ✅ Smooth scrolling
- ✅ Lazy loading images
- ✅ Scroll animations
- ✅ Accessibility (WCAG AA compliant)
- ✅ SEO optimized with meta tags
- 🚧 Luma calendar integration (ready to add)
- 🚧 Instagram feed (ready to add)
- 🚧 Google Forms integration (ready to link)

## 🎯 Performance Targets

- Lighthouse score: >90 all categories
- Page load: <2s on 3G
- Total page weight: <1.5MB
- Mobile-friendly: ✅

## 📞 Contact

- **Email**: hola@pytalavera.org
- **Code of Conduct**: conducta@pytalavera.org
- **Instagram**: @pytalavera
- **GitHub**: github.com/pytalavera

## 📄 License

© 2026 PyTalavera. All rights reserved.

---

**Made with 💙 and 🐍 in Puebla, Mexico**
