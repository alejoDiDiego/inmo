import React from 'react'
import styles from '../../styles/ContainerInicioSesion.module.css'
import MyApp from '../../pages/_app'
import Link from 'next/link'
import { useState } from 'react'
import Spinner from '../../components/Spinner/Spinner';
import Image from 'next/image'
import firebase from '../../firebase'
import { useRouter } from 'next/router'
import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'


const ContainerInicioSesion = ({ loadingBig }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorEmailMensaje, setErrorEmailMensaje] = useState("")

  const [viewPassword, setViewPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [emailReestablecer, setEmailReestablecer] = useState("")
  const [reestablecerPassword, setReestablecerPassword] = useState(false)
  const [errorReestablecer, setErrorReestablecer] = useState(false)
  const [errorReestablecerMensaje, setErrorReestablecerMensaje] = useState("")

  const [enviado, setEnviado] = useState(false)

  const router = useRouter()


  const handleGoogle = async () => {
    try {
      setLoading(true)
      await firebase.registrarGoogle();
      router.push("/")

    } catch (err) {
      console.log(err)
      setLoading(false)
    }

  }



  const handleReestablecer = async () => {
    setErrorReestablecer(false)
    setErrorReestablecerMensaje("")
    setEnviado(false)
    try {
      await sendPasswordResetEmail(firebase.auth, emailReestablecer)
      setEnviado(true)
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode)
      setErrorReestablecer(true)
      if(errorCode.includes("auth/missing-email")){
        setErrorReestablecerMensaje("Ingrese un email")

      } else if(errorCode.includes("auth/invalid-email")){
        setErrorReestablecerMensaje("Ingrese un email valido")

      } else if(errorCode.includes("auth/user-not-found")){
        setErrorReestablecerMensaje("Usuario no encontrado")

      } else{
        setErrorReestablecerMensaje(error.code)
      }
    }
  }



  const handleIniciarSesion = async () => {
    setLoading(true)
    signInWithEmailAndPassword(firebase.auth, email, password).then((userCredential) => {
      console.log(userCredential)
      router.push("/")
    }).catch((error) => {
      setLoading(false)
      const errorCode = error.code;
      console.log(errorCode)
      setErrorEmail(true)
      if (errorCode.includes("auth/invalid-email")) {
        setErrorEmailMensaje("Email invalido")

      } else if (errorCode.includes("auth/wrong-password")) {
        setErrorEmailMensaje("Contraseña incorrecta")

      } else if (errorCode.includes("auth/user-not-found")) {
        setErrorEmailMensaje("Usuario no encontrado")
      } else {
        console.log(errorCode)
        setErrorEmailMensaje("Error: " + errorCode)
      }

    });
  }




  if (reestablecerPassword == false) {
    return (


      <div className={styles.div_supremo}>
        <div className={styles.main_container}>
          {
            loadingBig == false ?
              (
                <div className={styles.inside_container}>
                  <h2>Inicia <span className={styles.text_blue}>Sesion</span></h2>
                  {
                    errorEmail &&
                    (
                      <p>{errorEmailMensaje}</p>
                    )
                  }
                  <div className={styles.form}>

                    <label className={`${styles.custom_field} ${styles.two}`}>
                      <input value={email} onChange={e => { setEmail(e.target.value); }} type="text" readOnly={loading} placeholder="&nbsp;" />
                      <span className={styles.placeholder}>Email</span>
                    </label>

                    <label className={`${styles.custom_field} ${styles.two}`}>
                      <input value={password} id="password" onChange={e => { setPassword(e.target.value); }} type={viewPassword == true ? "text" : "password"} readOnly={loading} placeholder="&nbsp;" />
                      <span className={styles.placeholder}>Contraseña</span>
                      <i onClick={() => setViewPassword(!viewPassword)} class={viewPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
                    </label>


                    {
                      loading == false ?
                        <div className={styles.div_buttons}>
                          {/*<button className={styles.buttonGoogle} onClick={handleGoogle}><span>Google</span><Image src='/google.png' width={25} height={25} /></button> <a href="https://www.flaticon.es/iconos-gratis/google" title="google iconos">Google iconos creados por Freepik - Flaticon</a>*/}
                          <div className={styles.buttonGoogle} onClick={handleGoogle}>
                            <div className={styles.buttonGoogle_back}></div>
                            <div className={styles.buttonGoogle_content}><span>Iniciar sesion con Google</span><Image src='/google.png' width={25} height={25} /></div>
                          </div>
                          <div className={styles.button} onClick={handleIniciarSesion}>
                            <div className={styles.button_back}></div>
                            <div className={styles.button_content}><span>Iniciar Sesion</span></div>
                          </div>

                          <p style={{ cursor: 'pointer' }} onClick={() => { setReestablecerPassword(true) }}>¿Ha olvidado su contraseña?</p>
                        </div>
                        :
                        <div className={styles.div_spinner}>
                          <Spinner />
                        </div>





                    }

                  </div>
                </div>
              ) :
              (
                <Spinner />
              )
          }

        </div>
      </div>

    )
  } else {
    return (
      <div className={styles.div_supremo}>
        <div className={styles.main_container}>
          <div className={styles.inside_container}>
            <h2>Inicia <span className={styles.text_blue}>Sesion</span></h2>
            {
              errorReestablecer &&
              <p>{errorReestablecerMensaje}</p>
            }
            {
              enviado &&
              <p>Mail de reestablecimiento de contraseña enviado a {emailReestablecer}</p>
            }
            <div className={styles.form}>

              <label className={`${styles.custom_field} ${styles.two}`}>
                <input value={emailReestablecer} onChange={e => { setEmailReestablecer(e.target.value); }} type="text" readOnly={loading} placeholder="&nbsp;" />
                <span className={styles.placeholder}>Email</span>
              </label>


              <div className={styles.div_buttons}>
                <div className={styles.button} onClick={handleReestablecer}>
                  <div className={styles.button_back}></div>
                  <div className={styles.button_content}><span>Reestablecer contraseña</span></div>
                </div>
                <p style={{ cursor: 'pointer' }} onClick={() => { setReestablecerPassword(false) }}>Volver a iniciar sesion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }



}

export default ContainerInicioSesion