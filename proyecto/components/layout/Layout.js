import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../../styles/Layout.module.css'

const Layout = props => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Header />
            </div>
            {props.children}
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;