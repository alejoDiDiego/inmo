import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../../styles/Layout.module.css'


const Layout = ({ children, usuario, registro }) => {
    const [registroActive, setRegistroActive] = useState(false)
    

    
    useEffect(() => {   
        if (registro == true || registro != null) {
            setRegistroActive(true)
        }
    })






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