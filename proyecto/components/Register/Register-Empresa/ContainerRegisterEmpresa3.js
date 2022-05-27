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


  const handleRegister = () => {

  }



  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra <span className={styles.text_blue}>tu empresa 3</span></h2>
        <div className={styles.form}>
          <p>Introduzca informacion de contacto para que los posibles clientes puedan contactarlo para consultar sobre sus publicaciones</p>
          <div>
            <label>Direccion de su sede</label>
            <input type='text'></input>
          </div>

          <div>
            <div>
              <label>Localidad</label>
              <input type='text'></input>
            </div>
            <div>
              <label>Codigo postal</label>
              <input type='text'></input>
            </div>
          </div>

          <div>
            <div>
              <label>Cod area</label>
              <input type='text'></input>
            </div>
            <div>
              <label>Numero de celular</label>
              <input type='text'></input>
            </div>
          </div>

          <div>
            <label>Numero telefonico</label>
            <input type='text'></input>
          </div>

          <div>
            <label>Mail de contacto</label>
            <input type='text'></input>
          </div>

          <div className={styles.buttons}>
            <button onClick={handleAnterior}>Anterior</button>
            <button onClick={handleRegister}>Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa3