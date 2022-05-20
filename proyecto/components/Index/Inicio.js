import React from 'react'
import Footer from './Footer'
import { Header } from './Header'
import Options from './Options'
import Image from 'next/image'
import styles from '../../styles/Inicio.module.css'




const Inicio = () => {
    return (
        <div>
            <Header />
            <Options />
            <div className={styles.div_about}>
                <Image width={200} height={100} src="/icono_about.png"/>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>
            <Footer />
            
        </div>
    )
}

export default Inicio
