/**
 * Seed singleton documents with current homepage + portfolio copy.
 * Run from studio/: npm run seed
 */
import {createReadStream, readdirSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-17'})
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

async function uploadImage(relativePath: string, filename: string) {
  const absolutePath = path.join(repoRoot, relativePath)
  const asset = await client.assets.upload('image', createReadStream(absolutePath), {
    filename,
  })
  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: asset._id},
  }
}

function listImageFiles(relativeFolder: string) {
  const absoluteFolder = path.join(repoRoot, relativeFolder)
  return readdirSync(absoluteFolder)
    .filter((name) => /\.(webp|jpe?g|png)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
    .map((name) => ({
      relativePath: path.join(relativeFolder, name).replace(/\\/g, '/'),
      filename: name,
    }))
}

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'SEMTA',
  brandTagline: 'Custom Cabinetry & Design',
  locationLabel: 'Norwalk · Connecticut',
  headerNavLinks: [
    {_key: 'portfolio', label: 'Portfolio', href: '/portfolio'},
    {_key: 'designers', label: 'For Designers', href: '/designers'},
    {_key: 'contact', label: 'Contact', href: '/#contact'},
  ],
  footerTagline: 'SEMTA · Custom Cabinetry & Design',
  footerNavLinks: [
    {_key: 'home', label: 'Home', href: '/'},
    {_key: 'about', label: 'About', href: '/#services'},
    {_key: 'portfolio', label: 'Portfolio', href: '/portfolio'},
    {_key: 'designers', label: 'For Designers', href: '/designers'},
    {_key: 'contact', label: 'Contact Us', href: '/#contact'},
  ],
  phoneDisplay: '+1 (917) 705 0712',
  phoneHref: '+19177050712',
  email: 'semtaccd@gmail.com',
  addressLine1: '257 Ely Ave',
  addressLine2: 'Norwalk, CT 06854',
  siteUrl: 'https://www.semtaccd.shop',
  seoTitle: 'SEMTA - Custom Cabinetry & Design · Norwalk, CT',
  seoDescription:
    'SEMTA designs, builds and installs the highest-quality custom cabinetry for residential and commercial spaces. Locally owned and operated in Norwalk, CT.',
  ogSiteName: 'SEMTA',
}

const partners = [
  {name: 'Coastal Interiors', order: 1},
  {name: 'Fairfield Builders', order: 2},
  {name: 'Greenwich Design Co.', order: 3},
  {name: 'Harbor Architects', order: 4},
  {name: 'New Canaan Homes', order: 5},
  {name: 'Sound View Studio', order: 6},
]

const portfolioCategoryDefs = [
  {
    key: 'kitchen-ashton',
    title: 'Kitchen · Ashton',
    slug: 'kitchen-ashton',
    folder: 'src/assets/kitchen/Ashton',
  },
  {
    key: 'kitchen-anchorage',
    title: 'Kitchen · Anchorage Ct',
    slug: 'kitchen-anchorage',
    folder: 'src/assets/kitchen/Anchorage_Ct',
  },
  {
    key: 'bathrooms',
    title: 'Bathrooms',
    slug: 'bathrooms',
    folder: 'src/assets/Bathrooms',
  },
  {
    key: 'bar',
    title: 'Bar',
    slug: 'bar',
    folder: 'src/assets/Bar',
  },
  {
    key: 'mudroom',
    title: 'Mudroom',
    slug: 'mudroom',
    folder: 'src/assets/Mudroom',
  },
  {
    key: 'others',
    title: 'Other Projects',
    slug: 'others',
    folder: 'src/assets/Others',
  },
]

async function seed() {
  console.log('Uploading Our Work project images...')
  const ashtonImage = await uploadImage(
    'src/assets/kitchen/Ashton/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjElMkYwNyUyRklNR18xMTA3LW1pbi03MzZ4MTAyNC5qcGcmY2Fja.webp',
    'ashton-kitchen.webp',
  )
  const anchorageImage = await uploadImage(
    'src/assets/kitchen/Anchorage_Ct/1.webp',
    'anchorage-kitchen.webp',
  )
  const bathImage = await uploadImage(
    'src/assets/Bathrooms/ljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnNlbXRhY2NkLnNob3AlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjElMkYwNyUyRjEzQjM2RDAwLUVBMDMtNDE5Ni05MUM3LTk1NDJCREZDNEIyMi03.webp',
    'spa-bath.webp',
  )

  console.log('Uploading portfolio gallery images...')
  const portfolioCategories = []
  for (const category of portfolioCategoryDefs) {
    const files = listImageFiles(category.folder)
    console.log(`  ${category.title}: ${files.length} images`)
    const images = []
    for (const [index, file] of files.entries()) {
      const uploaded = await uploadImage(file.relativePath, file.filename)
      images.push({
        ...uploaded,
        _key: `${category.key}-${index + 1}`,
        alt: `${category.title} project ${index + 1}`,
      })
    }
    if (images.length === 0) continue
    portfolioCategories.push({
      _key: category.key,
      title: category.title,
      slug: {_type: 'slug', current: category.slug},
      images,
    })
  }

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    seo: {
      title: 'SEMTA - Custom Cabinetry & Design · Norwalk, CT',
      description:
        'SEMTA designs, builds and installs the highest-quality custom cabinetry for residential and commercial spaces. Locally owned and operated in Norwalk, CT.',
      ogTitle: 'SEMTA - Custom Cabinetry & Design',
      ogDescription:
        'Locally owned custom cabinetry studio in Norwalk, CT. Initial Consultation · Custom Design · Build · Delivery & Installation.',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    },
    hero: {
      eyebrow: 'Custom Cabinetry · Residential & Commercial',
      headline: 'Cabinetry, designed and built',
      headlineAccent: 'around the way you live.',
      callLabel: 'Call Us',
      bookLabel: 'Book Appointment',
      viewWorkLabel: 'View Our Work',
      portfolioLinkLabel: 'Browse Full Portfolio',
    },
    specialization: {
      eyebrow: 'Our Specialization',
      title: 'Residential Design',
      body: 'Relax and enjoy custom cabinets and storage solutions in your house. The cabinetry experts at SEMTA can build and install custom cabinets and storage for any room of the home - with unique style and design.',
    },
    workPreview: {
      eyebrow: 'Our Work',
      title: 'Crafted for real homes.',
      body: 'A selection of recent kitchens, baths and built-ins from our Norwalk studio — each project drawn from how our clients live.',
      viewPortfolioLabel: 'View Full Portfolio',
      browseAllLabel: 'Browse All Projects',
      projects: [
        {
          _key: 'project-ashton',
          category: 'Kitchen · Ashton',
          title: 'Ashton Kitchen',
          description:
            'Warm grey cabinetry with integrated storage, designed around daily cooking and family gatherings.',
          image: {...ashtonImage, alt: 'SEMTA Ashton Kitchen — Kitchen · Ashton'},
        },
        {
          _key: 'project-anchorage',
          category: 'Kitchen · Anchorage Ct',
          title: 'Anchorage Court Kitchen',
          description:
            'Clean-lined millwork and tailored finishes for a Connecticut residence built for entertaining.',
          image: {...anchorageImage, alt: 'SEMTA Anchorage Court Kitchen — Kitchen · Anchorage Ct'},
        },
        {
          _key: 'project-bath',
          category: 'Bathrooms',
          title: 'Spa-Inspired Bath',
          description:
            'Custom vanities and built-ins that bring calm, functional storage to a primary suite.',
          image: {...bathImage, alt: 'SEMTA Spa-Inspired Bath — Bathrooms'},
        },
      ],
    },
    portfolio: {
      eyebrow: 'Our Work',
      title: 'Kitchens tailored to the families that live in them.',
      body: 'Every SEMTA project begins with a conversation about how you cook, gather and live. Browse a selection of recent work — each piece designed, built and installed by our Norwalk team.',
      viewFullLabel: 'View Full Portfolio',
      selectedWork: {
        eyebrow: 'Selected Work',
        title: 'Precision in every detail.',
        body: 'We build the cabinetry, hardware and finishes around your life — never the other way around. Every drawer, panel and finish is considered.',
      },
      studio: {
        eyebrow: 'Norwalk Studio',
        title: 'Designed, built and installed by one team.',
        body: 'Locally owned and operated, SEMTA provides the highest-quality custom cabinetry for residential and commercial locations. Any drawing or design can be modified to your specific needs for new construction or remodel.',
        ctaLabel: 'Our Process',
      },
    },
    services: {
      eyebrow: 'Our Services',
      title: 'From first sketch to final install.',
      items: [
        {
          _key: 'service-01',
          number: '01',
          title: 'Initial Consultation',
          body: 'A no-charge consultation to discuss your project and provide a price estimate under no obligation. We invite you to take advantage of our years of experience to explore the possibilities for your space.',
        },
        {
          _key: 'service-02',
          number: '02',
          title: 'Custom Design',
          body: "Once we have the necessary information, we prepare a formal proposal with detailed costs and a timetable. When you're ready, we lock a slot in our calendar and begin creating your unique design.",
        },
        {
          _key: 'service-03',
          number: '03',
          title: 'Build',
          body: 'We present 3D renderings, photos, and material samples. When you are happy with the final design, we begin construction. Every piece is crafted in our Norwalk studio.',
        },
        {
          _key: 'service-04',
          number: '04',
          title: 'Delivery & Installation',
          body: 'The majority of construction takes place in our studio to minimise disruption to your home. Installation is carried out by our own trained craftsmen with the care your project deserves.',
        },
      ],
    },
    craftsmanship: {
      eyebrow: 'Made in Norwalk',
      quote:
        'All installation is done by our own craftsmen - trained to ensure that your project is installed precisely.',
      attribution: '— The SEMTA Team',
    },
    partners: {
      eyebrow: 'Our Partners',
      title: 'Trusted by designers and builders.',
      body: 'We collaborate with interior designers, architects and builders across Connecticut to bring precision cabinetry to every project.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Book an appointment.',
      body: 'We are available to answer any questions you may have. Visit our studio by appointment or send us a message to begin your project.',
      studioLabel: 'Studio',
      phoneLabel: 'Telephone',
      emailLabel: 'Email',
      formEyebrow: 'Send a Message',
      formTitle: 'Tell us about your project.',
      messagePlaceholder: 'Tell us about your space and what you have in mind.',
      submitLabel: 'Send Message',
    },
  }

  const portfolioPage = {
    _id: 'portfolioPage',
    _type: 'portfolioPage',
    seo: {
      title: 'Portfolio · SEMTA Custom Cabinetry & Design',
      description:
        'Browse SEMTA custom cabinetry projects — kitchens, bathrooms, bars, mudrooms and more. Built in Norwalk, CT.',
      ogTitle: 'SEMTA Portfolio',
      ogDescription:
        'Browse kitchens, baths, bars and more — each project crafted in our Norwalk studio.',
      twitterCard: 'summary_large_image',
      noIndex: false,
      noFollow: false,
    },
    eyebrow: 'Portfolio',
    title: 'Selected work by room.',
    body: 'Browse kitchens, baths, bars and more — each project crafted in our Norwalk studio and installed by our own team.',
    ctaLabel: 'Begin a Project',
    ctaHref: '/#contact',
    categories: portfolioCategories,
  }

  const designersPage = {
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
  }

  const transaction = client.transaction()
  transaction.createOrReplace(siteSettings)
  transaction.createOrReplace(homePage)
  transaction.createOrReplace(portfolioPage)
  transaction.createOrReplace(designersPage)

  for (const [index, partner] of partners.entries()) {
    transaction.createOrReplace({
      _id: `partner-${index + 1}`,
      _type: 'partner',
      enabled: true,
      name: partner.name,
      order: partner.order,
    })
  }

  await transaction.commit()
  console.log(
    'Seeded siteSettings, homePage, portfolioPage, designersPage (with gallery categories), and partners.',
  )
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
