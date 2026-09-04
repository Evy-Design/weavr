import {defineField, defineType, defineArrayMember} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'faq', title: 'FAQ'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heading', title: 'Titel', type: 'string', group: 'intro'}),
    defineField({name: 'intro', title: 'Intro tekst', type: 'text', rows: 4, group: 'intro'}),
    defineField({name: 'sessionHeading', title: 'Titel sessie-blok', type: 'string', group: 'intro'}),
    defineField({name: 'sessionBody', title: 'Tekst sessie-blok', type: 'text', rows: 4, group: 'intro'}),

    defineField({name: 'faqHeading', title: 'Titel', type: 'string', group: 'faq'}),
    defineField({name: 'faqIntro', title: 'Tekst', type: 'text', rows: 3, group: 'faq'}),
    defineField({
      name: 'faqs',
      title: "Veelgestelde vragen",
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faqItem'}]})],
      group: 'faq',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Contact'}),
  },
})
