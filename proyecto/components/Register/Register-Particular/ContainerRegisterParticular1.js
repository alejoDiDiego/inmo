import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular1.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, Firestore, getFirestore, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { auth, db } from '../../../firebase/ControladorFirebase'


const ContainerRegisterParticular1 = ({
  setVerdadero,
  email,
  setEmail,
  password,
  setPassword,
  confirmarPassword,
  setConfirmarPassword,
  name,
  setName,
  userCore,
  setUserCore,
}) => {

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmarPasswordError, setConfirmarPasswordError] = useState(false)

  const [emailExistsError, setEmailExistsError] = useState(false)

  const handleSiguiente = () => {
    setVerdadero(true)
  }
  const handleRegistrar = () => {
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmarPasswordError(false)
    setEmailExistsError(false)
    const emailAccount = email
    const passwordAccount = password
    if(name == null || name == "") {setNameError(true); }
    if(email == null || email == "") {setEmailError(true); }
    if(password == null || password == "") {setPasswordError(true); }
    if(confirmarPassword != password) {setConfirmarPasswordError(true); }
    if(nameError == true || emailError == true || passwordError == true || confirmarPasswordError == true) return;

    
    console.log(db)
    createUserWithEmailAndPassword(auth, emailAccount, passwordAccount).then((userCredential) => {


      const user = userCredential.user
      setUserCore(user);
      setDoc(doc(db, "Usuarios", user.email), {
        name: name,
        uid: user.uid,
        mail: user.email,
        type: "particular"
      })
      setVerdadero(true)


    })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        console.log(typeof errorCode)
        if(errorCode == "auth/email-already-in-use") {setEmailExistsError(true)}
        if(errorCode == "auth/invalid-email") {setEmailError(true)}
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }




  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra<span className={styles.text_blue}>te</span></h2>
        <div className={styles.form}>
          <div className={styles.div_fields}>
            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label >Nombre de usuario</label>
                {nameError == true ? <p>Ingrese un nombre de usuario valido</p> : null}
              </div>
              <input value={name} onChange={e => setName(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Email</label>
                {emailError == true ? <p>Ingrese un email valido</p> : null}
                {emailExistsError == true ? <p>El mail ya existe</p> : null}
              </div>
              
              <input value={email} onChange={e => setEmail(e.target.value)} type='email' />
            </div>

            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Constraseña</label>
                {passwordError == true ? <p>Ingrese una contraseña valida</p> : null}
              </div>
              
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' />
            </div>

            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Confirmar contraseña</label>
                {confirmarPasswordError == true ? <p>Ambas contraseñas deben coincidir</p> : null}
              </div>
              <input value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} type='password' />
            </div>
          </div>


          <div className={styles.div_link}>
            <label className={styles.label_link}>Permito que utilizen mi informacion segun estos terminos: <Link href='/'><a>www.link.com</a></Link></label>
            <input type='checkbox' />
          </div>




          <button className={styles.button} onClick={handleRegistrar}>Registrarse</button>

        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular1