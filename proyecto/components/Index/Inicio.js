import React, { useState } from 'react'
import Footer from './Footer'
import { Header } from './Header'
import Options from './Options'
import Image from 'next/image'
import styles from '../../styles/Inicio.module.css'




const Inicio = () => {

    const [logged, setLogged] = useState(false)



    return (
        <div>
            <Header logged={logged} setLogged={setLogged} />
            <Options />
            <div className={styles.div_about}>
                <Image width={200} height={100} src="/icono_about.png"/>
                <p>El compromiso de Inmo es facilitar la busqueda de inmuebles para todo tipo de personas, ya sean inversores y empresarios que buscan encontrar su proxima oportunidad de expansion o personas que busquen encontrar su nuevo hogar.</p>
            </div>
            <Footer />
            
        </div>
    )
}

export default Inicio
