import {defineField, defineType, defineArrayMember} from 'sanity'

export const approachStepOption = defineType({
  name: 'approachStepOption',
  title: 'Optie',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'body', title: 'Tekst', type: 'text', rows: 3}),
    defineField({name: 'cta', title: 'Call to action', type: 'link'}),
  ],
  preview: {select: {title: 'title'}},
})

export const approachStep = defineType({
  name: 'approachStep',
  title: 'Stap',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Tekst', type: 'text', rows: 4}),
    defineField({
      name: 'options',
      title: "Opties (optioneel, bv. stap 1's twee routes)",
      type: 'array',
      of: [defineArrayMember({type: 'approachStepOption'})],
    }),
    defineField({name: 'cta', title: 'Call to action (optioneel)', type: 'link'}),
  ],
  preview: {select: {title: 'title'}},
})
