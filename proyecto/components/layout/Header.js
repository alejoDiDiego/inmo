import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import InputBusqueda from './InputBusqueda'




const Header = ({ usuario, enRegistro }) => {

    const router = useRouter()

    const [active, setActive] = useState(false)
    const [activeUserMenu, setActiveUserMenu] = useState(false)
    const [foto, setFoto] = useState("")
    const [barraBusqueda, setBarraBusqueda] = useState(true)




    useEffect(() => {
        if (usuario.emailVerified == false) {
            setBarraBusqueda(false)
        } else {
            setBarraBusqueda(true)
        }
    }, [usuario])



    useEffect(() => {
        console.log("barraBusqueda" + barraBusqueda)
    }, [barraBusqueda])


    useEffect(() => {
        if (enRegistro == true) {
            setBarraBusqueda(false)
        }
    })





    useEffect(() => {
        setFoto(usuario.photoURL)

    }, [usuario.photoURL])


    return (
        <div className={styles.header}>
            {
                Object.keys(usuario).length < 1 ?
                    <Link href='/'>
                        <div className={styles.div_img}>
                            <Image layout="fill" src="/icono_about.png" />
                        </div>
                    </Link> :
                    <Link href={usuario.emailVerified ? '/' : '/verificar'}>
                        <div className={styles.div_img}>
                            <Image layout="fill" src="/icono_about.png" />
                        </div>
                    </Link>

            }


            {
                barraBusqueda &&
                <InputBusqueda />
            }


            <div className={styles.derecha}>



                <div className={`${styles.menu} ${active == true ? styles.active : null}`} onClick={() => { setActive(!active) }}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>


            </div>

            <div className={`${styles.hidden_menu} ${active == true ? styles.active : null}`}>
                <div className={styles.inside_hidden_menu}>
                    {
                        Object.keys(usuario).length < 1 ?

                            <div className={styles.options}>
                                <h2>Inmo</h2>
                                <Link href='/inicio-sesion/principal'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.buttonInside}>
                                            <img></img>
                                            <h4>Iniciar Sesion</h4>
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/registro/principal'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.line}></div>
                                        <div className={styles.buttonInside}>
                                            <img></img>
                                            <h4>Registrarse</h4>
                                        </div>
                                        <div className={styles.line}></div>
                                    </div>
                                </Link>
                            </div>
                            :
                            <div>
                                {
                                    Object.keys(usuario).length > 0 ?
                                        <div className={styles.userInfo}>
                                            <div className={styles.foto}>
                                                <img src={foto} />
                                            </div>
                                            <h3>{usuario.displayName}</h3>
                                        </div>

                                        :
                                        <p>aa</p>
                                }
                                <div className={styles.options}>

                                    <Link href={usuario.emailVerified ? '/perfil/principal' : '/verificar'}>
                                        <div className={styles.menuButton}>
                                            <div className={styles.line}></div>
                                            <div className={styles.buttonInside}>
                                                <img></img>
                                                <h4>Mi Perfil</h4>
                                            </div>
                                            <div className={styles.line}></div>
                                        </div>
                                    </Link>

                                    <Link href={usuario.emailVerified ? '/crear-publicacion/principal' : '/verificar'}>
                                        <div className={styles.menuButton}>
                                            <div className={styles.line}></div>
                                            <div className={styles.buttonInside}>
                                                <img></img>
                                                <h4>Crear Publicacion</h4>
                                            </div>
                                            <div className={styles.line}></div>
                                        </div>
                                    </Link>
                                </div>

                                <div onClick={firebase.handleSignOut} className={styles.menuButtonSignOut}>
                                    <div className={styles.line}></div>
                                    <div className={styles.buttonInside}>
                                        <img></img>
                                        <h4>Cerrar Sesion</h4>
                                    </div>
                                    <div className={styles.line}></div>
                                </div>


                            </div>
                    }

                </div>
            </div>

        </div>

    )
}

export default Header;