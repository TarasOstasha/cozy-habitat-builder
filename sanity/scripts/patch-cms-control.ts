/**
 * Patch Site Settings brand/nav fields + create Designers Page singleton.
 * Run from studio/: npx sanity exec scripts/patch-cms-control.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})

async function patch() {
  await client
    .patch('siteSettings')
    .setIfMissing({
      brandTagline: 'Custom Cabinetry & Design',
      headerNavLinks: [
        {_key: 'portfolio', label: 'Portfolio', href: '/portfolio'},
        {_key: 'designers', label: 'For Designers', href: '/designers'},
        {_key: 'contact', label: 'Contact', href: '/#contact'},
      ],
    })
    .commit()

  await client.createIfNotExists({
    _id: 'designersPage',
    _type: 'designersPage',
    seo: {
      title: 'For Designers · SEMTA Custom Cabinetry & Design',
      description:
        'SEMTA partners with interior designers, architects and builders across Connecticut. Trade consultations, shop drawings, custom millwork and installation.',
      ogTitle: 'For Designers · SEMTA',
      ogDescription:
        'Trade consultations, shop drawings, custom millwork and installation for designers across Connecticut.',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    },
    eyebrow: 'For Designers',
    title: 'A fabrication partner for your vision.',
    body: 'SEMTA works closely with interior designers, architects, and builders across Connecticut. We translate detailed drawings into precision-built cabinetry - with reliable timelines, open communication, and installation by our own team.',
    highlights: [
      {_key: 'h1', text: 'Trade consultations and shop drawings'},
      {_key: 'h2', text: 'Custom millwork for residential and commercial'},
      {_key: 'h3', text: 'Material samples and finish coordination'},
    ],
    formEyebrow: 'Get in Touch',
    formTitle: 'Start a designer inquiry.',
    messagePlaceholder:
      'Tell us about your project, timeline, and how we can support your design.',
    submitLabel: 'Send Message',
  })

  console.log('Patched siteSettings brand/nav and created designersPage if missing.')
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
