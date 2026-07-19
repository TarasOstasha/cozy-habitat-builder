import type {
  DesignersPage,
  FooterNavLink,
  HeaderNavLink,
  HomePage,
  PartnerDoc,
  PortfolioPage,
  SiteSettings,
} from "./types";

/** Local fallbacks so the site still renders if Sanity is empty or offline. */
export const defaultFooterNavLinks: FooterNavLink[] = [
  { _key: "home", label: "Home", href: "/" },
  { _key: "about", label: "About", href: "/#services" },
  { _key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { _key: "designers", label: "For Designers", href: "/designers" },
  { _key: "contact", label: "Contact Us", href: "/#contact" },
];

export const defaultHeaderNavLinks: HeaderNavLink[] = [
  { _key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { _key: "designers", label: "For Designers", href: "/designers" },
  { _key: "contact", label: "Contact", href: "/#contact" },
];

export const defaultSettings: SiteSettings = {
  brandName: "SEMTA",
  brandTagline: "Custom Cabinetry & Design",
  locationLabel: "Norwalk · Connecticut",
  headerNavLinks: defaultHeaderNavLinks,
  footerTagline: "SEMTA · Custom Cabinetry & Design",
  footerNavLinks: defaultFooterNavLinks,
  phoneDisplay: "+1 (917) 705 0712",
  phoneHref: "+19177050712",
  email: "semtaccd@gmail.com",
  addressLine1: "257 Ely Ave",
  addressLine2: "Norwalk, CT 06854",
  siteUrl: "https://www.semtaccd.shop",
  seoTitle: "SEMTA - Custom Cabinetry & Design · Norwalk, CT",
  seoDescription:
    "SEMTA designs, builds and installs the highest-quality custom cabinetry for residential and commercial spaces. Locally owned and operated in Norwalk, CT.",
  ogSiteName: "SEMTA",
};

export const defaultPortfolio: PortfolioPage = {
  seo: {
    title: "Portfolio · SEMTA Custom Cabinetry & Design",
    description:
      "Browse SEMTA custom cabinetry projects — kitchens, bathrooms, bars, mudrooms and more. Built in Norwalk, CT.",
    ogTitle: "SEMTA Portfolio",
    ogDescription:
      "Browse kitchens, baths, bars and more — each project crafted in our Norwalk studio.",
    twitterCard: "summary_large_image",
    noIndex: false,
    noFollow: false,
  },
  eyebrow: "Portfolio",
  title: "Selected work by room.",
  body: "Browse kitchens, baths, bars and more — each project crafted in our Norwalk studio and installed by our own team.",
  ctaLabel: "Begin a Project",
  ctaHref: "/#contact",
  categories: [],
};

export const defaultDesigners: DesignersPage = {
  seo: {
    title: "For Designers · SEMTA Custom Cabinetry & Design",
    description:
      "SEMTA partners with interior designers, architects and builders across Connecticut. Trade consultations, shop drawings, custom millwork and installation.",
    ogTitle: "For Designers · SEMTA",
    ogDescription:
      "Trade consultations, shop drawings, custom millwork and installation for designers across Connecticut.",
    twitterCard: "summary_large_image",
    noIndex: false,
    noFollow: false,
  },
  eyebrow: "For Designers",
  title: "A fabrication partner for your vision.",
  body: "SEMTA works closely with interior designers, architects, and builders across Connecticut. We translate detailed drawings into precision-built cabinetry - with reliable timelines, open communication, and installation by our own team.",
  highlights: [
    { _key: "h1", text: "Trade consultations and shop drawings" },
    { _key: "h2", text: "Custom millwork for residential and commercial" },
    { _key: "h3", text: "Material samples and finish coordination" },
  ],
  formEyebrow: "Get in Touch",
  formTitle: "Start a designer inquiry.",
  messagePlaceholder:
    "Tell us about your project, timeline, and how we can support your design.",
  submitLabel: "Send Message",
};

export const defaultHome: HomePage = {
  seo: {
    title: "SEMTA - Custom Cabinetry & Design · Norwalk, CT",
    description:
      "SEMTA designs, builds and installs the highest-quality custom cabinetry for residential and commercial spaces. Locally owned and operated in Norwalk, CT.",
    ogTitle: "SEMTA - Custom Cabinetry & Design",
    ogDescription:
      "Locally owned custom cabinetry studio in Norwalk, CT. Initial Consultation · Custom Design · Build · Delivery & Installation.",
    twitterCard: "summary_large_image",
    noIndex: false,
    noFollow: false,
  },
  hero: {
    enabled: true,
    order: 10,
    eyebrow: "Custom Cabinetry · Residential & Commercial",
    headline: "Cabinetry, designed and built",
    headlineAccent: "around the way you live.",
    callLabel: "Call Us",
    bookLabel: "Book Appointment",
    viewWorkLabel: "View Our Work",
    portfolioLinkLabel: "Browse Full Portfolio",
  },
  specialization: {
    enabled: true,
    order: 20,
    eyebrow: "Our Specialization",
    title: "Residential Design",
    body: "Relax and enjoy custom cabinets and storage solutions in your house. The cabinetry experts at SEMTA can build and install custom cabinets and storage for any room of the home - with unique style and design.",
  },
  workPreview: {
    enabled: true,
    order: 30,
    eyebrow: "Our Work",
    title: "Crafted for real homes.",
    body: "A selection of recent kitchens, baths and built-ins from our Norwalk studio — each project drawn from how our clients live.",
    viewPortfolioLabel: "View Full Portfolio",
    browseAllLabel: "Browse All Projects",
    projects: [],
  },
  portfolio: {
    enabled: true,
    order: 40,
    eyebrow: "Our Work",
    title: "Kitchens tailored to the families that live in them.",
    body: "Every SEMTA project begins with a conversation about how you cook, gather and live. Browse a selection of recent work — each piece designed, built and installed by our Norwalk team.",
    viewFullLabel: "View Full Portfolio",
    selectedWork: {
      eyebrow: "Selected Work",
      title: "Precision in every detail.",
      body: "We build the cabinetry, hardware and finishes around your life — never the other way around. Every drawer, panel and finish is considered.",
    },
    studio: {
      eyebrow: "Norwalk Studio",
      title: "Designed, built and installed by one team.",
      body: "Locally owned and operated, SEMTA provides the highest-quality custom cabinetry for residential and commercial locations. Any drawing or design can be modified to your specific needs for new construction or remodel.",
      ctaLabel: "Our Process",
    },
  },
  services: {
    enabled: true,
    order: 50,
    eyebrow: "Our Services",
    title: "From first sketch to final install.",
    items: [
      {
        _key: "service-01",
        number: "01",
        title: "Initial Consultation",
        body: "A no-charge consultation to discuss your project and provide a price estimate under no obligation. We invite you to take advantage of our years of experience to explore the possibilities for your space.",
      },
      {
        _key: "service-02",
        number: "02",
        title: "Custom Design",
        body: "Once we have the necessary information, we prepare a formal proposal with detailed costs and a timetable. When you're ready, we lock a slot in our calendar and begin creating your unique design.",
      },
      {
        _key: "service-03",
        number: "03",
        title: "Build",
        body: "We present 3D renderings, photos, and material samples. When you are happy with the final design, we begin construction. Every piece is crafted in our Norwalk studio.",
      },
      {
        _key: "service-04",
        number: "04",
        title: "Delivery & Installation",
        body: "The majority of construction takes place in our studio to minimise disruption to your home. Installation is carried out by our own trained craftsmen with the care your project deserves.",
      },
    ],
  },
  craftsmanship: {
    enabled: true,
    order: 60,
    eyebrow: "Made in Norwalk",
    quote:
      "All installation is done by our own craftsmen - trained to ensure that your project is installed precisely.",
    attribution: "— The SEMTA Team",
  },
  partners: {
    enabled: true,
    order: 70,
    eyebrow: "Our Partners",
    title: "Trusted by designers and builders.",
    body: "We collaborate with interior designers, architects and builders across Connecticut to bring precision cabinetry to every project.",
  },
  reviews: {
    enabled: true,
    order: 80,
  },
  contact: {
    enabled: true,
    order: 90,
    eyebrow: "Contact",
    title: "Book an appointment.",
    body: "We are available to answer any questions you may have. Visit our studio by appointment or send us a message to begin your project.",
    studioLabel: "Studio",
    phoneLabel: "Telephone",
    emailLabel: "Email",
    formEyebrow: "Send a Message",
    formTitle: "Tell us about your project.",
    messagePlaceholder: "Tell us about your space and what you have in mind.",
    submitLabel: "Send Message",
  },
};

export const defaultPartners: PartnerDoc[] = [
  { _id: "partner-1", name: "Coastal Interiors" },
  { _id: "partner-2", name: "Fairfield Builders" },
  { _id: "partner-3", name: "Greenwich Design Co." },
  { _id: "partner-4", name: "Harbor Architects" },
  { _id: "partner-5", name: "New Canaan Homes" },
  { _id: "partner-6", name: "Sound View Studio" },
];

export function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined || value === "") return fallback;
  return value;
}

/** Sections default to visible when the flag is missing. */
export function isSectionEnabled(enabled: boolean | null | undefined): boolean {
  return enabled !== false;
}
