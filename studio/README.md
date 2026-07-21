# SEMTA Sanity Studio

Content backend for the SEMTA website.

- **Project ID:** `43r4kll9`
- **Dataset:** `production`
- **Manage:** https://www.sanity.io/manage/project/43r4kll9

## Commands

```bash
npm run dev            # Studio at http://localhost:3333
npm run seed           # Re-seed homepage + settings + partners
npm run schema:deploy  # Deploy schema after local changes
npm run deploy         # Deploy hosted Studio
```

## Content model

| Document | Purpose |
|----------|---------|
| **Site Settings** | Brand, **Footer** (logo, tagline, nav links), phone/email/address, SEO defaults |
| **Home Page** | Tabbed settings for every homepage section (Hero, Specialization, Our Work + featured projects, Portfolio, Services, Craftsmanship, Partners, Contact) |
| **Partners** | Partner logos shown in the partners carousel |
