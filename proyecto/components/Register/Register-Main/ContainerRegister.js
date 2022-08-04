import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegister.module.css'
import Spinner from '../../Spinner/Spinner';

const ContainerRegister = ({ loading }) => {
    return (
        <div className={styles.main_container}>
            {
                loading == false ?
                    <div className={styles.no_spinner}>
                        <h2 className={styles.h2}>¿Que tipo de cuenta se adapta mas a <span className={styles.text_blue}>ti?</span></h2>

                        <Link href='/registro/empresa' >
                            <a className={styles.link}>
                                <div className={styles.containers}>
                                    <div className={styles.inside}>
                                        <div className={styles.inside_info}>
                                            <div className={styles.images}>
                                                <Image src='/register_picture.png' width={80} height={80} />
                                                <Image src='/register_picture.png' width={80} height={80} />
                                                <Image src='/register_picture.png' width={80} height={80} />
                                            </div>
                                            <div className={styles.texts}>
                                                <h3>Cuenta Empresarial / Inmobiliaria</h3>
                                                <p>Administra multiples publicaciones a nombre de tu empresa</p>
                                            </div>
                                        </div>
                                        <div className={styles.blues}></div>
                                    </div>
                                </div>
                            </a>
                        </Link>

                        <Link href='/registro/particular' >
                            <a className={styles.link}>
                                <div className={styles.containers}>
                                    <div className={styles.inside}>
                                        <div className={styles.inside_info}>
                                            <div className={styles.images}>
                                                <Image src='/register_picture.png' width={80} height={80} />
                                            </div>
                                            <div className={styles.texts}>
                                                <h3>Cuenta Particular</h3>
                                                <p>Publica tu casa sin cargo o busca tu nuevo hogar entre miles de publicaciones</p>
                                            </div>
                                        </div>
                                        <div className={styles.blues}></div>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                    :
                    <div className={styles.div_spinner}>
                        <Spinner />
                    </div>
            }
        </div>


    )
}

export default ContainerRegister