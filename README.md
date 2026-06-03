# Ze2reda Landing Page

An Arabic RTL landing page for **Ze2reda**, a small playful plastic desk toy made for quick fun during work or study.

## Local Development

```bash
npm run dev
```

This starts a simple local server on port `5173` using Python. Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

This creates a static production-ready version inside the `dist/` directory.

## Editing Content

- Main page content lives in `index.html`.
- Colors, spacing, typography, and responsive layout live in `src/styles.css`.
- WhatsApp setup, order-form validation, and total-price logic live in `src/main.js`.
- Product images live in `public/assets/` and `public/assets/product/`.
- To replace product images, either keep the same file paths or update the image paths in `index.html`.
