import localFont from 'next/font/local'

export const futura = localFont({
  src: [
    {path: './futura-100-book.woff2', weight: '350', style: 'normal'},
    {path: './futura-100-regular.woff2', weight: '400', style: 'normal'},
    {path: './futura-100-medium.woff2', weight: '500', style: 'normal'},
  ],
  variable: '--font-futura',
  display: 'swap',
})
