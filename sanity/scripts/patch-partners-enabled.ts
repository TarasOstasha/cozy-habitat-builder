/**
 * Enable all partner documents by default.
 * Run from studio/: npx sanity exec scripts/patch-partners-enabled.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})

async function patch() {
  const partners = await client.fetch<{_id: string}[]>(`*[_type == "partner"]{_id}`)

  const transaction = client.transaction()
  for (const partner of partners) {
    transaction.patch(partner._id, (p) => p.set({enabled: true}))
  }
  await transaction.commit()

  console.log(`Enabled ${partners.length} partner(s).`)
}

patch().catch((error) => {
  console.error(error)
  process.exit(1)
})
