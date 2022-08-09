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



const ContainerRegisterEmpresa3 = ({
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

    const user = await firebase.registrar(firebase.auth, email, password)

    const actionCodeSettings = {
      url: 'http://localhost:3000/',
      handleCodeInApp: true,
    };

    await sendEmailVerification(user, actionCodeSettings)
    console.log("se mando")

    alert("Se mando el mail, fijese en su casilla de Spam si no le llego")

    setDoc(doc(firebase.db, "Usuarios", user.email), {
      uid: user.uid,
      mail: user.email,
      type: "empresa"
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

    }

    if (imageFondoUpload != null) {
      const imageFondRef = ref(firebase.storage, `usuarios/${firebase.auth.currentUser.email}/fondo`)
      await uploadBytes(imageFondRef, imageFondoUpload)
    }



    if ((numCel.length > 0 || numCel != '') && (numTel.length > 0 || numTel != '')) {
      await updateDoc(doc(firebase.db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroCel: numCel,
        numeroTel: numTel,
      })
      alert("Nombre, Num Celu, Num Tel")
    } else if ((numCel.length > 0 || numCel != '') && (numTel.length == 0 || numTel == '')) {
      await updateDoc(doc(firebase.db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroCel: numCel,
      })
      alert("Nombre, Num Celu")
    }
    else if ((numTel.length > 0 || numTel != '') && (numCel.length == 0 || numCel == '')) {
      await updateDoc(doc(firebase.db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroTel: numTel,
      })
      alert("Nombre, Num Tel")
    }
    else {
      await updateDoc(doc(firebase.db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
      })
      alert("Nombre")
    }

    await updateProfile(user, {
      displayName: nomUsu
    }).then(() => {
      console.log("se actualizo el nombre de display")
    }).catch((error) => {
      console.log(error.message)
      console.log("hubo un errror actualizando el nombre de display")
    });
    



    setTimeout(() => {
      router.push('/')
    }, 3000)

    //alert("Bienvenido, cuenta totalmente creada")
  }






  return (
    <div className={styles.div_supremo}>
      <div className={styles.main_container}>
        <div className={styles.inside_container}>
          <h2>Registra<span className={styles.text_blue}>te 3</span></h2>
          <div className={styles.form}>
            <p>Introduzca informacion de contacto para que los otros usuarios de la plataforma puedan contactar con usted</p>
            <div className={styles.div_fields}>

              <div className={styles.fields}>
                <div className={styles.div_error}>
                  <label>Nombre de usuario*</label>
                  {errorNomUsu == true ? <p>El nombre es obligatorio</p> : null}
                </div>

                <input value={nomUsu} onChange={e => setNomUsu(e.target.value)} type='text' readOnly={loading} />
              </div>

              <div className={styles.fields}>
                <div className={styles.div_error_tel}>
                  <label>Numero de celular</label>
                </div>

                <input value={numCel} onChange={handleNumCel} type='text' placeholder='Ej. 5491122223333' readOnly={loading} />
              </div>

              <div className={styles.fields}>
                <label>Numero de telefono <span>(Opcional)</span></label>
                <input value={numTel} onChange={handleNumTel} type='text' placeholder='Ej. 541122223333' readOnly={loading} />
              </div>
            </div>

            {
              loading == false ?
                <div className={styles.buttons}>
                  <button className={styles.button} onClick={handleSubmit}>Finalizar</button>
                  {omitir == true ?
                    <button className={styles.button} onClick={handleAnterior}>Anterior</button>
                    :
                    null
                  }
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
          <p>Por el momento, el unico dato obligatorio es el nombre de usuario.</p>
          <img src="/icono_about.png" />
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa3