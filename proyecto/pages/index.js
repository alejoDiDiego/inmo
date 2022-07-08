import Head from 'next/head'
import Inicio from '../components/Index/Inicio'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Inicio />

      
    </div>
  )
}
