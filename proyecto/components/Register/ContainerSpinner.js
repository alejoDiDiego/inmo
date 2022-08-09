import React, { useEffect, useState } from 'react'
import styles from '../../styles/ContainerSpinner.module.css'
import Spinner from '../Spinner/Spinner';






const ContainerSpinner = ({

}) => {




    return (
        <div className={styles.div_supremo}>
            <div className={styles.main_container}>
                    <Spinner />
            </div>
            <div className={styles.div_detalle}>
                <div className={styles.div_inside_detalle}>
                    <p></p>
                    <img src="/icono_about.png" />
                </div>
            </div>
        </div>
    )
}

export default ContainerSpinner