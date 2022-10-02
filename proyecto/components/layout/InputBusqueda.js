import Image from 'next/image'
import Router from 'next/router'
import React, { useState } from 'react'
import styles from "../../styles/InputBusqueda.module.css"

const InputBusqueda = () => {

    const [busqueda, setBusqueda] = useState("")



    const handleBuscar = () => {
        if(busqueda.trim() === "") return

        Router.push({
            pathname: '/publicaciones/principal',
            query: { q : busqueda}
        })
    }




    return (
        <div className={styles.main}>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.input} placeholder='Provincia, Municipio, Localidad' />
            <div onClick={() => handleBuscar()} className={styles.div_img}>
                <Image src='/search2.png' layout='fill' />
            </div>

        </div>
    )
}

export default InputBusqueda