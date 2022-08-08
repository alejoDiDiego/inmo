import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'



const Header = ({ usuario }) => {

    const [active, setActive] = useState(false)
    console.log(usuario)


    return (
        <div className={styles.header}>
            <Link href='/'>
                <div className={styles.div_img}>
                    <Image layout="fill" src="/icono_about.png" />
                </div>
            </Link>

            <input placeholder='Direccion, localidad, provincia, vendedor' />

            <div className={styles.derecha}>

                <div className={styles.div_img_user}>
                    <Image layout='fill' src='/user.png' />
                    {/*https://iconscout.com/icon/user-1851010  User Icon by IconScout Store */}
                </div>


                <div className={`${styles.menu} ${active == true ? styles.active : null}`} onClick={() => setActive(!active)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>


            </div>

            <div className={`${styles.hidden_menu} ${active == true ? styles.active : null}`}>

                <div className={styles.inside_hidden_menu}>
                    {
                        usuario == null ?
                            <div>
                                <Link href='/inicio-sesion/principal'><button>Iniciar Sesion</button></Link>
                                <Link href='/registro/principal'><button>Registrarse</button></Link>
                            </div>
                            :
                            <div>
                                <button onClick={firebase.handleSignOut}>Cerrar Sesion</button>
                            </div>
                    }

                </div>

            </div>






        </div>

    )
}

export default Header;