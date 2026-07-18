/**
 * Enable all homepage sections by default.
 * Run from studio/: npx sanity exec scripts/patch-section-visibility.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})

async function patch() {
  await client
    .patch('homePage')
    .set({
      'hero.enabled': true,
      'specialization.enabled': true,
      'workPreview.enabled': true,
      'portfolio.enabled': true,
      'services.enabled': true,
      'craftsmanship.enabled': true,
      'partners.enabled': true,
      'contact.enabled': true,
    })
    .commit()

  console.log('Enabled all homepage sections.')
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
