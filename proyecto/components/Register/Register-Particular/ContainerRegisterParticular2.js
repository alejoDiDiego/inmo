import React, { useEffect, useState } from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";




const ContainerRegisterParticular2 = ({
    setVerdadero2,
    userCore,
    setUserCore,
    omitir,
    setOmitir
}) => {




    const [imagePerfilUpload, setImagePerfilUpload] = useState(null)
    const [imagePerfilURL, setImagePerfilURL] = useState([])
    const [imgPerfil, setImgPerfil] = useState(false)

    const [imageFondoUpload, setImageFondoUpload] = useState(null)
    const [imageFondoURL, setImageFondoURL] = useState([])
    const [imgFondo, setImgFondo] = useState(false)




    useEffect(() => {
        if (imagePerfilUpload == null) { setImgPerfil(false); return; }
        setImagePerfilURL(URL.createObjectURL(imagePerfilUpload))
        setImgPerfil(true)
    }, [imagePerfilUpload])

    useEffect(() => {
        if (imageFondoUpload == null) { setImgFondo(false); return; }
        setImageFondoURL(URL.createObjectURL(imageFondoUpload))
        setImgFondo(true)
    }, [imageFondoUpload])



    const handleSiguiente = () => {
        console.log(imagePerfilUpload)
        setUserCore({
            ...userCore,
            imagePerfilUpload,
            imageFondoUpload
        })

        setVerdadero2(true)




    }




    return (
        <div className={styles.div_supremo}>
            <div className={styles.main_container}>
                <div className={styles.inside_container}>
                    <div className={styles.div_header}>
                        <h2>Crea tu cuenta en <span className={styles.text_blue}>Inmo</span></h2>

                    </div>
                    <div className={styles.form}>

                        <div className={styles.div_fields}>
                            <div className={styles.fields}>
                                <h3>Imagen de <span className={styles.text_blue}>Perfil:</span></h3>
                                <label className={styles.label_desc1}>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</label>
                                <div className={styles.div_input_img}>
                                    {imgPerfil == false ?
                                        <div className={styles.img_empty}></div> :
                                        <img src={imagePerfilURL}></img>
                                    }
                                    <label className={styles.label} htmlFor='perfil'>Elija una imagen</label>
                                    <input id='perfil' type="file" onChange={e => { setImagePerfilUpload(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg" />

                                </div>
                            </div>

                            <div className={styles.fields}>
                                <h3 className={styles.h3}>Imagen de <span className={styles.text_blue}>Portada:</span></h3>
                                <label className={styles.label_desc2}>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
                                <div className={styles.div_input_img}>
                                    {imgFondo == false ?
                                        <div className={styles.img_empty}></div> :
                                        <img src={imageFondoURL}></img>
                                    }
                                    <label className={styles.label} htmlFor='fondo'>Elija una imagen</label>
                                    <input id='fondo' type="file" onChange={e => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg" />

                                </div>


                            </div>



                            <div className={styles.buttons}>
                                <button className={styles.button} onClick={handleSiguiente}>Siguiente</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.div_detalle}>
                <div className={styles.div_inside_detalle}>
                    <p>Una buena imagen ilustrativa aporta mucho a la primera impresion de tu empresa dentro de la pagina.</p>
                    <img src="/icono_about.png" />
                </div>
            </div>
        </div>
    )
}

export default ContainerRegisterParticular2