import React, { useEffect, useState } from 'react'
import styles from '../../../styles/ContainerSpinnerParticular.module.css'
import Spinner from '../../Spinner/Spinner';






const ContainerSpinnerParticular = ({

}) => {




    return (
        <div className={styles.div_supremo}>
            <div className={styles.main_container}>
                <div className={styles.inside_container}>
                    <Spinner />
                </div>
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

export default ContainerSpinnerParticular