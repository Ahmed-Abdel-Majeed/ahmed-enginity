import Home from './[lang]/page'

export default async function RootPage() {
  return <Home params={Promise.resolve({ lang: 'en' })} />
}
