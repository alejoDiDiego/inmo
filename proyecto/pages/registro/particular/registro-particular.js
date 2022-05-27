import Head from 'next/head'
import { useState } from 'react'
import ContainerRegisterParticular1 from '../../../components/Register/Register-Particular/ContainerRegisterParticular1'
import ContainerRegisterParticular2 from '../../../components/Register/Register-Particular/ContainerRegisterParticular2'
import ContainerRegisterParticular3 from '../../../components/Register/Register-Particular/ContainerRegisterParticular3'
import styles from '../../../styles/RegisterParticular.module.css'


export default function RegisterParticular() {

  const [verdadero, setVerdadero] = useState(false)
  const [verdadero2, setVerdadero2] = useState(false)



  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icono_inmo_corto.png" />
      </Head>
      {verdadero == false ? 
      <ContainerRegisterParticular1 setVerdadero={setVerdadero} /> 
      : 
      (
        verdadero2 == false ? <ContainerRegisterParticular2 setVerdadero={setVerdadero} setVerdadero2={setVerdadero2} /> 
        :
        <ContainerRegisterParticular3 setVerdadero2={setVerdadero2} /> 
      )}
    </div>
  )
}