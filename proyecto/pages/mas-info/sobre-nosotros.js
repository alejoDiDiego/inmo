import React from 'react'
import styles from '../../styles/SobreNosotros.module.css';
import Layout from '../../components/layout/Layout'

const sobreNosotros = () => {
    return (
        <Layout>
            <div className={styles.body}>
                <div className={styles.contenedor_Grande}>
                    <div className={styles.contenedor_Principal}>

                        <div className={styles.img}>
                            <h1 className={styles.h1}>Sobre <span className={styles.span}>nosostros</span></h1>



                        </div>

                        <div className={styles.textos}>

                            <h2 className={styles.titulo}>Mas que una simple pagina, un <span className={styles.span}>proyecto</span></h2>

                            <p className={styles.texto}>Nuestro compromiso en inmo es poder traer al usuario una nueva experiencia de busqueda teniendo como puntos centrales la <span className={styles.span}>simplicidad</span> y la <span className={styles.span}>accesibilidad</span>.</p>

                        </div>
                    </div>

                    <div className={styles.contenedor_Secundario}>

                        <div className={styles.img_Sec}>

                        </div>

                        <div className={styles.textos_Sec}>

                        </div>

                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default sobreNosotros