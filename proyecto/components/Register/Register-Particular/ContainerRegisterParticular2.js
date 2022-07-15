import { updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'
import { auth, storage } from '../../../firebase/ControladorFirebase'
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";
import { sendEmailVerification, signOut } from 'firebase/auth'




const ContainerRegisterParticular2 = ({
    setVerdadero,
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

    const [errorFalta, setErrorFalta] = useState(false)


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


    const handleOmitir = () => {
        setOmitir(true)
        setVerdadero2(true)
    }

    const handleSiguiente = () => {
        console.log(imagePerfilUpload)
        setErrorFalta(false)
        if (imagePerfilUpload != null && (imageFondoUpload != null || imageFondoUpload == null)) {
            const imagePerfRef = ref(storage, `usuarios/${auth.currentUser.email}/perfil`)
            uploadBytes(imagePerfRef, imagePerfilUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImagePerfilURL((prev) => [...prev, url])
                })
            })

            if (imageFondoUpload == null) {
                localStorage.setItem('siguienteCRP2', true)
                console.log('localStorage ' + localStorage.getItem('siguienteCRP2'))
                setOmitir(false);
                setVerdadero2(true);
                return;
            }
            const imageFondRef = ref(storage, `usuarios/${auth.currentUser.email}/fondo`)
            uploadBytes(imageFondRef, imageFondoUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageFondoURL((prev) => [...prev, url])
                })
            })
            localStorage.setItem('siguienteCRP2', true)
            console.log('localStorage ' + localStorage.getItem('siguienteCRP2'))
            setVerdadero2(true)
            setOmitir(false)
        } else {
            setErrorFalta(true)
        }


    }



    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign-out successful.")
            console.log(auth)
        }).catch((error) => {
            console.log("No se deslogueo")

        });
        window.location.reload()
    }



    const handleEnviar = () => {
        const actionCodeSettings = {
            url: 'http://localhost:3000/registro/particular/registro-particular',
            handleCodeInApp: true,
        };


        sendEmailVerification(auth.currentUser, actionCodeSettings).then(() => {
            console.log("se re mando")
        })
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
                                    {imageFondoUpload == null ?
                                        <div className={styles.img_empty}></div> :
                                        <img src={imageFondoURL}></img>
                                    }
                                    <label className={styles.label} htmlFor='fondo'>Elija una imagen</label>
                                    <input id='fondo' type="file" onChange={e => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg" />

                                </div>


                            </div>

                            {errorFalta == true ? <p className={styles.p_error}>Debe subir la foto de perfil</p> :
                                <div className={styles.div_error_vacio}></div>
                            }

                            <div className={styles.buttons}>

                                <button className={styles.button} onClick={handleOmitir}>Omitir</button>
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