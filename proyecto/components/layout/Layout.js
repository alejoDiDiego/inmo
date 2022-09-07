import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../../styles/Layout.module.css'
import firebase, { FirebaseContext } from '../../firebase'
import { useRouter } from 'next/router'

const Layout = ({ children, registro }) => {



    const router = useRouter()
    const { usuario } = useContext(FirebaseContext)
    const [enRegistro, setEnRegistro] = useState(false)

    useEffect(() => {
        if (registro) {
            setEnRegistro(true)
        }
    })





    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Header usuario={usuario != null ? usuario : { usuario: {} }} enRegistro={enRegistro} />
            </div>
            
                {children}
            

            {
                !enRegistro &&
                <div className={styles.footer}>
                    <Footer />
                </div>
            }

        </div>
    )
}

export default Layout;