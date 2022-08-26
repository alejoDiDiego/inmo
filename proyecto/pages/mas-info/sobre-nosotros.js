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
                            <div>
                                <h2 className={styles.h1}>Sobre<span className={styles.span}>nosostros</span></h2>

                                <img className={styles.img_footer} src="/icono_about.png" />
                            </div>

                        </div>

                        <div className={styles.textos}>

                            <h2 className={styles.titulo}>Mas que una simple pagina, un <span className={styles.span}>proyecto</span></h2>

                            <p className={styles.texto}>Nuestro compromiso en inmo es poder traer al usuario una nueva experiencia de busqueda teniendo como puntos centrales la <span className={styles.span}>simplicidad</span> y la <span className={styles.span}>accesibilidad</span>.</p>

                        </div>
                    </div>


                    <div className={styles.contenedor_Secundario}>

                        <div className={styles.textos_sec}>

                            <h2 className={styles.titulo_sec}>Un grupo pequeno de estudiantes. Con grandes <span className={styles.span}>metas</span></h2>

                            <p className={styles.texto_sec}>No hace falta tener un gran equipo para llegar a lugares grandes, actualmente nuestro equipo esta compuesto por un grupo de 5 estudiantes de informatica basados en argentina que se plantearon una meta en comun, llegando a un resultado final <span className={styles.span}>Inmo.</span></p>

                        </div>


                        <div className={styles.img_Sec}>
                            <h2 className={styles.h1_sec}>Quienes<span className={styles.span}>somos</span></h2>
                        </div>



                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default sobreNosotros