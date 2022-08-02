import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Inicio from '../components/Index/Inicio'
import { auth, db, handleSignOut } from '../firebase/ControladorFirebase'




export default function Home() {

  const [logged, setLogged] = useState(false)
  

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
  if(JSON.parse(localStorage.getItem('authAux')) == {} || localStorage.getItem('authAux') == null){
    handleSignOut()
    localStorage.setItem('isLogged', false)
    localStorage.setItem('siguienteCRP2', false)
  }

  console.log(localStorage.getItem('isLogged') +' localStorage isLogged')
  console.log('localStorage authAux abajo')
  console.log(JSON.parse(localStorage.getItem('authAux')))

  localStorage.setItem('siguienteCRP2', false)
  console.log(auth.currentUser)
  console.log('localStorage ' + localStorage.getItem('siguienteCRP2'))

  if(localStorage.getItem('isLogged') == 'true'){
    setLogged(true)
    getDoc(doc(db, "Usuarios", JSON.parse(localStorage.getItem('authAux')).currentUser.email)).then(docSnap => {
      console.log(docSnap.data())

      if(docSnap.data().isRegistering == true){
        updateDoc(doc(db, "Usuarios", auth.currentUser.email), {
          isRegistering: false
        })
      }
      
    }).catch(err => {
      console.log(err)
    })

    
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
