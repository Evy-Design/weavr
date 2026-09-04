import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const werkPage = defineType({
  name: 'werkPage',
  title: 'Werk (intro)',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heading', title: 'Titel', type: 'string', group: 'intro', initialValue: 'Werk'}),
    defineField({name: 'intro', title: 'Intro tekst', type: 'text', rows: 4, group: 'intro'}),
    defineField({
      name: 'founderTeaser',
      title: 'Teaser over de founder',
      type: 'text',
      rows: 3,
      group: 'intro',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Werk (intro)'}),
  },
})
