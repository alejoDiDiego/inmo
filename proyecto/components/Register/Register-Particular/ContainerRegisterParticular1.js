import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular1.module.css'
import MyApp from '../../../pages/_app';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, Firestore, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const ContainerRegisterParticular1 = ({
  setVerdadero,
  email,
  setEmail,
  password,
  setPassword,
  confirmarPassword,
  setConfirmarPassword
}) => {

  const handleSiguiente = () => {
    setVerdadero(true)
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


  const handlePrueba = async () => {
    const firestore = getFirestore(MyApp.app)
    const colUsuarios = collection(firestore,"Usuarios");
    const datos = {
        nombre: 'Franco lago',
        email: 'fran080j9@gmail.com'
    }

    addDoc(colUsuarios,datos);

  }


  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra<span className={styles.text_blue}>te</span></h2>
        <div className={styles.form}>
          <div className={styles.div_fields}>
            <div className={styles.fields}>
              <label>Nombre de usuario</label>
              <input type='text' />
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




          <button className={styles.button} onClick={handlePrueba}>Registrarse</button>

        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular1