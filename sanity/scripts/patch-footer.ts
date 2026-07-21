/**
 * Patch Site Settings footer fields.
 * Run from studio/: npx sanity exec scripts/patch-footer.ts --with-user-token
 */
import {createReadStream} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

async function patch() {
  const logoPath = path.join(repoRoot, 'src/assets/semta-logo.jpg')
  const asset = await client.assets.upload('image', createReadStream(logoPath), {
    filename: 'semta-logo.jpg',
  })

  await client
    .patch('siteSettings')
    .set({
      footerLogo: {
        _type: 'image',
        asset: {_type: 'reference', _ref: asset._id},
        alt: 'SEMTA',
      },
      footerTagline: 'SEMTA · Custom Cabinetry & Design',
      footerNavLinks: [
        {_key: 'home', label: 'Home', href: '/'},
        {_key: 'about', label: 'About', href: '/#services'},
        {_key: 'portfolio', label: 'Portfolio', href: '/portfolio'},
        {_key: 'designers', label: 'For Designers', href: '/designers'},
        {_key: 'contact', label: 'Contact Us', href: '/#contact'},
      ],
    })
    .commit()

  console.log('Patched siteSettings footer logo, tagline, and navigation.')
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
