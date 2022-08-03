import React, { useEffect, useState } from 'react'
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import styles from '../../../styles/ContainerRegisterParticular3.module.css'
import MyApp from '../../../pages/_app';
import "firebase/compat/firestore";
import { auth, db } from '../../../firebase/ControladorFirebase';
import Spinner from '../../Spinner/Spinner';
import { useRouter } from 'next/router';




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

  const handleInfo = async () => {
    const firestore = getFirestore(MyApp.app)

    const ref = doc(firestore, "Usuarios", userCore.email)

    updateDoc(ref, {
      nombrePublico: nomPub,
      numeroCel: numCel,
      numeroTel: numTel
    })

      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }



  // const isNumberCodArea = (str) => {
  //   if (str.trim() === '') {
  //     if (codArea.length == 1) { return !isNaN(str) }
  //     return false
  //   }
  //   return !isNaN(str)
  // }

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




  // const handleCodArea = (e) => {
  //   if (isNumberCodArea(e.target.value)) {
  //     setCodArea(e.target.value)
  //     console.log("valido")
  //     //
  //   } else {
  //     console.log("no valido")
  //     //return
  //   }
  // }

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



  const handleSubmit = () => {
    setErrorNomUsu(false)



    if (nomUsu == '' || nomUsu == null || nomUsu.length == 0) {
      setErrorNomUsu(true)
      return
    }

    setLoading(true)



    // falta hacer if para dependiendo que informacion subio (si solo subio el nombre, el nombre con el cel, etc)

    const user = auth.currentUser

    if ((numCel.length > 0 || numCel != '') && (numTel.length > 0 || numTel != '')) {
      updateDoc(doc(db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroCel: numCel,
        numeroTel: numTel,
        isRegistering: false
      })
      alert("Nombre, Num Celu, Num Tel")
    } else if ((numCel.length > 0 || numCel != '') && (numTel.length == 0 || numTel == '')) {
      updateDoc(doc(db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroCel: numCel,
        isRegistering: false
      })
      alert("Nombre, Num Celu")
    }
    else if ((numTel.length > 0 || numTel != '') && (numCel.length == 0 || numCel == '')) {
      updateDoc(doc(db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        numeroTel: numTel,
        isRegistering: false
      })
      alert("Nombre, Num Tel")
    }
    else {
      updateDoc(doc(db, "Usuarios", user.email), {
        nombreUsuario: nomUsu,
        isRegistering: false
      })
      alert("Nombre")
    }


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

export default ContainerRegisterParticular3