import type {StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons/Home'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'
import {UsersIcon} from '@sanity/icons/Users'
import {HeartIcon} from '@sanity/icons/Heart'
import {CaseIcon} from '@sanity/icons/Case'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {singletonTypes} from './schemaTypes'

function singleton(S: Parameters<StructureResolver>[0], typeName: string, title: string, icon?: any) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Weavr')
    .items([
      singleton(S, 'homePage', 'Home', HomeIcon),
      singleton(S, 'approachPage', 'Onze aanpak', TrendUpwardIcon),
      singleton(S, 'aboutPage', 'Over ons', UsersIcon),
      singleton(S, 'joinPage', 'Sluit je aan', HeartIcon),
      singleton(S, 'werkPage', 'Werk (intro)', CaseIcon),
      singleton(S, 'contactPage', 'Contact', EnvelopeIcon),

      S.divider(),

      S.listItem()
        .title('Werk items')
        .icon(CaseIcon)
        .child(S.documentTypeList('werkItem').title('Werk items')),

      S.listItem()
        .title('Testimonials')
        .icon(CommentIcon)
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      S.listItem()
        .title('FAQ')
        .icon(HelpCircleIcon)
        .child(S.documentTypeList('faqItem').title('FAQ')),

      S.listItem()
        .title('Juridische pagina\'s')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('legalPage').title('Juridische pagina\'s')),

      S.listItem()
        .title('Verdiepingspagina\'s')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('deepDivePage').title('Verdiepingspagina\'s')),

      S.divider(),

      singleton(S, 'siteSettings', 'Site-instellingen', CogIcon),

      // Anything not explicitly listed above (safety net for future types)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !singletonTypes.has(listItem.getId() as string) &&
          !['werkItem', 'testimonial', 'faqItem', 'legalPage', 'deepDivePage'].includes(
            listItem.getId() as string,
          ),
      ),
    ])
