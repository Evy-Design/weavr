import {defineField, defineType, defineArrayMember} from 'sanity'

export const toolkitCategory = defineType({
  name: 'toolkitCategory',
  title: 'Toolkit categorie',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Beschrijving', type: 'text', rows: 3}),
    defineField({
      name: 'services',
      title: 'Diensten',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {select: {title: 'title'}},
})
