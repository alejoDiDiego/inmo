import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterEmpresa1.module.css'
import MyApp from '../../../pages/_app';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {doc, setDoc,  } from "firebase/firestore";
import "firebase/compat/firestore";
import { auth, db } from '../../../firebase/ControladorFirebase'



const ContainerRegisterEmpresa1 = ({
  name,
  setName,
  setVerdadero,
  email ,
  setEmail ,
  password ,
  setPassword ,
  confirmarPassword ,
  setConfirmarPassword
}) => {

  const handleSiguiente = () => {
    setVerdadero(true)
  }

  const handleRegistrar = () => {
    const emailAccount = email
    const passwordAccount = password
    createUserWithEmailAndPassword(auth, emailAccount, passwordAccount).then((userCredential) => {
      
      
      const user = userCredential.user
      
      setDoc(doc(db, "Usuarios", user.email), {
        name : name,
        uid : user.uid,
        mail : user.email,
        type : "empresa"
      })
      setVerdadero(true)

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
        <h2>Registra <span className={styles.text_blue}>tu empresa</span></h2>
        <div className={styles.form}>
          <div className={styles.div_fields}>
            <div className={styles.fields}>
              <label>Nombre de la empresa</label>
              <input value={name} onChange={e => setName(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <label>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type='email' />
            </div>

            <div className={styles.fields}>
              <label>Constraseña</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' />
            </div>

            <div className={styles.fields}>
              <label>Confirmar contraseña</label>
              <input type='password' />
            </div>
          </div>

          
          <div className={styles.div_link}>
            <label className={styles.label_link}>Permito que utilizen mi informacion segun estos terminos: <Link href='/'><a>www.link.com</a></Link></label>
            <input type='checkbox' />
          </div>




          <button onClick={handleRegistrar}>Registrarse</button>

        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa1