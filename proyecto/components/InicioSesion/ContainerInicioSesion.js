import React from 'react'
import styles from '../../styles/ContainerInicioSesion.module.css'
import MyApp from '../../pages/_app'
import {signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from "firebase/auth";

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

        <div>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type='email'/>
        </div>

        <div>
            <label>Contraseña</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type='text'/>
        </div>

        <button onClick={handlerIniciarSesion}>Iniciar Sesion</button>
    </div>

  )
}

export default ContainerInicioSesion