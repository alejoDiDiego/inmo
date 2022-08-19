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
    if (usuario != null) {
      console.log(usuario)
      if (Object.keys(usuario.usuario).length > 0) {
        console.log("el usuario ya existe")
        router.push('/')
        return
      }
      setLoading(false)
      console.log('no')
    }



  }, [usuario])







  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Layout registro={true}>
        <ContainerRegister loading={loading} />
      </Layout>

    </div>
  )
}