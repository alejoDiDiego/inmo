import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Footer.module.css'


const Footer = () => {
    return (
            <div className={styles.footer}>
                <img className={styles.img} src="/inmo_placa.png" />
                <div className={styles.div_img_social}>
                    <div className={styles.div_img_social_inside}>
                        <img className={styles.img_social} src="/facebook.png" />
                        <p>inmooficial</p>
                    </div>

                    <div className={styles.div_img_social_inside}>
                        <img className={styles.img_social} src="/instagram.png" />
                        <p>@inmook</p>
                    </div>
                    
                </div>
            </div>
    )
}

export default Footer