import React from 'react'
import styles from '../../styles/ContainerInicioSesion.module.css'
import MyApp from '../../pages/_app'
import Link from 'next/link'
import { useState } from 'react'
import Spinner from '../../components/Spinner/Spinner';
import Image from 'next/image'
import firebase from '../../firebase'
import { useRouter } from 'next/router'


const ContainerInicioSesion = ({ loadingBig }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [viewPassword, setViewPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const router = useRouter()


  const handleGoogle = async () => {
    try {
      setLoading(true)
      await firebase.registrarGoogle();
      router.push("/")
      
    } catch(err) {
      console.log(err)
      setLoading(false)
    }

  }



  const handleIniciarSesion = async () => {
    let respuesta
    try {
      setLoading(true)
      respuesta = await firebase.iniciarSesion(email, password)
      if(respuesta != ""){
        setLoading(false)
        router.push("/")
      }
      console.log(respuesta)
    } catch (err) {
      setLoading(false)
      console.log(err.code.message) 
    }
  }


  return (


    <div className={styles.div_supremo}>
      <div className={styles.main_container}>
        {
          loadingBig == false ?
          (
            <div className={styles.inside_container}>
              <h2>Inicia <span className={styles.text_blue}>Sesion</span></h2>
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

































    // <div className={styles.main_container}>

    //     <h2 className={styles.h2}>Bienvenido a <span className={styles.blue}>Inmo</span></h2>

    //       <div className ={styles.fieldsE}>
    //         <label>Correo electronico</label>
    //         <input value={email} onChange={e => setEmail(e.target.value)} type='email'/>
    //       </div>

    //       <div className={styles.fieldsC}>
    //         <label>Contraseña</label>
    //         <input value={password} onChange={e => setPassword(e.target.value)} type='text'/>
    //       </div>

    //       <div className={styles.div_man}>
    //         <p className={styles.man}>Mantener sesion iniciada</p>   
    //         <input type="checkbox" /> 
    //       </div>

    //     <div className={styles.div_problemasInicio}>
    //       <p className={styles.problemasInicio}> Problemas para inciar sesion?</p>
    //       </div>

    //       <div className={styles.div_crearCuenta}>
    //       <p className={styles.crearCuenta}> Aun no estas regristrado en inmo?</p>
    //       </div>

    //     <button onClick={handlerIniciarSesion} className={styles.button}>Iniciar Sesion</button>

    // </div>
  )
}

export default ContainerInicioSesion