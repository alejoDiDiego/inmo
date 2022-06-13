import Head from 'next/head'
import { useState } from 'react'
import ContainerRegisterEmpresa1 from '../../../components/Register/Register-Empresa/ContainerRegisterEmpresa1.js'
import ContainerRegisterEmpresa2 from '../../../components/Register/Register-Empresa/ContainerRegisterEmpresa2.js'
import ContainerRegisterEmpresa3 from '../../../components/Register/Register-Empresa/ContainerRegisterEmpresa3.js'
import styles from '../../../styles/RegisterEmpresa.module.css'



export default function RegisterEmpresa() {

  const [verdadero, setVerdadero] = useState(false)
  const [verdadero2, setVerdadero2] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")


  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icono_inmo_corto.png" />
      </Head>
      {verdadero == false ? 
      <ContainerRegisterEmpresa1 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        confirmarPassword={confirmarPassword} 
        setConfirmarPassword={setConfirmarPassword} 
        setVerdadero={setVerdadero} /> 
      : 
      (
        verdadero2 == false ? <ContainerRegisterEmpresa2 setVerdadero={setVerdadero} setVerdadero2={setVerdadero2} /> 
        :
        <ContainerRegisterEmpresa3 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          confirmarPassword={confirmarPassword} 
          setConfirmarPassword={setConfirmarPassword} 
          setVerdadero2={setVerdadero2} /> 
      )}
      
    </div>
  )
}


let a = 4
a == 5 ? "Si" : "No"
