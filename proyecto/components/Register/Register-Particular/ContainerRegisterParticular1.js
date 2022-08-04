import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular1.module.css'
import { doc, getDoc, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Spinner from '../../Spinner/Spinner';
import firebase from '../../../firebase';






const ContainerRegisterParticular1 = ({
  setVerdadero,
  userCore,
  setUserCore
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

  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmarPassword, setViewConfirmarPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  let load = false





  const handleGoogle = async () => {

    try {
      setLoading(true)
      const user = await firebase.registrarGoogle();
      let isRegistered = await userExists(firebase.auth.currentUser.email).then((r) => { return r })
      if (isRegistered == false) {
        await setDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: user.displayName,
          uid: user.uid,
          mail: user.email,
          type: "particular"
        })
        console.log('creado nuevo usuario')
      }
      setLoading(false)
      console.log('el usuario existe')
      router.push('/')
      

    }
    catch (error) {
      setLoading(false)
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)

    }

  }


  const userExists = async (email) => {
    const docRef = doc(firebase.db, "Usuarios", email)
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


    setLoading(true)

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



    setUserCore({
      email,
      password,
    })

    setLoading(false)
    setVerdadero(true)


    return;

  }








  return (
    <div className={styles.div_supremo}>
      <div className={styles.main_container}>
        <div className={styles.inside_container}>
          <h2>Registra<span className={styles.text_blue}>te</span></h2>
          <div className={styles.form}>


            <div className={styles.fields}>
              <div className={styles.div_error} >
                <label>Email</label>
                {emailError == true ? <p>Ingrese un email valido</p> : null}
                {emailExistsError == true ? <p>El mail ya existe</p> : null}
              </div>

              <input value={email} onChange={e => setEmail(e.target.value)} type='email' readOnly={loading} />
            </div>

            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Contraseña</label>
                {passwordError == true ? <p>Ingrese una contraseña valida</p> : null}
                {passwordShort == true ? <p>La contraseña debe tener mas de 6 digitos</p> : null}
              </div>

              <div className={styles.div_input}>
                <input value={password} id="password" onChange={e => setPassword(e.target.value)} type={viewPassword == true ? "text" : "password"} readOnly={loading} />
                <i onClick={() => setViewPassword(!viewPassword)} class={viewPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
              </div>
            </div>

            <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Confirmar contraseña</label>
                {confirmarPasswordError == true ? <p>Ambas contraseñas deben coincidir</p> : null}
              </div>
              <div className={styles.div_input}>
                <input value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} type={viewConfirmarPassword == true ? "text" : "password"} readOnly={loading} />
                <i onClick={() => setViewConfirmarPassword(!viewConfirmarPassword)} class={viewConfirmarPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
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