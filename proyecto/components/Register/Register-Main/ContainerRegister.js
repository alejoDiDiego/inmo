import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../../../styles/ContainerRegister.module.css'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Spinner from '../../Spinner/Spinner';
import firebase from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendEmailVerification, updateProfile } from "firebase/auth";





const ContainerRegister = ({
    loadingBig
}) => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmarPassword, setConfirmarPassword] = useState("")
    const [nomUsu, setNomUsu] = useState('')
    const [tipoCuenta, setTipoCuenta] = useState('particular')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmarPasswordError, setConfirmarPasswordError] = useState(false)
    const [errorNomUsu, setErrorNomUsu] = useState(false)

    const [emailExistsError, setEmailExistsError] = useState(false)
    const [passwordShort, setPassswordShort] = useState(false)

    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmarPassword, setViewConfirmarPassword] = useState(false)

    const [loading, setLoading] = useState(false)






    const userExists = async (email) => {
        try {
            const docRef = doc(firebase.db, "Usuarios", email)
            console.log("docRef")
            const res = await getDoc(docRef)
            return res.exists()
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }



    const handleGoogle = async () => {
        try {
            setLoading(true)
            await firebase.registrarGoogle();
            router.push("/")

        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }







    const handleRegistrar = async () => {
        setLoading(true)
        setEmailError(false)
        setPasswordError(false)
        setConfirmarPasswordError(false)
        setEmailExistsError(false)
        setErrorNomUsu(false)

        let errorEmailVar = false;
        let errorPasswordVar = false;
        let errorConfirmarPasswordVar = false;
        let errorPasswordShortVar = false;
        let errorNomUsu = false;

        // let test = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        let test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (email === null || email === "" || email.length == 0 || test == false) { errorEmailVar = true; }
        if (password === null || password === "" || password.length == 0) { errorPasswordVar = true; }
        if (password === null || password === "" || password.length == 0 || confirmarPassword != password) { errorConfirmarPasswordVar = true; }
        if (nomUsu === null || nomUsu === "" || nomUsu.length == 0) { errorNomUsu = true; }



        setEmailError(errorEmailVar)
        setPasswordError(errorPasswordVar)
        setConfirmarPasswordError(errorConfirmarPasswordVar)
        setErrorNomUsu(errorNomUsu)

        if (errorEmailVar == true || errorPasswordVar == true || errorConfirmarPasswordVar == true || errorNomUsu == true) {
            setLoading(false)
            console.log("errorEmailVar" + errorEmailVar)
            console.log("errorPasswordVar" + errorPasswordVar)
            console.log("errorConfirmarPasswordVar" + errorConfirmarPasswordVar)
            console.log("errorNomUsu" + errorNomUsu)
            return;
        }


        if (password.length < 6) { errorPasswordShortVar = true }
        setPassswordShort(errorPasswordShortVar)
        if (errorPasswordShortVar) {
            setLoading(false)
            return;
        }

        // let isRegistered = false
        // isRegistered = await userExists(email).then(r => { return r; })
        // if (isRegistered == true) {
        //     setLoading(false)
        //     setEmailExistsError(true);
        //     return
        // }



        try {
            const user = await firebase.registrar(firebase.auth, email, password)



            const actionCodeSettings = {
                url: 'http://localhost:3000/',
                handleCodeInApp: true,
            };



            await sendEmailVerification(user, actionCodeSettings)
            console.log("se mando")





            setDoc(doc(firebase.db, "Usuarios", user.uid), {
                nombreUsuario: nomUsu,
                uid: user.uid,
                mail: user.email,
                type: tipoCuenta,
                direccion: "",
                localidad: "",
                municipio: "",
                provincia: "",
                descripcion: "",
                numeroCelular: "",
                numeroTelefono: ""
            })


            // BEGIN IMAGENES
            const imagePerfRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
            const urlPerf = await getDownloadURL(imagePerfRef)
            await updateProfile(user, {
                displayName: nomUsu,
                photoURL: urlPerf
            }).then(() => {
                console.log("se actualizo la foto de display")
            }).catch((error) => {
                console.log(error.message)
                console.log("hubo un errror actualizando la foto de display")
            });

            await updateDoc(doc(firebase.db, "Usuarios", user.uid), {
                fotoPerfilURL: urlPerf
            }).catch((error) => {
                console.log(error)
            })



            const imageFondRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
            const urlFondo = await getDownloadURL(imageFondRef)

            await updateDoc(doc(firebase.db, "Usuarios", user.uid), {
                fotoFondoURL: urlFondo
            }).catch((error) => {
                console.log(error)
            })
            // END IMAGENES

        } catch (err) {
            console.log(err.code)
            let error = err.code
            if (error.includes("auth/email-already-in-use")) {
                setEmailExistsError(true)
            }
            setLoading(false)
        }





        //alert("Bienvenido, cuenta totalmente creada")
    }















    // const handleRegistrar = async () => {
    //     setLoading(true)
    //     setEmailError(false)
    //     setPasswordError(false)
    //     setConfirmarPasswordError(false)
    //     setEmailExistsError(false)

    //     let errorEmailVar = false;
    //     let errorPasswordVar = false;
    //     let errorConfirmarPasswordVar = false;
    //     let errorPasswordShortVar = false;

    //     // let test = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    //     let test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

    //     if (email === null || email === "" || email.length == 0 || test == false) { errorEmailVar = true; }
    //     if (password === null || password === "" || password.length == 0) { errorPasswordVar = true; }
    //     if (confirmarPassword != password) { errorConfirmarPasswordVar = true; }



    //     setEmailError(errorEmailVar)
    //     setPasswordError(errorPasswordVar)
    //     setConfirmarPasswordError(errorConfirmarPasswordVar)
    //     if (errorEmailVar == true || errorPasswordVar == true || errorConfirmarPasswordVar == true) {
    //         setLoading(false)
    //         console.log("errorEmailVar" + errorEmailVar)
    //         console.log("errorPasswordVar" + errorPasswordVar)
    //         console.log("errorConfirmarPasswordVar" + errorConfirmarPasswordVar)
    //         return;
    //     }

    //     if (password.length < 6) { errorPasswordShortVar = true }
    //     setPassswordShort(errorPasswordShortVar)
    //     if (errorPasswordShortVar) {
    //         setLoading(false)
    //         return;
    //     }


    //     setLoading(true)

    //     let isRegistered = false
    //     console.log("llega")
    //     isRegistered = await userExists(email).then(r => { return r; })
    //     console.log(isRegistered)
    //     if (isRegistered == true) {
    //         setLoading(false)
    //         setEmailExistsError(true);
    //         return;
    //     }



    //     setUserCore({
    //         email,
    //         password,
    //     })

    //     setLoading(false)
    //     setVerdadero(true)


    //     return;

    // }




    if (loadingBig == true) {
        return (
            <div className={styles.div_supremo}>
                <div className={styles.main_container}>
                    <div className={styles.spinner_container}>
                        <Spinner />
                    </div>
                </div>

            </div>
        )
    } else {




        return (
            <div className={styles.div_supremo}>
                <div className={styles.main_container}>
                    <div className={styles.inside_container}>
                        <h2>Crea tu cuenta en <span className={styles.text_blue}>Inmo</span></h2>
                        <div className={styles.form}>


                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input value={email} onChange={e => { setEmail(e.target.value); setEmailError(false) }} type="text" readOnly={loading} placeholder="&nbsp;" />
                                <span className={styles.placeholder}>Email*</span>
                                {emailError == true ?
                                    <div className={styles.div_error}>
                                        <p>Ingrese un email valido</p>
                                    </div>
                                    : null}
                                {emailExistsError == true ?
                                    <div className={styles.div_error}>
                                        <p>El mail ya existe</p>
                                    </div>
                                    : null}
                            </label>


                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input value={password} id="password" onChange={e => { setPassword(e.target.value); setPassswordShort(false); setPasswordError(false) }} type={viewPassword == true ? "text" : "password"} readOnly={loading} placeholder="&nbsp;" />
                                <span className={styles.placeholder}>Contraseña*</span>
                                <i onClick={() => setViewPassword(!viewPassword)} class={viewPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
                                {passwordError == true ?
                                    <div className={styles.div_error}>
                                        <p>Ingrese una contraseña valida</p>
                                    </div>
                                    : null}
                                {passwordShort == true ?
                                    <div className={styles.div_error}>
                                        <p>La contraseña debe tener mas de 6 digitos</p>
                                    </div>
                                    : null}
                            </label>


                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input value={confirmarPassword} onChange={e => { setConfirmarPassword(e.target.value); setConfirmarPasswordError(false) }} type={viewConfirmarPassword == true ? "text" : "password"} readOnly={loading} placeholder="&nbsp;" />
                                <span className={styles.placeholder}>Confirmar contraseña*</span>
                                <i onClick={() => setViewConfirmarPassword(!viewConfirmarPassword)} class={viewConfirmarPassword == true ? "fa-solid fa-eye" : "far fa-eye"}></i>
                                {confirmarPasswordError == true ?
                                    <div className={styles.div_error}>
                                        <p>Ambas contraseñas deben coincidir</p>
                                    </div>
                                    : null}
                            </label>





                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input value={nomUsu} onChange={e => { setNomUsu(e.target.value); setErrorNomUsu(false) }} readOnly={loading} placeholder="&nbsp;" />
                                <span className={styles.placeholder}>Nombre de usuario*</span>
                                {errorNomUsu == true ?
                                    <div className={styles.div_error}>
                                        <p>El nombre de usuario es obligatorio</p>
                                    </div>
                                    : null}
                            </label>




                            <div className={styles.select}>
                                <label className='TipoCuenta'>Tipo de cuenta</label>
                                <select value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
                                    <option value="particular">Particular</option>
                                    <option value="empresa">Empresa</option>
                                </select>
                            </div>








                            <div className={styles.div_link}>
                                <label className={styles.label_link}>Permito que utilizen mi informacion segun estos terminos: <Link href='/'><a>www.link.com</a></Link></label>
                                <input type='checkbox' />
                            </div>



                            {
                                loading == false ?
                                    <div className={styles.div_buttons}>
                                        <div className={styles.button} onClick={handleRegistrar}>
                                            <div className={styles.button_back}></div>
                                            <div className={styles.button_content}><span>Crear cuenta</span></div>
                                        </div>
                                        <div className={styles.buttonGoogle} onClick={handleGoogle}>
                                            <div className={styles.buttonGoogle_back}></div>
                                            <div className={styles.buttonGoogle_content}><span>Continuar con Google</span><Image src='/google.png' width={25} height={25} /></div>
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.div_spinner}>
                                        <Spinner />
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContainerRegister