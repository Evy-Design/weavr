import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const werkItem = defineType({
  name: 'werkItem',
  title: 'Werk',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'clientName', title: 'Klantnaam', type: 'string'}),
    defineField({name: 'summary', title: 'Korte samenvatting (op de kaart)', type: 'text', rows: 3}),
    defineField({name: 'coverImage', title: 'Cover afbeelding', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'tags',
      title: "Tags / branche",
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({name: 'uitdaging', title: 'Uitdaging', type: 'text', rows: 4}),
    defineField({name: 'oplossing', title: 'Oplossing', type: 'text', rows: 4}),
    defineField({
      name: 'results',
      title: 'Resultaten (bullets)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerij (optioneel)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Knoptekst op de kaart',
      type: 'string',
      initialValue: 'Meer zien',
    }),
    defineField({
      name: 'order',
      title: 'Volgorde (laag = eerst)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'clientName', media: 'coverImage'},
  },
})
