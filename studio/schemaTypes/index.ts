import {seo} from './objects/seo'
import {link} from './objects/link'
import {caseStudyBlock} from './objects/caseStudyBlock'
import {approachStep, approachStepOption} from './objects/approachStep'
import {toolkitCategory} from './objects/toolkitCategory'

import {siteSettings} from './documents/siteSettings'
import {homePage} from './documents/homePage'
import {approachPage} from './documents/approachPage'
import {aboutPage} from './documents/aboutPage'
import {joinPage} from './documents/joinPage'
import {werkPage} from './documents/werkPage'
import {werkItem} from './documents/werkItem'
import {contactPage} from './documents/contactPage'
import {testimonial} from './documents/testimonial'
import {faqItem} from './documents/faqItem'
import {legalPage} from './documents/legalPage'
import {deepDivePage} from './documents/deepDivePage'

export const schemaTypes = [
  // objects
  seo,
  link,
  caseStudyBlock,
  approachStep,
  approachStepOption,
  toolkitCategory,

  // singleton pages
  siteSettings,
  homePage,
  approachPage,
  aboutPage,
  joinPage,
  werkPage,
  contactPage,

  // collections
  werkItem,
  testimonial,
  faqItem,
  legalPage,
  deepDivePage,
]

export const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'approachPage',
  'aboutPage',
  'joinPage',
  'werkPage',
  'contactPage',
])
