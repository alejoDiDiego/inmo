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
        </div>
    )
}

export default ContainerSpinner