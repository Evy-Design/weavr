import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const deepDivePage = defineType({
  name: 'deepDivePage',
  title: 'Verdiepingspagina',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'stepTitle',
      title: "Stap-titel (boven in het kader, bv. 'Een marktgericht fundament')",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'heading'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'tag', title: "Onderwerp-label (bv. 'De Groeiscan')", type: 'string'}),
    defineField({name: 'duration', title: "Duur-label (bv. '5 weken')", type: 'string'}),
    defineField({
      name: 'heading',
      title: 'Hoofdkop',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Tekst (alinea per regel)',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'midListIntro',
      title: "Optioneel: intro boven tussenlijst (bv. 'Denk bijvoorbeeld aan:')",
      type: 'string',
    }),
    defineField({
      name: 'midListBullets',
      title: 'Optioneel: tussenlijst (pijltje-bullets, tussen de eerste tekst en de rest)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'paragraphs2',
      title: 'Optioneel: tekst na de tussenlijst (alinea per regel)',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'bulletsIntro',
      title: "Intro boven bullets (bv. 'Na deze fase hebben jullie het volgende in handen:')",
      type: 'string',
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'extraNote',
      title: "Optioneel: tekst naast slot-link (bv. 'Zie welke oplossingen...')",
      type: 'string',
    }),
    defineField({name: 'extraCta', title: 'Optioneel: slot-link', type: 'link'}),
    defineField({
      name: 'backHref',
      title: 'Terug-link (pad, bv. /onze-aanpak)',
      type: 'string',
      initialValue: '/onze-aanpak',
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'tag'},
  },
})
