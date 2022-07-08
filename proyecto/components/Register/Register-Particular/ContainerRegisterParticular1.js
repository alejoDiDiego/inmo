import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular1.module.css'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { auth, db, providerGoogle } from '../../../firebase/ControladorFirebase'




const ContainerRegisterParticular1 = ({
  setVerdadero,
  userCore,
  setUserCore,
}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [name, setName] = useState("")

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmarPasswordError, setConfirmarPasswordError] = useState(false)

  const [emailExistsError, setEmailExistsError] = useState(false)
  const [passwordShort, setPassswordShort] = useState(false)



  const handleGoogle = () => {
    signInWithPopup(auth, providerGoogle).then((result) => {
    setVerdadero(true)
    })
  }


  const userExists = async (email) => {
      const docRef = doc(db, "Usuarios", email)
      console.log("docRef")
      console.log(docRef)
      const res = await getDoc(docRef)
      console.log(res)
      return res.exists()
  }




  const handleRegistrar = async () => {
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmarPasswordError(false)
    setEmailExistsError(false)

    let emailAccount = email
    let passwordAccount = password

    let errorNameVar = false;
    let errorEmailVar = false;
    let errorPasswordVar = false;
    let errorConfirmarPasswordVar = false;
    let errorPasswordShortVar = false;
    
    if(name === null || name === "" || name.length == 0) {errorNameVar = true;}
    if(email === null || email === "" || email.length == 0) {errorEmailVar = true; }
    if(password === null || password === "" || password.length == 0) {errorPasswordVar = true; }
    if(confirmarPassword != password) {errorConfirmarPasswordVar = true; }

    

    setNameError(errorNameVar)
    setEmailError(errorEmailVar)
    setPasswordError(errorPasswordVar)
    setConfirmarPasswordError(errorConfirmarPasswordVar)
    
    if(errorNameVar == true || errorEmailVar == true || errorPasswordVar == true || errorConfirmarPasswordVar == true) {
      return;
    }

    if(password.length < 6) {errorPasswordShortVar = true}
    setPassswordShort(errorPasswordShortVar)
    if(passwordShort){
      return;
    }

    let isRegistered = false
    console.log("llega")
    isRegistered = await userExists(email).then(r => {
      return r;
    })
    console.log(isRegistered)
    if(isRegistered == true) {
      setEmailExistsError(true); 
      return;
    }

    
    
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
        const errorMessage = error.message;
        console.log(errorMessage)
      });
      return;
  }




  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.")
    }).catch((error) => {
      console.log("No se deslogueo")
    });
    
  }

  console.log(auth)


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
                {passwordShort == true ? <p>La contraseña debe tener mas de 6 digitos</p> : null}
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



          <div>
            <button className={styles.button} onClick={handleRegistrar}>Registrarse</button>
            <button className={styles.button} onClick={handleGoogle}>Google</button>
            <button className={styles.button} onClick={handleSignOut}>Salir de la cuenta</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular1