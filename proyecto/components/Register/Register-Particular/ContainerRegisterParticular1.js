import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular1.module.css'
import { confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut } from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { auth, db, providerGoogle } from '../../../firebase/ControladorFirebase'
import { Route, useRouter } from 'next/router'
import Image from 'next/image'
import Spinner from '../../Spinner/Spinner';






const ContainerRegisterParticular1 = ({
  setVerdadero,
  userCore,
  setUserCore,
}) => {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmarPasswordError, setConfirmarPasswordError] = useState(false)

  const [emailExistsError, setEmailExistsError] = useState(false)
  const [passwordShort, setPassswordShort] = useState(false)

  const [loading, setLoading] = useState(false)

  let load = false




  const handleGoogle = async () => {
    setLoading(true)
    setTimeout(() => {
      signInWithPopup(auth, providerGoogle).then((result) => {

        setTimeout(async () => {

          let isRegistered = await userExists(auth.currentUser.email).then((r) => { return r })

          if (isRegistered == true) {

            router.push('/')
            return
          }

          const user = auth.currentUser
          setDoc(doc(db, "Usuarios", user.email), {
            uid: user.uid,
            mail: user.email,
            type: "particular"
          })
          setVerdadero(true)
          setLoading(false)
        }, 600)
      }).catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)

      })
    }, 500)

  }


  const userExists = async (email) => {
    const docRef = doc(db, "Usuarios", email)
    console.log("docRef")
    const res = await getDoc(docRef)
    return res.exists()
  }




  const handleRegistrar = async () => {
    setLoading(true)
    setEmailError(false)
    setPasswordError(false)
    setConfirmarPasswordError(false)
    setEmailExistsError(false)

    let emailAccount = email
    let passwordAccount = password

    let errorEmailVar = false;
    let errorPasswordVar = false;
    let errorConfirmarPasswordVar = false;
    let errorPasswordShortVar = false;

    if (email === null || email === "" || email.length == 0) { errorEmailVar = true; }
    if (password === null || password === "" || password.length == 0) { errorPasswordVar = true; }
    if (confirmarPassword != password) { errorConfirmarPasswordVar = true; }
    


    setEmailError(errorEmailVar)
    setPasswordError(errorPasswordVar)
    setConfirmarPasswordError(errorConfirmarPasswordVar)
    if (errorEmailVar == true || errorPasswordVar == true || errorConfirmarPasswordVar == true) {
      setLoading(false)
      console.log("errorEmailVar" + errorEmailVar)
      console.log("errorPasswordVar" + errorPasswordVar)
      console.log("errorConfirmarPasswordVar" + errorConfirmarPasswordVar)
      return;
    }

    if (password.length < 6) { errorPasswordShortVar = true }
    setPassswordShort(errorPasswordShortVar)
    if (errorPasswordShortVar) {
      setLoading(false)
      return;
    }




    let isRegistered = false
    console.log("llega")
    isRegistered = await userExists(email).then(r => {
      return r;
    })
    console.log(isRegistered)
    if (isRegistered == true) {
      setLoading(false)
      setEmailExistsError(true);
      return;
    }


    setLoading(true)
    setTimeout(() => {
      console.log(loading)
      createUserWithEmailAndPassword(auth, emailAccount, passwordAccount).then((userCredential) => {

        const user = userCredential.user
        setDoc(doc(db, "Usuarios", user.email), {
          uid: user.uid,
          mail: user.email,
          type: "particular"
        })
        setVerdadero(true)
        setLoading(false)



      })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          const errorMessage = error.message;
          console.log(errorMessage)
        });

      return;
    }, 2000)



  }




  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.")
      console.log(auth)
    }).catch((error) => {
      console.log("No se deslogueo")
    });
    window.location.reload()

  }



  return (
    <div className={styles.div_supremo}>
      <div className={styles.main_container}>
        <div className={styles.inside_container}>
          <h2>Registra<span className={styles.text_blue}>te</span></h2>
          <div className={styles.form}>
            <div className={styles.div_fields}>
              {/*<div className={styles.fields}>
              <div className={styles.div_error}>
                <label >Nombre de usuario</label>
                {nameError == true ? <p>Ingrese un nombre de usuario valido</p> : null}
              </div>
              <input value={name} onChange={e => setName(e.target.value)} type='text' />
            </div>*/}

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
                  <label>Contraseña</label>
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



            {
              loading == false ?
                <div className={styles.div_buttons}>
                  <button className={styles.buttonGoogle} onClick={handleGoogle}><span>Google</span><Image src='/google.png' width={25} height={25} /></button> {/*<a href="https://www.flaticon.es/iconos-gratis/google" title="google iconos">Google iconos creados por Freepik - Flaticon</a>*/}
                  <button className={styles.button} onClick={handleRegistrar}>Registrarse</button>
                </div>
                :
                <div className={styles.div_spinner}>
                  <Spinner />
                </div>


            }

          </div>
        </div>
      </div>
      <div className={styles.div_detalle}>
            <div className={styles.div_inside_detalle}>
              <p>Ninguno de tus datos sera utilizado para fines fuera de esta pagina.</p>
              <img src="/icono_about.png" />
            </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular1