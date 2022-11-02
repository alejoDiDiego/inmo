import React from 'react'
import styles from '../../styles/Creditos.module.css';
import Layout from '../../components/layout/Layout'

const creditos = () => {
    return (
        <Layout>
            <div className={styles.body}>
                <div className={styles.contenedor_Grande}>
                    <div className={styles.contenedor_Principal}>

                        <div className={styles.img}>
                            <div>
                                <h2 className={styles.h1}>Créditos</h2>

                                <img className={styles.img_footer} src="/icono_about.png" />
                            </div>

                        </div>

                        <div className={styles.textos}>

                            <h2 className={styles.titulo}>Una carta a todos los que nos<span className={styles.span}>ayudaron.</span></h2>

                            <p className={styles.texto}>Ademas de nuestro grupo de trabajo contamos con la ayuda infaltable de nuestros profesores y el apoyo de nuestros directivos durante todo nuestro desarrollo, sin su ayuda <span className={styles.span}>Inmo</span> no seria lo que es hoy, por esta misma razón no nos queda mas que estar agradecidos.</p>

                            <p className={styles.texto2}>A todos los que hicieron este proyecto posible. <span className={styles.span}>Gracias.</span></p>
                        </div>
                    </div>


                    <div className={styles.contenedor_Secundario}>

                        <div className={styles.textos_sec}>

                            <h2 className={styles.titulo_sec}>Créditos por multimedia</h2>

                            <div className={styles.contenedor_img}>

                                <p className={styles.texto_sec}>Imágenes:</p>
                                <p className={styles.link}></p>
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default creditos