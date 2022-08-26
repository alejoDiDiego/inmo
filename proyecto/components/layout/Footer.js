import React from 'react';
import styles from '../../styles/Footer.module.css';


const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.square}>
                <img className={styles.img_footer} src="/icono_about.png" />

                <div className={styles.txt}>
                    <p>The inmo company | 2022</p>
                </div>

            </div>


        </div>
    )
}

export default Footer;
