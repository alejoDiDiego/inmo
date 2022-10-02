import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'




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
                <input placeholder='Direccion, localidad, provincia, vendedor' />
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
                                <h1>Inmo</h1>
                                <Link className={styles.link} href='/inicio-sesion/principal'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.buttonInside}>
                                            <img src='/key.png'></img>
                                            <h4>Iniciar Sesion</h4>
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/registro/principal'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.buttonInside}>
                                            <img src='/register.png'></img>
                                            <h4>Registrarse</h4>
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/mas-info/creditos'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.buttonInside}>
                                            <img src='/customer-service.png'></img>
                                            <h4>Sobre Nosotros</h4>
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/mas-info/sobre-nosotros'>
                                    <div className={styles.menuButton}>
                                        <div className={styles.buttonInside}>
                                            <img src='/people.png'></img>
                                            <h4>Creditos</h4>
                                        </div>
                                    </div>
                                </Link>
                                <div className={styles.currentUser}>
                                    <div className={styles.userDivider}>
                                        <img src='/register_picture.png'></img>
                                        <h4>Todavia no has iniciado sesion</h4>
                                    </div>
                                </div>

                            </div>
                            :
                            <div>
                                <div className={styles.options}>
                                    <h1>Inmo</h1>
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
                                    <Link href='/mas-info/creditos'>
                                        <div className={styles.menuButton}>
                                            <div className={styles.buttonInside}>
                                                <img src='/customer-service.png'></img>
                                                <h4>Sobre Nosotros</h4>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href='/mas-info/sobre-nosotros'>
                                        <div className={styles.menuButton}>
                                            <div className={styles.buttonInside}>
                                                <img src='/people.png'></img>
                                                <h4>Creditos</h4>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className={styles.currentUserLogged}>

                                        {
                                            Object.keys(usuario).length > 0 ?
                                                <div>
                                                    <p>Sesion iniciada como:</p>
                                                    <div className={styles.userDividerLogged}>

                                                        <div className={styles.foto}>
                                                            <img src={foto} />
                                                        </div>
                                                        <h3>{usuario.displayName}</h3>
                                                    </div>
                                                </div>

                                                :
                                                <p>aa</p>
                                        }
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </div>

    )
}

export default Header;