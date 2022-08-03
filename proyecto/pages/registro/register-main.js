import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import ContainerRegister from '../../components/Register/Register-Main/ContainerRegister'
import styles from '../../styles/RegisterMain.module.css'
import { Route, useRouter, withRouter } from 'next/router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, handleSignOut } from '../../firebase/ControladorFirebase'

export default function RegisterMain() {


  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const isMounted = useRef(false)


  // useEffect(() => {
  //   setTimeout(() => {
  //     if (auth.currentUser == null) { console.log('uchiha'); return; }

  //     console.log('uchiha si')
  //     router.push('/')

  //   },600)
  // }, [])






useEffect(() => {
  
  let authAuxVar = localStorage.getItem('authAux')
  let isLoggedVar = localStorage.getItem('isLogged')
  if(authAuxVar == null || isLoggedVar == null){
    handleSignOut()
  }



  console.log(localStorage.getItem('isLogged') + 'localStorage isLogged register-main')
  if(localStorage.getItem('isLogged') == 'true'){
    
    getDoc(doc(db, "Usuarios", JSON.parse(localStorage.getItem('authAux')).currentUser.email)).then(docSnap => {
      console.log(docSnap.data())
      if(docSnap.data().isRegistering == true){
        router.push('/registro/particular/registro-particular')
        return
      } else{
        router.push('/')
      }
      
    }).catch(err => {
      console.log("error")
      console.log(err)
    })
    
  } 
  else {
    setLoading(false)
    console.log('no')
  }

  
}, [])







  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <ContainerRegister loading={loading} />

    </div>
  )
}