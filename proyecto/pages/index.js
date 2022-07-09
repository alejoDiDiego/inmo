import Head from 'next/head'
import { useEffect, useState } from 'react'
import Inicio from '../components/Index/Inicio'
import { auth } from '../firebase/ControladorFirebase'


export default function Home() {

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    setTimeout(() => {
        if (auth.currentUser == null) {
            setLogged(false)
        } else {
            setLogged(true)
        }
    }, 600)
}, [])




  return (
    <div>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Inicio logged={logged} setLogged={setLogged} />

      
    </div>
  )
}
