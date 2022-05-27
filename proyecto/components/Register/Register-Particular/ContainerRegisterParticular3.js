import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular3.module.css'
import MyApp from '../../../pages/_app';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {getAuth} from "firebase/auth";

const ContainerRegisterParticular3 = ({
  setVerdadero2,
  email,
  setEmail,
  password,
  setPassword,
  confirmarPassword,
  setConfirmarPassword
}) => {


  const handleAnterior = () => {
    setVerdadero2(false)
  }

  const handleRegistrar = () => {
    const auth = getAuth(MyApp.app)
    const emailAccount = email
    const passwordAccount = password
    createUserWithEmailAndPassword(auth, emailAccount, passwordAccount).then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;  
      console.log(errorMessage) 
  });
  }


  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra<span className={styles.text_blue}>te 3</span></h2>
        <div className={styles.form}>
          <p>Introduzca informacion de contacto para que los otros usuarios de la plataforma puedan contactar con usted</p>
          <div className={styles.div_fields}>

            <div className={styles.fields}>
              <label>Nombre de referencia</label>
              <input type='text' />
            </div>

            <div className={styles.fields}>
              <label>Cod Area</label>
              <input type='text' />
            </div>

            <div className={styles.fields}>
              <label>Numero de celular</label>
              <input type='text' />
            </div>

            <div className={styles.fields}>
              <label>Numero de telefono</label>
              <input type='text' />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleRegistrar}>Registrarse</button>
            <button className={styles.button} onClick={handleAnterior}>Anterior</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular3