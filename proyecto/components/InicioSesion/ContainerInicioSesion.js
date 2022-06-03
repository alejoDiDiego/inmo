import React from 'react'
import styles from '../../styles/ContainerInicioSesion.module.css'
import MyApp from '../../pages/_app'
import {signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from "firebase/auth";
import Link from 'next/link'

const ContainerInicioSesion = ({
  email,
  setEmail,
  password,
  setPassword
}) => {


  const handlerIniciarSesion = () => {
    const auth = getAuth(MyApp.app)
    const emailRegistro = email
    const passwordRegistro = password
    signInWithEmailAndPassword(auth, emailRegistro, passwordRegistro).then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message; 
      console.log(errorMessage) 
    });

  }


  return (

    <div className={styles.main_container}>
      
      <div className={styles.inside_container}>

        <h2 className={styles.h2}>Inicia <span className={styles.blue}>Sesion</span></h2>

        <div className ={styles.fields}>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type='email'/>
        </div>

        <div className={styles.fields}>
            <label>Contraseña</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type='text'/>
        </div>

        <div className={styles.div_p}>
            <p className={styles.p}>Mantener sesion iniciada</p>   
            <input type="checkbox" />
        </div>
      

        <button onClick={handlerIniciarSesion} className={styles.button}>Iniciar Sesion</button>
      </div>
    </div>
  )
}

export default ContainerInicioSesion