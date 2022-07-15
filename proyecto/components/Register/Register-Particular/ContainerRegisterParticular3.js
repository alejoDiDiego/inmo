import React, { useState } from 'react'
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import styles from '../../../styles/ContainerRegisterParticular3.module.css'
import MyApp from '../../../pages/_app';
import "firebase/compat/firestore";
import { auth } from '../../../firebase/ControladorFirebase';
import Spinner from '../../Spinner/Spinner';



const ContainerRegisterParticular3 = ({
  setVerdadero2,
  userCore,
  setUserCore,
  omitir,
  setOmitir
}) => {

  const [nomUsu, setNomUsu] = useState('')
  const [codArea, setCodArea] = useState('')
  const [numCel, setNumCel] = useState('')
  const [numTel, setNumTel] = useState('')

  const [errorNomUsu, setErrorNomUsu] = useState(false)
  const [errorCodArea, setErrorCodArea] = useState(false)
  const [errorNumCel, setErrorNumCel] = useState(false)
  const [errorNumTel, setErrorNumTel] = useState(false)

  const [loading, setLoading] = useState(false)



  const handleAnterior = () => {
    setVerdadero2(false)
  }

  const handleInfo = async () => {
    const firestore = getFirestore(MyApp.app)

    const ref = doc(firestore, "Usuarios", userCore.email)

    updateDoc(ref, {
      nombrePublico: nomPub,
      codigoArea: codArea,
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



  const isNumberCodArea = (str) => {
    if(str.trim() === ''){
      if(codArea.length == 1){return !isNaN(str)}
      return false
    }
    return !isNaN(str)
  }

  const isNumberNumCel = (str) => {
    if(str.trim() === ''){
      if(numCel.length == 1){return !isNaN(str)}
      return false
    }
    return !isNaN(str)
  }

  const isNumberNumTel = (str) => {
    if(str.trim() === ''){
      if(numTel.length == 1){return !isNaN(str)}
      return false
    }
    return !isNaN(str)
  }




  const handleCodArea = (e) =>{
    if(isNumberCodArea(e.target.value)){
      setCodArea(e.target.value)
      console.log("valido")
      //
    } else{
      console.log("no valido")
      //return
    }
  }

  const handleNumCel = (e) => {
    if(isNumberNumCel(e.target.value)){
      setNumCel(e.target.value)
      console.log("valido")
      //
    } else{
      console.log("no valido")
      //return
    }
  }

  const handleNumTel = (e) => {
    if(isNumberNumTel(e.target.value)){
      setNumTel(e.target.value)
      console.log("valido")
      //
    } else{
      console.log("no valido")
      //return
    }
  }



  const handleSubmit = () => {
    setLoading(true)

    const user = auth.currentUser

    setDoc(doc(db, "Usuarios", user.email), {
      nombreUsuario: nomUsu,
      numeroCel: numCel,
      numeroTel: numTel
    })
  }






  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra<span className={styles.text_blue}>te 3</span></h2>
        <div className={styles.form}>
          <p>Introduzca informacion de contacto para que los otros usuarios de la plataforma puedan contactar con usted</p>
          <div className={styles.div_fields}>

            <div className={styles.fields}>
              <label>Nombre de usuario</label>
              <input value={nomUsu} onChange={e => setNomUsu(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <label>Cod Area</label>
              <input value={codArea} onChange={handleCodArea} type='text' placeholder='Ej. 54' />
            </div>

            <div className={styles.fields}>
              <label>Numero de celular</label>
              <input value={numCel} onChange={handleNumCel} type='text' placeholder='Ej. 12341234' />
            </div>

            <div className={styles.fields}>
              <label>Numero de telefono <span>(Opcional)</span></label>
              <input value={numTel} onChange={handleNumTel} type='text' placeholder='Ej. 12341234' />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleInfo}>Finalizar</button>
            {omitir == true ?
              <button className={styles.button} onClick={handleAnterior}>Anterior</button>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular3