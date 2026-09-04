import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site-instellingen',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'phone', title: 'Telefoonnummer', type: 'string', initialValue: '+31 6 21 44 04 33'}),
    defineField({name: 'email', title: 'E-mailadres', type: 'string', initialValue: 'martijn@weavr.nl'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'footerNote', title: 'Footer tekst (optioneel)', type: 'text', rows: 2}),
  ],
  preview: {
    prepare: () => ({title: 'Site-instellingen'}),
  },
})
