import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Inicio from '../components/Index/Inicio'
import { useRouter } from 'next/router'
import firebase from '../firebase'


export default function Home() {

  const [logged, setLogged] = useState(false)

  const router = useRouter()


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


  useEffect(() => {
    console.log(firebase.auth.currentUser)
    if(firebase.auth.currentUser != null){
      setLogged(true)
      return
    }
    setLogged(false)
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
