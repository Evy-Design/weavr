import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'name', title: 'Naam', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Functie', type: 'string'}),
    defineField({name: 'company', title: 'Bedrijf', type: 'string'}),
    defineField({name: 'avatar', title: 'Foto (optioneel)', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'company', media: 'avatar'},
  },
})
