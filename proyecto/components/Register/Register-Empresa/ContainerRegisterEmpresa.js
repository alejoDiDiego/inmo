import React from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegisterEmpresa.module.css'



const ContainerRegisterEmpresa = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra <span className={styles.text_blue}>tu empresa</span></h2>
        <form className={styles.form}>
          <div className={styles.div_fields}>
            <div className={styles.fields}>
              <label>Nombre de la empresa</label>
              <input type='text' />
            </div>

            <div className={styles.fields}>
              <label>Email</label>
              <input type='email' />
            </div>

            <div className={styles.fields}>
              <label>Constraseña</label>
              <input type='password' />
            </div>

            <div className={styles.fields}>
              <label>Confirmar contraseña</label>
              <input type='password' />
            </div>
          </div>

          
          <div className={styles.div_link}>
            <label className={styles.label_link}>Permito que utilizen mi informacion segun estos terminos: <Link href='/'><a>www.link.com</a></Link></label>
            <input type='checkbox' />
          </div>




          <input type="submit" value='Siguiente' />

        </form>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa