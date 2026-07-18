/**
 * Remove duplicated contact details from homePage (kept in siteSettings).
 * Run from studio/: npx sanity exec scripts/unset-homepage-contact-details.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})

async function patch() {
  await client
    .patch('homePage')
    .unset([
      'contact.addressLine1',
      'contact.addressLine2',
      'contact.phoneDisplay',
      'contact.phoneHref',
      'contact.email',
    ])
    .commit()

  console.log('Removed address/phone/email from homePage contact (use Site Settings).')
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
