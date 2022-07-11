import Head from 'next/head'
import { useEffect, useState } from 'react'
import ContainerRegister from '../../components/Register/Register-Main/ContainerRegister'
import { auth } from '../../firebase/ControladorFirebase'
import styles from '../../styles/RegisterMain.module.css'
import { Route, useRouter } from 'next/router'

export default function RegisterMain() {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser == null) { console.log('uchiha'); return; }

      console.log('uchiha si')
      router.push('/')

    },600)
  }, [])





  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <ContainerRegister />

    </div>
  )
}