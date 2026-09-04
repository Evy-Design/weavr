import {defineField, defineType, defineArrayMember} from 'sanity'
import {TrendUpwardIcon} from '@sanity/icons/TrendUpward'

export const approachPage = defineType({
  name: 'approachPage',
  title: 'Onze aanpak',
  type: 'document',
  icon: TrendUpwardIcon,
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'steps', title: 'Stappen'},
    {name: 'toolkit', title: 'Toolkit'},
    {name: 'cta', title: 'Afsluitende CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heading', title: 'Titel', type: 'string', group: 'intro'}),
    defineField({name: 'intro', title: 'Intro tekst', type: 'text', rows: 4, group: 'intro'}),

    defineField({name: 'stepsHeading', title: 'Titel boven de stappen', type: 'string', group: 'steps'}),
    defineField({name: 'stepsIntro', title: 'Tekst boven de stappen', type: 'text', rows: 3, group: 'steps'}),
    defineField({
      name: 'steps',
      title: 'Stappen',
      type: 'array',
      of: [defineArrayMember({type: 'approachStep'})],
      group: 'steps',
    }),

    defineField({name: 'toolkitHeading', title: 'Titel', type: 'string', group: 'toolkit'}),
    defineField({name: 'toolkitIntro', title: 'Tekst', type: 'text', rows: 4, group: 'toolkit'}),
    defineField({
      name: 'toolkitCategories',
      title: 'Categorieën',
      type: 'array',
      of: [defineArrayMember({type: 'toolkitCategory'})],
      group: 'toolkit',
    }),

    defineField({name: 'closingHeading', title: 'Titel', type: 'string', group: 'cta'}),
    defineField({name: 'closingCta', title: 'Call to action', type: 'link', group: 'cta'}),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Onze aanpak'}),
  },
})
