import React from 'react'
import styles from '../../../styles/ContainerRegisterEmpresa.module.css'

const ContainerRegisterEmpresa = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registrar <span className={styles.text_blue}>tu empresa</span></h2>
        <form className={styles.form}>
          <div className={styles.fields}>
            <label>Nombre de la empresa</label>
            <input type='text' />
          </div>

          <div className={styles.fields}>
            <label>Email</label>
            <input type='text' />
          </div>

          <div className={styles.fields}>
            <label>Constraseña</label>
            <input type='text' />
          </div>

          <div className={styles.fields}>
            <label>Confirmar contraseña</label>
            <input type='text' />
          </div>
        </form>
        <div></div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa