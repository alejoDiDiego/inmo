import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterGeneral1.module.css'
import { doc, getDoc, setDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Spinner from '../../Spinner/Spinner';
import firebase from '../../../firebase';
import { updateProfile } from 'firebase/auth';





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
      console.log(isRegistered)
      if (isRegistered == false) {
        const imageFondRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
        const urlFondo = await getDownloadURL(imageFondRef)
        await setDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: user.displayName,
          uid: user.uid,
          mail: user.email,
          type: "particular",
          fotoPerfilURL: user.photoURL,
          fotoFondoURL: urlFondo
        })

        console.log('creado nuevo usuario')
      } else {
        const docRef = doc(firebase.db, "Usuarios", user.email)
        const docSnap = await getDoc(docRef)
        const document = docSnap.data()
        console.log(document)
        updateProfile(user, {
          photoURL: document.fotoPerfilURL
        })
        console.log('el usuario existe')
        router.push('/')
      }
      setLoading(false)


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
    try {
      const docRef = doc(firebase.db, "Usuarios", email)
      console.log("docRef")
      const res = await getDoc(docRef)
      return res.exists()
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
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

    // let test = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    let test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

    if (email === null || email === "" || email.length == 0 || test == false) { errorEmailVar = true; }
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
          <h2>Crea tu cuenta en <span className={styles.text_blue}>Inmo</span></h2>
          <div className={styles.form}>


            {/* <div className={styles.fields}>
              <div className={styles.div_error} >
                <label>Email</label>
                {emailError == true ? <p>Ingrese un email valido</p> : null}
                {emailExistsError == true ? <p>El mail ya existe</p> : null}
              </div>

              <input value={email} onChange={e => setEmail(e.target.value)} type='email' readOnly={loading} />
            </div> */}

            <label className={`${styles.custom_field} ${styles.two}`}>
              <input value={email} onChange={e => { setEmail(e.target.value); setEmailError(false) }} type="text" readOnly={loading} placeholder="&nbsp;" />
              <span className={styles.placeholder}>Email*</span>
              {emailError == true ?
                <div className={styles.div_error}>
                  <p>Ingrese un email valido</p>
                </div>
                : null}
              {emailExistsError == true ?
                <div className={styles.div_error}>
                  <p>El mail ya existe</p>
                </div>
                : null}
            </label>

            {/* <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Contraseña</label>
                {passwordError == true ? <p>Ingrese una contraseña valida</p> : null}
                {passwordShort == true ? <p>La contraseña debe tener mas de 6 digitos</p> : null}
              </div>

              <div className={styles.div_input}>
                <input value={password} id="password" onChange={e => setPassword(e.target.value)} type={viewPassword == true ? "text" : "password"} readOnly={loading} />
                <i onClick={() => setViewPassword(!viewPassword)} class={viewPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
              </div>
            </div> */}




            <label className={`${styles.custom_field} ${styles.two}`}>
              <input value={password} id="password" onChange={e => { setPassword(e.target.value); setPassswordShort(false); setPasswordError(false) }} type={viewPassword == true ? "text" : "password"} readOnly={loading} placeholder="&nbsp;" />
              <span className={styles.placeholder}>Contraseña*</span>
              <i onClick={() => setViewPassword(!viewPassword)} class={viewPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
              {passwordError == true ?
                <div className={styles.div_error}>
                  <p>Ingrese una contraseña valida</p>
                </div>
                : null}
              {passwordShort == true ?
                <div className={styles.div_error}>
                  <p>La contraseña debe tener mas de 6 digitos</p>
                </div>
                : null}
            </label>


            {/* <div className={styles.fields}>
              <div className={styles.div_error}>
                <label>Confirmar contraseña</label>
                {confirmarPasswordError == true ? <p>Ambas contraseñas deben coincidir</p> : null}
              </div>
              <div className={styles.div_input}>
                <input value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)} type={viewConfirmarPassword == true ? "text" : "password"} readOnly={loading} />
                <i onClick={() => setViewConfirmarPassword(!viewConfirmarPassword)} class={viewConfirmarPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
              </div>

            </div> */}


            <label className={`${styles.custom_field} ${styles.two}`}>
              <input value={confirmarPassword} onChange={e => { setConfirmarPassword(e.target.value); setConfirmarPasswordError(false) }} type={viewConfirmarPassword == true ? "text" : "password"} readOnly={loading} placeholder="&nbsp;" />
              <span className={styles.placeholder}>Confirmar Contraseña*</span>
              <i onClick={() => setViewConfirmarPassword(!viewConfirmarPassword)} class={viewConfirmarPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
              {confirmarPasswordError == true ?
                <div className={styles.div_error}>
                  <p>Ambas contraseñas deben coincidir</p>
                </div>
                : null}
            </label>



            <div className={styles.div_link}>
              <label className={styles.label_link}>Permito que utilizen mi informacion segun estos terminos: <Link href='/'><a>www.link.com</a></Link></label>
              <input type='checkbox' />
            </div>



            {
              loading == false ?
                <div className={styles.div_buttons}>
                  {/*<button className={styles.buttonGoogle} onClick={handleGoogle}><span>Google</span><Image src='/google.png' width={25} height={25} /></button> <a href="https://www.flaticon.es/iconos-gratis/google" title="google iconos">Google iconos creados por Freepik - Flaticon</a>*/}
                  <div className={styles.buttonGoogle} onClick={handleGoogle}>
                    <div className={styles.buttonGoogle_back}></div>
                    <div className={styles.buttonGoogle_content}><Image src='/google.png' width={25} height={25} /></div>
                  </div>
                  <div className={styles.button} onClick={handleRegistrar}>
                    <div className={styles.button_back}></div>
                    <div className={styles.button_content}><span>Siguiente</span></div>
                  </div>
                </div>
                :
                <div className={styles.div_spinner}>
                  <Spinner />
                </div>


            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular1