'use server'

import {Resend} from 'resend'
import {client} from '@/sanity/client'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return {status: 'error', message: 'Vul in ieder geval je naam, e-mail en toelichting in.'}
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY ontbreekt in .env.local')
    return {status: 'error', message: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.'}
  }

  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  const to = settings?.email || 'martijn@weavr.nl'

  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: 'Weavr website <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `Nieuw contactformulier bericht van ${name}`,
      text: [
        `Naam: ${name}`,
        company && `Bedrijfsnaam: ${company}`,
        phone && `Telefoonnummer: ${phone}`,
        `Email: ${email}`,
        '',
        'Toelichting:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return {
      status: 'success',
      message: 'Bedankt! Uw bericht is verstuurd, wij nemen zo snel mogelijk contact met u op.',
    }
  } catch (err) {
    console.error(err)
    return {status: 'error', message: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.'}
  }
}
