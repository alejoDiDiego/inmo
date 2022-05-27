import Link from 'next/link'
import React from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'


const ContainerRegisterParticular2 = ({ setVerdadero, setVerdadero2 }) => {


    const handleAnterior = () => {
        setVerdadero(false)
    }

    const handleSiguiente = () => {
        setVerdadero2(true)
    }



    return (
        <div className={styles.main_container}>
            <div className={styles.inside_container}>
                <h2>Registra<span className={styles.text_blue}>te 2</span></h2>
                <div className={styles.form}>
                    <div className={styles.div_fields}>
                        <div className={styles.fields}>
                            <label>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</label>
                            <button className={styles.btn_subir_imagen}>Subir Imagen</button>
                        </div>

                        <div className={styles.fields}>
                            <label>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
                            <button className={styles.btn_subir_imagen}>Subir Imagen</button>
                        </div>

                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={handleSiguiente}>Siguiente</button>
                            <button className={styles.button} onClick={handleAnterior}>Anterior</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerRegisterParticular2