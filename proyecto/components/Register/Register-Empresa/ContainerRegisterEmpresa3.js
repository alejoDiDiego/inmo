import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from "next/router";
import styles from '../../../styles/ContainerRegisterEmpresa3.module.css'



const ContainerRegisterEmpresa3 = ({
  setVerdadero2,
  email,
  password ,
  confirmarPassword,

}) => {

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
}


  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra <span className={styles.text_blue}>tu empresa 3</span></h2>
        <div className={styles.form}>
          <p>Introduzca informacion de contacto para que los posibles clientes puedan contactarlo para consultar sobre sus publicaciones</p>
          <div className={styles.fields}>
            <label>Direccion de su sede</label>
            <input type='text'></input>
          </div>

          <div>
            <div className={styles.fields}>
              <label>Localidad</label>
              <input type='text'></input>
            </div>
            <div className={styles.fields}>
              <label>Codigo postal</label>
              <input type='text'></input>
            </div>
          </div>

          <div>
            <div className={styles.fields}>
              <label>Cod area</label>
              <input type='text'></input>
            </div>
            <div className={styles.fields}>
              <label>Numero de celular</label>
              <input type='text'></input>
            </div>
          </div>

          <div className={styles.fields}>
            <label>Numero telefonico</label>
            <input type='text'></input>
          </div>

          <div className={styles.fields}>
            <label>Mail de contacto</label>
            <input type='text'></input>
          </div>

          <div className={styles.button}>
            <button onClick={handleInfo}>Finalizar</button>
            <button  onClick={handleAnterior}>Anterior</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa3