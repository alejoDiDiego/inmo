import Head from 'next/head'
import ContainerRegister from '../../components/Register/Register-Main/ContainerRegister'
import styles from '../../styles/RegisterMain.module.css'

export default function RegisterMain() {
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