import React, { useEffect, useState } from 'react'
import { doc, updateDoc, getFirestore, setDoc } from "firebase/firestore";
import styles from '../../../styles/ContainerRegisterGeneral3.module.css'
import MyApp from '../../../pages/_app';
import "firebase/compat/firestore";
import Spinner from '../../Spinner/Spinner';
import { useRouter } from 'next/router';
import firebase from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendEmailVerification, updateProfile } from "firebase/auth";



const ContainerRegisterParticular3 = ({
  setVerdadero2,
  userCore,
  setUserCore,
  omitir,
  setOmitir
}) => {

  const [nomUsu, setNomUsu] = useState('')
  const [numCel, setNumCel] = useState('')
  const [numTel, setNumTel] = useState('')

  const [errorNomUsu, setErrorNomUsu] = useState(false)

  const [loading, setLoading] = useState(false)


  const router = useRouter()



  const handleAnterior = () => {
    setVerdadero2(false)
  }


  const isNumberNumCel = (str) => {
    if (str.trim() === '') {
      if (numCel.length == 1) { return !isNaN(str) }
      return false
    }
    return !isNaN(str)
  }

  const isNumberNumTel = (str) => {
    if (str.trim() === '') {
      if (numTel.length == 1) { return !isNaN(str) }
      return false
    }
    return !isNaN(str)
  }


  const handleNumCel = (e) => {
    if (isNumberNumCel(e.target.value)) {
      setNumCel(e.target.value)
      console.log("valido")
      //
    } else {
      console.log("no valido")
      //return
    }
  }

  const handleNumTel = (e) => {
    if (isNumberNumTel(e.target.value)) {
      setNumTel(e.target.value)
      console.log("valido")
      //
    } else {
      console.log("no valido")
      //return
    }
  }



  const handleSubmit = async () => {
    setErrorNomUsu(false)

    if (nomUsu == '' || nomUsu == null || nomUsu.length == 0) {
      setErrorNomUsu(true)
      return
    }

    setLoading(true)

    const { email, password, imagePerfilUpload, imageFondoUpload } = userCore

    try {
      const user = await firebase.registrar(firebase.auth, email, password)

      const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings)
      console.log("se mando")


      setDoc(doc(firebase.db, "Usuarios", user.email), {
        uid: user.uid,
        mail: user.email,
        type: "empresa",
      })

      if (imagePerfilUpload != null) {
        const imagePerfRef = ref(firebase.storage, `usuarios/${firebase.auth.currentUser.email}/perfil`)
        const snapshot = await uploadBytes(imagePerfRef, imagePerfilUpload) // le subo el archivo ya que imagePerfilUpload es un archivo y no una url
        console.log("url")
        const url = await getDownloadURL(snapshot.ref)
        console.log(url)
        await updateProfile(user, {
          photoURL: url
        }).then(() => {
          console.log("se actualizo la foto de display")
        }).catch((error) => {
          console.log(error.message)
          console.log("hubo un errror actualizando la foto de display")
        });

        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          fotoPerfilURL: url
        }).catch((error) => {
          console.log(error)
        })
      } else {
        const imagePerfRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
        const url = await getDownloadURL(imagePerfRef)
        await updateProfile(user, {
          photoURL: url
        }).then(() => {
          console.log("se actualizo la foto de display")
        }).catch((error) => {
          console.log(error.message)
          console.log("hubo un errror actualizando la foto de display")
        });

        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          fotoPerfilURL: url
        }).catch((error) => {
          console.log(error)
        })
      }




      if (imageFondoUpload != null) {
        const imageFondRef = ref(firebase.storage, `usuarios/${firebase.auth.currentUser.email}/fondo`)
        const snapshot = await uploadBytes(imageFondRef, imageFondoUpload)
        const url = await getDownloadURL(snapshot.ref)

        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          fotoFondoURL: url
        }).catch((error) => {
          console.log(error)
        })
      } else{
        const imageFondRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
        const url = await getDownloadURL(imageFondRef)
        
        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          fotoFondoURL: url
        }).catch((error) => {
          console.log(error)
        })
      }



      if ((numCel.length > 0 || numCel != '') && (numTel.length > 0 || numTel != '')) {
        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: nomUsu,
          numeroCel: numCel,
          numeroTel: numTel,
        })
      } else if ((numCel.length > 0 || numCel != '') && (numTel.length == 0 || numTel == '')) {
        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: nomUsu,
          numeroCel: numCel,
        })
      }
      else if ((numTel.length > 0 || numTel != '') && (numCel.length == 0 || numCel == '')) {
        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: nomUsu,
          numeroTel: numTel,
        })
      }
      else {
        await updateDoc(doc(firebase.db, "Usuarios", user.email), {
          nombreUsuario: nomUsu,
        })
      }

      await updateProfile(user, {
        displayName: nomUsu
      }).then(() => {
        console.log("se actualizo el nombre de display")
      }).catch((error) => {
        console.log(error.message)
        console.log("hubo un errror actualizando el nombre de display")
      });
    } catch (err) {
      console.log(err)
      setLoading(false)
    }




    //alert("Bienvenido, cuenta totalmente creada")
  }



  const handleVolver = () => {
    setVerdadero2(false)
  }






  return (
    <div className={styles.div_supremo}>
      <div className={styles.main_container}>
        <div className={styles.inside_container}>
          <h2>Información <span className={styles.text_blue}>extra</span></h2>
          <div className={styles.form}>
            <div className={styles.div_fields}>

              {/* <div className={styles.fields}>
                <div className={styles.div_error}>
                  <label>Nombre de usuario*</label>
                  {errorNomUsu == true ? <p>Dato obligatorio</p> : null}
                </div>

                <input value={nomUsu} onChange={e => setNomUsu(e.target.value)} type='text' readOnly={loading} />
              </div> */}


              <label className={`${styles.custom_field} ${styles.two}`}>
                <input value={nomUsu} onChange={e => { setNomUsu(e.target.value); setErrorNomUsu(false) }} type="text" readOnly={loading} placeholder="&nbsp;" />
                <span className={styles.placeholder}>Nombre de Usuario*</span>
                {errorNomUsu == true ?
                  <div className={styles.div_error}>
                    <p>Ingrese un nombre valido</p>
                  </div>
                  : null}
              </label>





              {/* <div className={styles.fields}>
                <div className={styles.div_error_tel}>
                  <label>Numero de celular</label>
                </div>

                <input value={numCel} onChange={handleNumCel} type='text' placeholder='Ej. 5491122223333' readOnly={loading} />
              </div> */}


              <label className={`${styles.custom_field} ${styles.two}`}>
                <input value={numCel} onChange={handleNumCel} type="text" readOnly={loading} placeholder="&nbsp;" />
                <span className={styles.placeholder}>Numero de Celular</span>
                <i class="fa-solid fa-circle-info"><span className={styles.span}>Ej: 5491112341234</span></i>
              </label>

              {/* <div className={styles.fields}>
                <label>Numero de telefono <span>(Opcional)</span></label>
                <input value={numTel} onChange={handleNumTel} type='text' placeholder='Ej. 541122223333' readOnly={loading} />
              </div> */}

              <label className={`${styles.custom_field} ${styles.two}`}>
                <input value={numTel} onChange={handleNumTel} type="text" readOnly={loading} placeholder="&nbsp;" />
                <span className={styles.placeholder}>Numero de Telefono</span>
                <i class="fa-solid fa-circle-info"><span className={styles.span2}>Ej: 12341234</span></i>
              </label>
            </div>

            {
              loading == false ?
                <div className={styles.div_buttons}>
                  <div className={styles.button_volver} onClick={handleVolver}>
                    <div className={styles.button_back}></div>
                    <div className={styles.button_content}><span>Volver</span></div>
                  </div>

                  <div className={styles.button} onClick={handleSubmit}>
                    <div className={styles.button_back}></div>
                    <div className={styles.button_content}><span>Finalizar</span></div>
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

export default ContainerRegisterParticular3