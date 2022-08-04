import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Inicio from '../components/Index/Inicio'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../firebase'




export default function Home() {

  const [logged, setLogged] = useState(false)

  const {usuario} = useContext(FirebaseContext)
  console.log("usuario Index")
  console.log(usuario)





  //   useEffect(() => {
  //     localStorage.setItem('siguienteCRP2', false)
  //     console.log(auth.currentUser)
  //     console.log('localStorage ' + localStorage.getItem('siguienteCRP2'))
  //     setTimeout(() => {
  //         if (auth.currentUser == null) {
  //             setLogged(false)
  //         } else {
  //             setLogged(true)
  //         }
  //         console.log(auth.currentUser)
  //     }, 800)

  // }, [auth])




  return (
    <div>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Inicio usuario={usuario} logged={logged} setLogged={setLogged} />


    </div>
  )
}
