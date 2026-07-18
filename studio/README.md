# SEMTA Sanity Studio

Content backend for the SEMTA website.

- **Project ID:** `sgbbdc2e`
- **Dataset:** `production`
- **Manage:** https://www.sanity.io/manage/project/sgbbdc2e

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
