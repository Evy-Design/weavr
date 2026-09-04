import {defineQuery} from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]`,
)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    ...,
    testimonials[]->{_id, quote, name, role, company, avatar}
  }
`)

export const APPROACH_PAGE_QUERY = defineQuery(
  `*[_type == "approachPage" && _id == "approachPage"][0]`,
)

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]`)

export const JOIN_PAGE_QUERY = defineQuery(`*[_type == "joinPage" && _id == "joinPage"][0]`)

export const WERK_PAGE_QUERY = defineQuery(`*[_type == "werkPage" && _id == "werkPage"][0]`)

export const WERK_ITEMS_QUERY = defineQuery(`
  *[_type == "werkItem"] | order(order asc){
    _id, title, slug, clientName, summary, coverImage, gallery, tags, ctaLabel
  }
`)

export const WERK_ITEM_QUERY = defineQuery(`
  *[_type == "werkItem" && slug.current == $slug][0]
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0]{
    ...,
    faqs[]->{_id, question, answer}
  }
`)

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0]
`)

export const DEEP_DIVE_PAGE_QUERY = defineQuery(`
  *[_type == "deepDivePage" && slug.current == $slug][0]
`)
