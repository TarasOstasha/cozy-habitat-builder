/**
 * Enable all homepage sections and set default order indexes.
 * Run from studio/: npx sanity exec scripts/patch-section-visibility.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})

async function patch() {
  await client
    .patch('homePage')
    .set({
      'hero.enabled': true,
      'hero.order': 10,
      'specialization.enabled': true,
      'specialization.order': 20,
      'workPreview.enabled': true,
      'workPreview.order': 30,
      'portfolio.enabled': true,
      'portfolio.order': 40,
      'services.enabled': true,
      'services.order': 50,
      'craftsmanship.enabled': true,
      'craftsmanship.order': 60,
      'partners.enabled': true,
      'partners.order': 70,
      'reviews.enabled': true,
      'reviews.order': 80,
      'contact.enabled': true,
      'contact.order': 90,
    })
    .commit()

  console.log('Enabled all homepage sections and set default order indexes.')
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
