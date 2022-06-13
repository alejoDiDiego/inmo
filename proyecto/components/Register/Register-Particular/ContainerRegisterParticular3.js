import React, { useState, useEffect } from 'react'
import { addDoc, collection, doc, setDoc, Firestore, updateDoc, getFirestore } from "firebase/firestore";
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterParticular3.module.css'
import MyApp from '../../../pages/_app';
import "firebase/compat/firestore";
import { async } from '@firebase/util';


const ContainerRegisterParticular3 = ({
  setVerdadero2,
  userCore,
  setUserCore,
}) => {

  const [nomPub, setNomPub] = useState("")
  const [codArea, setCodArea] = useState(0)
  const [numCel, setNumCel] = useState(0)
  const [numTel, setNumTel] = useState(0)

  console.log(userCore.email)

  

  const handleAnterior = () => {
    setVerdadero2(false)
  }

  const handleInfo = async () => {
    const firestore = getFirestore(MyApp.app)

    const ref = doc(firestore, "Usuarios", userCore.email)

    updateDoc(ref, {
        nombrePublico : nomPub,
        codigoArea : codArea,
        numeroCel : numCel,
        numeroTel : numTel
    })

    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
    });

    /*
    const washingtonRef = doc(db, "cities", "DC");

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
    capital: true
    });
    */
}



  


  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra<span className={styles.text_blue}>te 3</span></h2>
        <div className={styles.form}>
          <p>Introduzca informacion de contacto para que los otros usuarios de la plataforma puedan contactar con usted</p>
          <div className={styles.div_fields}>

            <div className={styles.fields}>
              <label>Nombre publico</label>
              <input value={nomPub} onChange={e => setNomPub(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <label>Cod Area</label>
              <input value={codArea} onChange={e => setCodArea(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <label>Numero de celular</label>
              <input value={numCel} onChange={e => setNumCel(e.target.value)} type='text' />
            </div>

            <div className={styles.fields}>
              <label>Numero de telefono</label>
              <input value={numTel} onChange={e => setNumTel(e.target.value)} type='text' />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleInfo}>Finalizar</button>
            <button className={styles.button} onClick={handleAnterior}>Anterior</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterParticular3