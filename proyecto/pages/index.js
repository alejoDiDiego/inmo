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
    let authAuxVar = localStorage.getItem('authAux')
    let isLoggedVar = localStorage.getItem('isLogged')
    if(authAuxVar == null || isLoggedVar == null){
      firebase.handleSignOut()
    }


  console.log(localStorage.getItem('isLogged') +' localStorage isLogged')
  console.log('localStorage authAux abajo')
  
  console.log(authAuxVar)

  
  console.log(firebase.auth.currentUser)
  console.log('localStorage ' + localStorage.getItem('siguienteCRP2'))

  if(localStorage.getItem('isLogged') == 'true'){
    setLogged(true)
    getDoc(doc(firebase.db, "Usuarios", JSON.parse(localStorage.getItem('authAux')).currentUser.email)).then(docSnap => {
      console.log(docSnap.data())
      if(docSnap.data().isRegistering == true){
        router.push('/registro/particular/registro-particular')
      }
      
    }).catch(err => {
      console.log(err)
    })
  } else{
    localStorage.setItem('siguienteCRP2', false)
  }

  
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
