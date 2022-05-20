import React from 'react'
import styles from '../../styles/Header.module.css'
import Link from 'next/link'
import Image from 'next/image'



export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.back}>
            <div className={styles.div_title}>
                <h1 className={styles.h1_title}>Encuentra tu hogar de forma <span className={styles.span}>Simple.</span></h1>
            </div>

            <div className={styles.div_right}>
                <div className={styles.div_button}>
                    <Link href="/"><a className={styles.link_inicio}>Iniciar Sesion</a></Link>
                    <Link href="/registro/register-main"><a className={styles.link_registro}>Registrarse</a></Link>
                </div>

                <div className={styles.div_search}>
                    <form className={styles.form_search} onSubmit={null}>
                        <input type="text" className={styles.search} placeholder='Direccion, ubicacion, codigo postal' />
                        <button type='submit' className={styles.image}><Image width={22} height={22} src="/search2.png" /></button>
                    </form>
                </div>
            </div>
        </div>
        </div>

    )
}
