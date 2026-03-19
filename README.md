# PyTalavera - Comunidad Python de Puebla

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
│   ├── main.css                  # Core design system
│   ├── talavera-patterns.css    # Decorative elements
│   └── responsive.css            # Mobile-first responsive
├── js/
│   ├── main.js                   # Navigation & interactions
│   └── language.js               # Bilingual toggle
├── assets/
│   ├── images/
│   │   ├── logo.svg              # PyTalavera logo
│   │   ├── talavera-patterns/    # SVG decorative patterns
│   │   ├── team/                 # Team member photos
│   │   └── sponsors/             # Sponsor logos
│   └── icons/                    # Social media icons
└── blog/
    └── posts/                    # Blog post pages
```

## 🎨 Design System

### Talavera Color Palette
Based on traditional Puebla Talavera pottery:

- **Cobalt Blue** (#1E3A8A) - Primary brand color
- **Burnt Orange** (#D97706) - CTAs and accents
- **Mauve/Purple** (#7C3AED) - Secondary accents
- **Forest Green** (#059669) - Success states
- **Warm Yellow** (#F59E0B) - Highlights
- **White** (#FFFFFF) - Backgrounds
- **Rich Black** (#1F2937) - Typography

### Typography
- **Headings**: Montserrat (bold, geometric)
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
