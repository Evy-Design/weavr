import type {Metadata} from 'next'
import {futura} from './fonts/futura'
import './globals.css'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {PageLoader} from '@/components/PageLoader'
import {client} from '@/sanity/client'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Weavr - Marketing, effectief verweven in alles wat je doet.',
  description:
    'Weavr realiseert groeiversnelling voor B2B organisaties door marketing te verweven met wat er nodig is om structureel te groeien.',
}

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, {next: {revalidate: 60}})

  return (
    <html lang="nl" className={`${futura.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <PageLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer phone={settings?.phone} email={settings?.email} linkedinUrl={settings?.linkedinUrl} />
      </body>
    </html>
  )
}
