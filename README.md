# Terrastory

Website for **Terrastory**, a map studio by Kavya Agrawal.
*Every place has a story. We map it.*

Plain HTML, CSS and JavaScript. No build step. Hosted on GitHub Pages: https://kavyaagrawal-02.github.io/terrastory/

## Files

| File | What it is |
|---|---|
| `index.html` | Home page (services overview, work, about, FAQ) |
| `gifts.html`, `resorts.html`, `land.html`, `research.html`, `professionals.html` | Pages for each audience |
| `contact.html` | Contact page: WhatsApp, form, email, Instagram, payment |
| `style.css` | All design: colours, fonts, layout, night map |
| `script.js` | Your links (WhatsApp, form, Instagram, email, UPI QR) at the top, plus small interactions |
| `privacy.html`, `terms.html` | Legal pages |
| `404.html` | "Page not found" page |
| `favicon.svg` | Browser tab icon |
| `images/` | Gallery samples, social preview image, UPI QR |
| `robots.txt`, `sitemap.xml` | Help Google find the site |

## Quick edits (on the GitHub website)

**Your links:** open `script.js`, click the pencil icon, and change the five values in the box at the top:

```js
whatsapp: "91XXXXXXXXXX",     // country code + number, digits only
form: "GOOGLE_FORM_LINK",     // your Google Form link
instagram: "INSTAGRAM_LINK",
email: "EMAIL",
upiQr: "images/upi-qr.svg"    // change to "images/upi-qr.png" after uploading your QR
```

**Your own map photos:** upload a photo into `images/` with the same name as the sample it replaces
(`work-1.webp` … `work-6.webp`), or upload a `.jpg` and change the matching `src` in `index.html`.
Update the caption and `alt` text next to it.

**Domain:** the site currently uses `https://kavyaagrawal-02.github.io/terrastory/`. When you buy a domain, replace that address in all `.html` files, `robots.txt` and `sitemap.xml`.
