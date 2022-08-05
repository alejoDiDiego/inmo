import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'




const Header = ({ usuario }) => {


    return (
        <div className={styles.header}>
            {
                usuario != null ?
                <button onClick={firebase.handleSignOut}></button>
                :
                <div>
                    <Link href="/inicio-sesion/principal">
                        <div>
                            Iniciar Sesion
                        </div>
                    </Link>

                    <Link href="/registro/principal">
                        <div>
                            Registrarse
                        </div>
                    </Link>
                </div>
            }
        </div>

    )
}

export default Header;