import React from 'react'
import styles from '../../styles/Creditos.module.css';

const creditos = () => {
    return (
    <div className={styles.body}>
            <div className={styles.contenedorGrande}>
                <div className={styles.contenedorPrincipal}>

                    <div className={styles.img}>
                        <h1 className={styles.h1}>Sobre <span className={styles.span}>nosostros</span></h1>



                    </div>

                    <div className={styles.textos}>

                        <h2 className={styles.titulo}>Mas que una simple pagina, un <span className={styles.span}>proyecto</span></h2>

                        <p className={styles.texto}>Nuestro compromiso en inmo es poder traer al usuario una nueva experiencia de busqueda teniendo como puntos centrales la <span className={styles.span}>simplicidad</span> y la <span className={styles.span}>accesibilidad</span>.</p>

                    </div>
                </div>

                <div className={styles.contenedorSecundario}>

                    <div className={styles.imgSec}>

                    </div>

                    <div className={styles.textosSec}>

                    </div>

                </div>



            </div>
        </div>
    )
}

export default creditos
