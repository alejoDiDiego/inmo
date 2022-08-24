import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../../styles/Layout.module.css'
import firebase, { FirebaseContext } from '../../firebase'


const Layout = ({ children, registro }) => {
    const [registroActive, setRegistroActive] = useState(false)
    

    
    useEffect(() => {   
        if (registro == true || registro != null) {
            setRegistroActive(true)
        }
    })

    const { usuario } = useContext(FirebaseContext)






    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Header usuario={usuario != null ? usuario : {usuario: {}} } registroActive={registroActive} />
            </div>
            {children}
            {
                !registroActive &&
                <div className={styles.footer}>
                    <Footer />
                </div>
            }

        </div>
    )
}

export default Layout;