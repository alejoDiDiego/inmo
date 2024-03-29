import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import ContainerRegister from '../../components/Register/Register-Main/ContainerRegister'
import styles from '../../styles/RegisterMain.module.css'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../../firebase'
import Layout from '../../components/layout/Layout'


export default function RegisterMain() {


  const { usuario } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)

  const router = useRouter()






  useEffect(() => {

    const check = async () => {
      if (usuario != null) {
        console.log(usuario)
        if (Object.keys(usuario).length > 0) {
          console.log("volver al inciio usuario ya loggeado")
          return true
        } else {
          setLoading(false)
          console.log('no')
          return true
        }
      } else {
        return false
      }
    }

    let prueba = check()
    while(prueba == false) {
      setInterval(() => {
        prueba = check()
        console.log("probando")
      }, 200)
      
    }


  })







  return (
    <div className={styles.body_before}>
      <div className={styles.body}>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout registro={true}>
          <ContainerRegister loadingBig={loading} />
        </Layout>

      </div>
    </div>

  )
}