import {defineField, defineType, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'teasers', title: 'Teasers'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'cta', title: 'Afsluitende CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Hero titel', type: 'string', group: 'hero'}),
    defineField({name: 'heroIntro', title: 'Hero tekst', type: 'text', rows: 3, group: 'hero'}),
    defineField({name: 'heroCta', title: 'Hero call to action', type: 'link', group: 'hero'}),

    defineField({name: 'growthTeaserHeading', title: 'Titel', type: 'string', group: 'teasers'}),
    defineField({name: 'growthTeaserCta', title: 'Call to action', type: 'link', group: 'teasers'}),

    defineField({name: 'approachTeaserEyebrow', title: 'Label', type: 'string', group: 'teasers'}),
    defineField({name: 'approachTeaserHeading', title: 'Titel', type: 'string', group: 'teasers'}),
    defineField({name: 'approachTeaserBody', title: 'Tekst', type: 'text', rows: 4, group: 'teasers'}),

    defineField({name: 'expertsTeaserEyebrow', title: 'Label', type: 'string', group: 'teasers'}),
    defineField({name: 'expertsTeaserHeading', title: 'Titel', type: 'string', group: 'teasers'}),
    defineField({name: 'expertsTeaserBody', title: 'Tekst', type: 'text', rows: 4, group: 'teasers'}),

    defineField({name: 'testimonialsHeading', title: 'Titel', type: 'string', group: 'testimonials'}),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
      group: 'testimonials',
    }),

    defineField({name: 'ctaBannerHeading', title: 'Titel', type: 'string', group: 'cta'}),
    defineField({name: 'ctaBannerCta', title: 'Call to action', type: 'link', group: 'cta'}),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Home'}),
  },
})
