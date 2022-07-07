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

        <h2 className={styles.h2}>Bienvenido a <span className={styles.blue}>Inmo</span></h2>

          <div className ={styles.fieldsE}>
            <label>Correo electronico</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type='email'/>
          </div>

          <div className={styles.fieldsC}>
            <label>Contraseña</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type='text'/>
          </div>

          <div className={styles.div_man}>
            <p className={styles.man}>Mantener sesion iniciada</p>   
            <input type="checkbox" /> 
          </div>

        <div className={styles.div_problemasInicio}>
          <p className={styles.problemasInicio}> Problemas para inciar sesion?</p>
          </div>

          <div className={styles.div_crearCuenta}>
          <p className={styles.crearCuenta}> Aun no estas regristrado en inmo?</p>
          </div>

        <button onClick={handlerIniciarSesion} className={styles.button}>Iniciar Sesion</button>

    </div>
  )
}

export default ContainerInicioSesion