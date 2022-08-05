import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../firebase'
import Body from '../components/Index/Body'
import Layout from '../components/layout/Layout'





export default function Home() {

  const {usuario} = useContext(FirebaseContext)
  console.log("usuario Index")
  console.log(usuario)





  return (
    <div>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      <Layout>
        <Body />
      </Layout>

      
    </div>
  )
}
