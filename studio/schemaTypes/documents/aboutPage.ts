import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Over ons',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'ambitie', title: 'Ambitie'},
    {name: 'verhaal', title: 'Verhaal'},
    {name: 'cases', title: "Cases"},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heading', title: 'Titel', type: 'string', group: 'intro'}),
    defineField({name: 'intro', title: 'Intro tekst', type: 'text', rows: 4, group: 'intro'}),

    defineField({name: 'ambitieHeading', title: 'Titel', type: 'string', group: 'ambitie'}),
    defineField({name: 'ambitieBody', title: 'Tekst', type: 'text', rows: 4, group: 'ambitie'}),
    defineField({
      name: 'beliefs',
      title: 'Overtuigingen (bullets)',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'ambitie',
    }),

    defineField({name: 'weavrWordHeading', title: '"Weavr" titel', type: 'string', group: 'verhaal'}),
    defineField({name: 'weavrWordBody', title: '"Weavr" tekst', type: 'text', rows: 4, group: 'verhaal'}),
    defineField({name: 'oorsprongHeading', title: 'Oorsprong titel', type: 'string', group: 'verhaal'}),
    defineField({name: 'oorsprongBody', title: 'Oorsprong tekst', type: 'text', rows: 6, group: 'verhaal'}),
    defineField({
      name: 'brands',
      title: 'Merken waar Martijn voor werkte',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      group: 'verhaal',
    }),

    defineField({
      name: 'caseStudies',
      title: 'Case-blokken (uitdaging / oplossing)',
      type: 'array',
      of: [defineArrayMember({type: 'caseStudyBlock'})],
      group: 'cases',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Over ons'}),
  },
})
