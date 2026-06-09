# Matt Solutions & Services LLC — Website

Static website for **Matt Solutions & Services LLC**, a computer repair and IT support business serving South Florida.

**Live site:** [mattsolutionsfl.com](https://mattsolutionsfl.com)  
**Phone:** (754) 270-8385  
**Email:** mattsolutionsfl@gmail.com

---

## File Structure

```
matt-solutions-site/
├── index.html          # Homepage (hero, services overview, FAQ, CTA)
├── services.html       # Full services detail page
├── about.html          # About the business and values
├── contact.html        # Contact form + phone/WhatsApp/email
├── service-areas.html  # Deerfield Beach, Boca Raton, Pompano, Fort Lauderdale
├── styles.css          # All styles — dark navy/blue premium theme
├── script.js           # Navbar, FAQ accordion, Formspree handler, animations
├── robots.txt          # Allows all crawlers, points to sitemap
├── sitemap.xml         # XML sitemap for all 5 pages
└── README.md           # This file
```

---

## Local Preview

No build step required. Open directly in a browser:

**Option 1 — Double-click** `index.html` to open in your default browser.

**Option 2 — VS Code Live Server (recommended for accurate preview):**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open the `matt-solutions-site` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**
4. Site opens at `http://127.0.0.1:5500`

**Option 3 — Python (if installed):**
```bash
cd matt-solutions-site
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Formspree Contact Form Setup

The contact form on `contact.html` is wired for [Formspree](https://formspree.io) (free tier supports 50 submissions/month).

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form** → name it "Matt Solutions Contact"
3. Copy your form endpoint (e.g. `https://formspree.io/f/xpzgkwab`)
4. Open `contact.html` and find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual form ID
6. Save and push — the form is now live

Formspree sends all submissions to `mattsolutionsfl@gmail.com` (configure this in your Formspree dashboard).

---

## Deploy to GitHub

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click **New repository**
3. Name it `mattsolutionsfl-website` (or any name you prefer)
4. Set it to **Public**
5. Do **not** initialize with a README (you already have one)
6. Click **Create repository**

### Step 2 — Push the files

Open Terminal, navigate to your project folder, and run:

```bash
cd ~/path/to/matt-solutions-site

git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mattsolutionsfl-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Deploy with Cloudflare Pages

Cloudflare Pages hosts static sites for free with global CDN, automatic HTTPS, and unlimited bandwidth.

### Step 1 — Connect your repo

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign in or create a free account
3. In the left sidebar: **Workers & Pages** → **Create** → **Pages**
4. Click **Connect to Git** → authorize GitHub → select your repository
5. Configure the build:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave empty)
6. Click **Save and Deploy**

Cloudflare will deploy in about 60 seconds and give you a URL like `mattsolutionsfl-website.pages.dev`.

### Step 2 — Connect your custom domain

1. In your Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `mattsolutionsfl.com` → click **Continue**
3. Cloudflare will show you DNS records to add

---

## Connect mattsolutionsfl.com

### If your domain is registered with Cloudflare (easiest path):

DNS is managed automatically when you add the custom domain in Pages — nothing extra to do.

### If your domain is registered elsewhere (GoDaddy, Namecheap, etc.):

**Option A — Point nameservers to Cloudflare (recommended):**
1. In Cloudflare: add your site → copy the two Cloudflare nameservers
2. In your registrar's DNS settings: replace existing nameservers with Cloudflare's
3. Wait up to 24 hours for propagation
4. Then add the custom domain in Cloudflare Pages as above

**Option B — Add CNAME record at your registrar:**
1. In your registrar's DNS settings, add:
   - Type: `CNAME`
   - Name: `@` (or `www`)
   - Value: `mattsolutionsfl-website.pages.dev`
2. For the root domain (`@`), some registrars require an `ALIAS` or `ANAME` record instead of CNAME

Cloudflare provides free SSL/TLS automatically once the domain is connected — HTTPS is handled with no extra steps.

---

## After Launch Checklist

- [ ] Replace `YOUR_FORM_ID` in `contact.html` with your Formspree endpoint
- [ ] Submit `https://mattsolutionsfl.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify the site in Google Search Console (HTML tag method works easily with Cloudflare Pages)
- [ ] Test click-to-call on a mobile device
- [ ] Test the WhatsApp button on a mobile device
- [ ] Send a test message through the contact form
- [ ] Update the `lastmod` dates in `sitemap.xml` whenever you make significant changes

---

## Making Updates

Edit any `.html`, `.css`, or `.js` file, then push to GitHub:

```bash
git add .
git commit -m "Update [describe what changed]"
git push
```

Cloudflare Pages detects the push and redeploys automatically in about 60 seconds.
