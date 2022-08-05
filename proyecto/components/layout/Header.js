import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'



const Header = ({ usuario }) => {

    const [active, setActive] = useState(false)


    return (
        <div className={styles.header}>
            <div className={styles.div_img}>
                <Image layout="fill" src="/icono_about.png" />
            </div>

            <div className={styles.derecha}>

                <input placeholder='Direccion, localidad, provincia, vendedor' />


                <div className={`${styles.menu} ${active == true ? styles.active : null}`} onClick={() => setActive(!active)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>


            </div>

            <div className={`${styles.hidden_menu} ${active == true ? styles.active : null}`}>
                
                    <div className={`${styles.inside_hidden_menu} ${active == true ? styles.active : null}`}>
                        <p>ohalaa</p>
                        <p>ohalaa</p>
                        <p>ohalaa</p>
                        <p>ohalaa</p>
                        <p>ohalaa</p>
                        <p>ohalaa</p>
                    </div>
                
            </div>






        </div>

    )
}

export default Header;