import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from "next/router";
import styles from '../../../styles/ContainerRegisterEmpresa2.module.css'



const ContainerRegisterEmpresa2 = ({setVerdadero, setVerdadero2}) => {

    const handleAnterior = () => {
        setVerdadero(false)
    }

    const handleSiguiente = () => {
        setVerdadero2(true)
    }



  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra <span className={styles.text_blue}>tu empresa 2</span></h2>
        <div className={styles.form}>
          <div>
            <p>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</p>
            <div>
              <button className={styles.btn_subir_imagen}>Subir Imagen</button>
            </div>
          </div>

          <div>
            <p>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</p>
            <div>
              <button className={styles.btn_subir_imagen}>Subir Imagen</button>
            </div>
          </div>


          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleSiguiente}>Siguiente</button>
            <button className={styles.button} onClick={handleAnterior}>Anterior</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa2