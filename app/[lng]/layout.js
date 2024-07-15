import { Toaster } from 'react-hot-toast'
import { dir } from 'i18next'

import AppBar from '@/app/components/AppBar'
import { languages } from '@/app/i18n/settings'

import '@/styles/globals.css'
import { Montserrat, Roboto } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const metadata = {
  title: 'Community Check',
  description: 'Application for Community Checking',
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={`${montserrat.variable} ${roboto.variable}`}
    >
      <body className="bg-bright-gray min-h-screen h-full flex flex-col text-raisin-black">
        <div className="w-full">
          <AppBar lng={lng} />
        </div>
        <main className="p-8 flex-1 flex justify-center">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
