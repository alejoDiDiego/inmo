import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'



const Header = ({ usuario, registroActive }) => {

    const [active, setActive] = useState(false)
    const [activeUserMenu, setActiveUserMenu] = useState(false)
    console.log(usuario)


    return (
        <div className={styles.header}>
            <Link href='/'>
                <div className={styles.div_img}>
                    <Image layout="fill" src="/icono_about.png" />
                </div>
            </Link>
            {
                !registroActive &&
                <input placeholder='Direccion, localidad, provincia, vendedor' />
            }


            <div className={styles.derecha}>

                <div className={styles.div_img_user} onClick={() => { 
                    if(active == true){
                        setTimeout(() => {
                            setActiveUserMenu(!activeUserMenu)
                        }, 300); 
                        setActive(false) 
                    } else if(active == false){
                        setActiveUserMenu(!activeUserMenu)
                    }
                    
                }}>
                    <Image layout='fill' src='/user (3).png' />
                    {/*https://iconscout.com/icon/user-532  User Icon by Dalpat Prajapati on IconScout */}
                </div>


                <div className={`${styles.menu} ${active == true ? styles.active : null}`} onClick={() => { 
                    if(activeUserMenu == true){
                        setTimeout(() => {
                            setActive(!active)
                        },300); 
                        setActiveUserMenu(false) 
                    } else if(activeUserMenu == false) {
                        setActive(!active)
                    }
                    
                }}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>


            </div>

            <div className={`${styles.hidden_menu} ${active == true ? styles.active : null}`}>
                <div className={styles.inside_hidden_menu}>
                    wqeqwe

                </div>
            </div>

            <div className={`${styles.hidden_menu_user} ${activeUserMenu == true ? styles.active : null}`}>
                <div className={styles.inside_hidden_menu_user}>
                    {
                        usuario == null ?
                            <div>
                                <Link href='/inicio-sesion/principal'><button>Iniciar Sesion</button></Link>
                                <Link href='/registro/principal'><button>Registrarse</button></Link>
                                made by juan
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