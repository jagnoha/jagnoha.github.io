# Javier Gonzalez Noha — Portfolio

A static, zero-build portfolio designed for GitHub Pages. The site uses semantic HTML, a shared responsive CSS system, and a small progressive-enhancement script.

## Structure

- `index.html` — homepage, experience, expertise, and contact
- `projects/` — engineering project deep dives
- `assets/css/site.css` — shared visual system and responsive layouts
- `assets/js/site.js` — theme, mobile navigation, header, and reveal behavior
- `sitemap.xml`, `robots.txt`, `404.html` — search and hosting support

## Local preview

Run any static file server from the repository root, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Resume assets

The site publishes two downloadable, repository-relative PDF résumés:

- `assets/resumes/senior-full-stack-platform.pdf` — primary Senior Full-Stack & Platform Engineer résumé
- `assets/resumes/senior-ai-platform.pdf` — alternative Senior AI & Platform Engineer résumé

The primary résumé is linked from site navigation, and both variants are available in the homepage contact section.
