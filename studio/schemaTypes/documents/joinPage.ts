import {defineField, defineType, defineArrayMember} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'

export const joinPage = defineType({
  name: 'joinPage',
  title: 'Sluit je aan',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {name: 'intro', title: 'Intro'},
    {name: 'role', title: 'Rol'},
    {name: 'why', title: 'Waarom freelancers'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heading', title: 'Titel', type: 'string', group: 'intro'}),
    defineField({name: 'intro', title: 'Intro tekst', type: 'text', rows: 4, group: 'intro'}),

    defineField({name: 'roleTitle', title: 'Functietitel', type: 'string', group: 'role'}),
    defineField({name: 'roleCta', title: 'Call to action (bv. e-mail sturen)', type: 'link', group: 'role'}),
    defineField({name: 'lookingForHeading', title: 'Titel "Zoeken we jou?"', type: 'string', group: 'role'}),
    defineField({name: 'lookingForIntro', title: 'Intro tekst', type: 'text', rows: 4, group: 'role'}),
    defineField({
      name: 'requirements',
      title: 'Eigenschappen (bullets)',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'role',
    }),

    defineField({name: 'whyHeading', title: 'Titel', type: 'string', group: 'why'}),
    defineField({name: 'whyBody', title: 'Tekst', type: 'text', rows: 6, group: 'why'}),
    defineField({name: 'whyCta', title: 'Call to action', type: 'link', group: 'why'}),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Sluit je aan'}),
  },
})
