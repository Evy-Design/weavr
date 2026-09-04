import {defineField, defineType} from 'sanity'

export const caseStudyBlock = defineType({
  name: 'caseStudyBlock',
  title: 'Case',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'uitdaging', title: 'Uitdaging', type: 'text', rows: 4}),
    defineField({name: 'oplossing', title: 'Oplossing', type: 'text', rows: 4}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'uitdaging'},
  },
})
