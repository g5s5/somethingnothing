# Something Nothing

A curated lifestyle studio website featuring design-led products across tech, home, workspace, carry, and style.

## 🌐 Live Preview

Open `index.html` in your browser to preview locally, or deploy with the methods below.

## 📁 Structure

```
somethingnothing/
├── index.html        # Home / Discover page
├── browse.html       # Full product collection
├── about.html        # About the studio
├── contact.html      # Contact form & info
├── styles.css        # Design system & layout
├── script.js         # Interactions & animations
├── assets/           # Product images
│   ├── speaker.png
│   ├── coffee.png
│   ├── lamp.png
│   ├── wallet.png
│   ├── keyboard.png
│   ├── watch.png
│   ├── backpack.png
│   └── vase.png
└── README.md
```

## 🚀 Deployment

### GitHub Pages (Recommended — Free)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/g5s5/somethingnothing.git
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Click **Save**

3. Connect your GoDaddy domain:
   - In GitHub Pages settings, add your custom domain
   - In GoDaddy DNS, add these records:
     - **A Records** pointing to GitHub's IPs:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
     - **CNAME Record**: `www` → `g5s5.github.io`
   - Enable **Enforce HTTPS** in GitHub Pages settings

### Netlify (Alternative)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo → Deploy
4. Add custom domain in Netlify settings

### Vercel (Alternative)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import
3. Deploy → Add custom domain

## ✏️ Customization

- **Colors**: Edit CSS custom properties in `styles.css` under `:root`
- **Products**: Add/edit `<article class="product-card">` blocks in the HTML
- **Images**: Replace files in `assets/` (recommended: square, 800×800px minimum)

## 📄 License

MIT
