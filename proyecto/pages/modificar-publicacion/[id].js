import { useRouter, } from 'next/router'
import React, { useEffect, useContext, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { collection, doc, onSnapshot, getDoc, query, where, getDocs, collectionGroup } from 'firebase/firestore'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'



const ModificarPublicacion = () => {

  const [producto, setProducto] = useState({})
  const [cargando, setCargando] = useState(true)


  const router = useRouter()
  const { query: { id } } = router

  const { usuario } = useContext(FirebaseContext)

  const queryFirebase = async () => {
    const docRef = doc(firebase.db, "Publicaciones", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists() == false) {
      console.log("no existe la publicacion")
      return
    }
    if (docSnap.data().publicador != usuario.uid) {
      console.log("no tiene permiso")
      return
    }
    console.log(docSnap.data())


  }


  useEffect(() => {

    const check = async () => {
      if (usuario != null) {
        try {
          if (Object.keys(usuario).length > 0) {
            queryFirebase()
            setCargando(false)
          }
          return true

        } catch (err) {
          console.log(err)
          console.log("a chekear")
          setTimeout(() => {
            check()
            return
          }, 2000)
        }
      } else {
        return false
      }
    }

    //Op

    let prueba = check()
    while (prueba == false) {
      setInterval(() => {
        prueba = check()
        console.log("probando")
      }, 200)

    }

  }, [usuario])


  if (cargando) {
    return (
      <>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout>
          <div>cargando</div>
        </Layout>
      </>

    )
  }



  else {
    return (
      <>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout>
          <div>Desde {id}</div>
        </Layout>
      </>

    )
  }


}

export default ModificarPublicacion