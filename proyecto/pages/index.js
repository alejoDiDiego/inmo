import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../firebase'
import Body from '../components/Index/Body'
import Layout from '../components/layout/Layout'
import { getDownloadURL, ref } from 'firebase/storage'






export default function Home() {

  const {usuario} = useContext(FirebaseContext)
  console.log(usuario)

  useEffect(() => {
    const check = async () => {
      await usuario
      const ls = localStorage.getItem("fotosUsuario")
      if (usuario != null && ls == null) {
        localStorage.setItem("fotosUsuario", JSON.stringify({}))
        const perfilRef = ref(firebase.storage, `usuarios/${usuario.email}/perfil`)
        const fondoRef = ref(firebase.storage, `usuarios/${usuario.email}/fondo`)
        const urlPerfil = ""
        const urlFondo = ""
        if(perfilRef == null){
            perfilRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
        }
        urlPerfil = await getDownloadURL(perfilRef)
        localStorage.setItem("fotosUsuario", JSON.stringify({urlPerfil}))

        if(fondoRef == null){
            fondoRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
        }
        urlFondo = await getDownloadURL(fondoRef)
        localStorage.setItem("fotosUsuario", JSON.stringify({urlPerfil, urlFondo}))
        
        //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil
      } else {
        console.log('no esta loggeado')
      }
    }

    check()


  }, [usuario])





  return (
    <div>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Layout usuario={usuario}>
        <Body />
      </Layout>

      
    </div>
  )
}
