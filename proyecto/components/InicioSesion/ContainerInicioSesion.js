import React from 'react'
import styles from '../../styles/ContainerInicioSesion.module.css'


const ContainerInicioSesion = () => {
  return (
    <div className={styles.main_container}>

        <div>
            <label>Email</label>
            <input type='email'/>
        </div>

        <div>
            <label>Contraseña</label>
            <input type='text'/>
        </div>

        <button>Iniciar Sesion</button>
    </div>

  )
}

export default ContainerInicioSesion