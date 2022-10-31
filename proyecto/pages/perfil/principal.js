import React, { useCallback, useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import styles from '../../styles/Perfil.module.css'
import Axios from 'axios'
import Head from 'next/head'
import { getCroppedImg, getRotatedImage } from '../../crop/auxCrop'
import Cropper from 'react-easy-crop'
import { updateProfile } from 'firebase/auth'
import Select from 'react-select'
import MisPublicaciones from '../../components/Perfil/MisPublicaciones'
import Comentarios from '../../components/Perfil/Comentarios'
import MisComentarios from '../../components/Perfil/MisComentarios'
import Spinner from '../../components/Spinner/Spinner'


const principal = () => {

    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(true)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(null)


    const [nuevoNombre, setNuevoNombre] = useState("")
    const [nuevoTipo, setNuevoTipo] = useState("")
    const [nuevoNumeroCelular, setNuevoNumeroCelular] = useState("")
    const [nuevoNumeroTelefono, setNuevoNumeroTelefono] = useState("")



    const [provincias, setProvincias] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [localidades, setLocalidades] = useState([])


    const [nuevaProvincia, setNuevaProvincia] = useState("")
    const [nuevoMunicipio, setNuevoMunicipio] = useState("")
    const [nuevoCodigoPostal, setNuevoCodigoPostal] = useState("")
    const [nuevaLocalidad, setNuevaLocalidad] = useState("")

    const [nuevaDireccion, setNuevaDireccion] = useState("")

    const [nuevaDescripcion, setNuevaDescripcion] = useState("")

    const [emailPublico, setEmailPublico] = useState(false)

    const [toggleProvincia, setToggleProvincia] = useState(false)
    const [toggleMunicipio, setToggleMunicipio] = useState(false)
    const [toggleLocalidad, setToggleLocalidad] = useState(false)

    const [botonConfirmar, setBotonConfirmar] = useState(false)

    const [cargando, setCargando] = useState(false)


    const [misPublicaciones, setMisPublicaciones] = useState(true)
    const [comentarios, setComentarios] = useState(false)
    const [misComentarios, setMisComentarios] = useState(false)

    const [misComentariosUsuarios, setMisComentariosUsuarios] = useState([])
    const [misComentariosPublicaciones, setMisComentariosPublicaciones] = useState([])


    const [publicaciones, setPublicaciones] = useState([])



    const router = useRouter()

    const [mostrarContactos, setMostrarContactos] = useState(false)


    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalFondo, setModalFondo] = useState(false)

    const [imagePerfilUpload, setImagePerfilUpload] = useState([])
    const [imageFondoUpload, setImageFondoUpload] = useState([])


    const [cargandoCorte, setCargandoCorte] = useState(false)

    const [confirmarEliminacionFondo, setConfirmarEliminacionFondo] = useState(false)
    const [confirmarEliminacionPerfil, setConfirmarEliminacionPerfil] = useState(false)

    const [estrellas, setEstrellas] = useState(0)




    const [tipos, setTipos] = useState(
        [{ value: "empresa", label: "Empresa" },
        { value: "particular", label: "Particular" }]
    )


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])



    const showCroppedImagePerfil = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })

            setCargandoCorte(true)

            let blobPerfil = await fetch(croppedImage).then(r => r.blob());
            const imagePerfRef = ref(firebase.storage, `usuarios/${usuario.uid}/perfil`)
            const snapshot = await uploadBytes(imagePerfRef, blobPerfil) // le subo el archivo ya que imagePerfilUpload es un archivo y no una url
            console.log("url")
            const url = await getDownloadURL(snapshot.ref)
            console.log(url)
            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                fotoPerfilURL: url
            }).catch((error) => {
                console.log(error)
            })

            await updateProfile(firebase.auth.currentUser, {
                photoURL: url
            }).catch((error) => {
                console.log(error)
            })

            router.reload()

            setCargandoCorte(false)


            setImageSrc(null)
            setCrop({ x: 0, y: 0 })
            setRotation(0)
            setZoom(1)
            setCroppedAreaPixels(null)
            setModalPerfil(false)
            setImagePerfilUpload([])
            setImageFondoUpload([])


        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])




    const showCroppedImageFondo = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })

            setCargandoCorte(true)

            let blobFondo = await fetch(croppedImage).then(r => r.blob());
            const imageFondRef = ref(firebase.storage, `usuarios/${usuario.uid}/fondo`)
            const snapshot = await uploadBytes(imageFondRef, blobFondo)
            const url = await getDownloadURL(snapshot.ref)

            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                fotoFondoURL: url
            }).catch((error) => {
                console.log(error)
            })

            router.reload()

            setCargandoCorte(false)


            setImageSrc(null)
            setCrop({ x: 0, y: 0 })
            setRotation(0)
            setZoom(1)
            setCroppedAreaPixels(null)
            setModalFondo(false)
            setImagePerfilUpload([])
            setImageFondoUpload([])

        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])





    useEffect(() => {
        if (typeof imageFondoUpload == "undefined" || imageFondoUpload.length == 0) {
            return
        }
        const change = async () => {
            console.log(imageFondoUpload)
            const file = imageFondoUpload
            console.log("llega1")
            let imageDataUrl = await readFile(file)

            setImageSrc(imageDataUrl)
            setModalFondo(true)
            console.log("llega2")
        }
        change()
        return
    }, [imageFondoUpload])





    useEffect(() => {
        if (typeof imagePerfilUpload == "undefined" || imagePerfilUpload.length == 0) {
            return
        }
        const change = async () => {
            console.log(imagePerfilUpload)
            const file = imagePerfilUpload
            console.log("llega1")
            let imageDataUrl = await readFile(file)

            setImageSrc(imageDataUrl)
            setModalPerfil(true)
            console.log("llega2")
        }
        change()
        return
    }, [imagePerfilUpload])





    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }










    useEffect(() => {
        console.log(misComentariosUsuarios)
    }, [misComentariosUsuarios])

    useEffect(() => {
        console.log(misComentariosPublicaciones)
    }, [misComentariosPublicaciones])







    useEffect(() => {

        const check = async () => {
            if (usuario != null) {
                try {
                    if (Object.keys(usuario).length > 0) {
                        const docRef = doc(firebase.db, "Usuarios", usuario.uid)
                        const docSnap = await getDoc(docRef)
                        setCargar(false)
                        setInfo(docSnap.data())
                        console.log(typeof docSnap.data())
                        setNuevoNombre(docSnap.data().nombreUsuario)
                        setNuevoTipo(docSnap.data().type)
                        setNuevoNumeroCelular(docSnap.data().numeroCelular)
                        setNuevoNumeroTelefono(docSnap.data().numeroTelefono)
                        setNuevaProvincia(docSnap.data().provincia)
                        setNuevoMunicipio(docSnap.data().municipio)
                        setNuevoCodigoPostal(docSnap.data().codigoPostal)
                        setNuevaLocalidad(docSnap.data().localidad)
                        setNuevaDireccion(docSnap.data().direccion)
                        setNuevaDescripcion(docSnap.data().descripcion)
                        setEmailPublico(docSnap.data().emailPublico)
                        queryFirebase()
                        let puntajeEstrellas = 0
                        for(const v of docSnap.data().valoraciones){
                            puntajeEstrellas = parseInt(puntajeEstrellas) + parseInt(v.estrellas)
                        }
                        setEstrellas(puntajeEstrellas)

                        for(const c of docSnap.data().misComentarios){
                            console.log(c)
                            if(c.tipo == "usuario"){
                                const usRef = doc(firebase.db, "Usuarios", c.id)
                                const usSnap = await getDoc(usRef)
                                console.log(usSnap.data())
                                setMisComentariosUsuarios([...misComentariosUsuarios, usSnap.data()]) 

                            }
                            if(c.tipo == "publicacion"){
                                const pubRef = doc(firebase.db, "Publicaciones", c.id)
                                const pubSnap = await getDoc(pubRef)
                                setMisComentariosPublicaciones([...misComentariosPublicaciones, pubSnap.data()]) 
                            }
                        }


                    }
                    return true

                } catch (err) {
                    console.log(err)
                    console.log("a chekear")
                    setTimeout(() => {
                        check()
                        return
                    }, 2000)
                }
            } else {
                return false
            }
        }

        //Op

        let prueba = check()
        while (prueba == false) {
            setInterval(() => {
                prueba = check()
                console.log("probando")
            }, 200)

        }



    }, [usuario])


    useEffect(() => {
        console.log(info)
    }, [info])



    useEffect(() => {
        provincia()
    }, [])


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    // function roundToHalf(value) {
    //     let number = value / info.valoraciones.length
    //     console.log(number)
    //     let converted = parseFloat(number); // Make sure we have a number
    //     let decimal = (converted - parseInt(converted, 10));
    //     decimal = Math.round(decimal * 10);
    //     if (decimal == 5) { return (parseInt(converted, 10) + 0.5); }
    //     if ((decimal < 3) || (decimal > 7)) {
    //         console.log(Math.round(converted))
    //         return Math.round(converted);
    //     } else {
    //         console.log(parseInt(converted, 10) + 0.5)
    //         return (parseInt(converted, 10) + 0.5);
    //     }
    // }




    useEffect(() => {
        setNuevoMunicipio("")
        setMunicipios([])
        setNuevaLocalidad("")
        setLocalidades([])
        if (nuevaProvincia.length == 0) {
            return
        }

        setNuevaProvincia(nuevaProvincia)

        municipio(nuevaProvincia)

    }, [nuevaProvincia])


    useEffect(() => {
        setNuevaLocalidad("")
        setLocalidades([])
        if (nuevoMunicipio.length == 0) {
            return
        }

        setNuevoMunicipio(nuevoMunicipio)

        localidad(nuevoMunicipio)
    }, [nuevoMunicipio])


    useEffect(() => {
        setNuevaLocalidad(nuevaLocalidad)
    }, [nuevaLocalidad])






    const isNumber = e => {
        return e.target.value.replace(/\D/g, '');
    };




    useEffect(() => {
        setNuevaProvincia("")
    }, [toggleProvincia])

    useEffect(() => {
        setNuevoMunicipio("")
    }, [toggleMunicipio])

    useEffect(() => {
        setNuevaLocalidad("")
    }, [toggleLocalidad])


    const handleModificar = async () => {
        setCargando(true)
        if (
            (
                nuevoNombre.length == 0
                && nuevoTipo.length == 0
            )
            ||
            (
                nuevoNombre === info.nombreUsuario
                && nuevoTipo === info.type
                && nuevoNumeroCelular === info.numeroCelular
                && nuevoNumeroTelefono === info.numeroTelefono
                && nuevaProvincia === info.provincia
                && nuevoMunicipio === info.municipio
                && nuevaLocalidad === info.localidad
                && nuevaDireccion === info.direccion
                && nuevaDescripcion === info.descripcion
                && emailPublico === info.emailPublico
                && nuevoCodigoPostal === info.codigoPostal
            )

        ) {
            alert("No se aplicaron cambios")
            setCargando(false)
            setBotonConfirmar(false)
            return
        }



        if (nuevaDireccion.length > 0 && (nuevoMunicipio.length == 0 || nuevaProvincia.length == 0)) {
            alert("Si incluye una direccion, por lo menos debe indicar una provincia y un municipio")
            setCargando(false)
            setBotonConfirmar(false)
            return
        }


        if (nuevoNombre.length == 0) {
            alert("El nombre es obligatorio")
            setCargando(false)
            setBotonConfirmar(false)
            return
        }


        try {
            console.log(doc(firebase.db, "Usuarios", usuario.uid))
            // await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
            //     [nuevoNombre.length > 0 && 'nombreUsuario']: nuevoNombre,
            //     [nuevoTipo.length > 0 && 'type']: nuevoTipo,
            //     [nuevoNumeroCelular.length > 0 && 'numeroCelular']: nuevoNumeroCelular,
            //     [nuevoNumeroTelefono.length > 0 && 'numeroTelefono']: nuevoNumeroTelefono,
            //     [nuevaProvincia.length > 0 && 'provincia']: nuevaProvincia,
            //     [nuevoMunicipio.length > 0 && 'municipio']: nuevoMunicipio,
            //     [nuevaLocalidad.length > 0 && 'localidad']: nuevaLocalidad,
            //     [nuevaDireccion.length > 0 && 'direccion']: nuevaDireccion,
            //     [nuevaDescripcion.length > 0 && 'descripcion']: nuevaDescripcion
            // })


            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                [nuevoNombre.length > 0 && 'nombreUsuario']: nuevoNombre,
                [nuevoTipo.length > 0 && 'type']: nuevoTipo,
                ['numeroCelular']: nuevoNumeroCelular,
                ['numeroTelefono']: nuevoNumeroTelefono,
                ['provincia']: nuevaProvincia,
                ['municipio']: nuevoMunicipio,
                ['codigoPostal']: nuevoCodigoPostal,
                ['localidad']: nuevaLocalidad,
                ['direccion']: nuevaDireccion,
                ['descripcion']: nuevaDescripcion,
                ['emailPublico']: emailPublico
            })

            if (nuevoNombre.length > 0) {
                await updateProfile(firebase.auth.currentUser, {
                    displayName: nuevoNombre
                }).catch((error) => {
                    console.log(error)
                })
            }

            router.reload()
            return
        } catch (err) {
            console.log(err)
            setCargando(false)
            alert("Ha habido un error")
        }

    }


    const provincia = () => {
        const arr = [];
        Axios.get("https://apis.datos.gob.ar/georef/api/provincias").then(async (res) => {
            let json = await res.data
            console.log(json.provincias)
            let sort = json.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre))
            sort.map((prov) => {
                return arr.push({ value: titleCase(prov.nombre), label: titleCase(prov.nombre) });
            });
            setProvincias(arr)
        }).catch((err) => {
            console.log(err)
        })
    }


    const municipio = (provincia) => {
        const arr = [];
        Axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=400`).then(async (res) => {
            let json = await res.data
            console.log(json.municipios)
            let sort = json.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre))
            sort.map((mun) => {
                return arr.push({ value: titleCase(mun.nombre), label: titleCase(mun.nombre) });
            });
            setMunicipios(arr)
        }).catch((err) => {
            console.log(err)
        })

    }


    const localidad = (municipio) => {
        const arr = [];
        Axios.get(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=20`).then(async (res) => {
            let json = await res.data
            console.log(json.localidades)
            let sort = json.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre))
            sort.map((loc) => {
                return arr.push({ value: titleCase(loc.nombre), label: titleCase(loc.nombre) });
            });
            setLocalidades(arr)
        }).catch((err) => {
            console.log(err)
        })

    }






    const handleEliminarPerfil = async () => {
        setCargando(true)
        await deleteObject(ref(firebase.storage, `usuarios/${usuario.uid}/perfil`)).then(async () => {
            const imagePerfRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
            const urlPerf = await getDownloadURL(imagePerfRef)

            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                fotoPerfilURL: urlPerf
            }).catch((error) => {
                console.log(error)
            })

            await updateProfile(firebase.auth.currentUser, {
                photoURL: urlPerf
            }).catch((error) => {
                console.log(error)
            })

            router.reload()
            return
        }).catch((error) => {
            console.log(error)
            setCargando(false)
            setConfirmarEliminacionPerfil(false)
            return
        })


    }




    const handleEliminarFondo = async () => {
        setCargando(true)
        await deleteObject(ref(firebase.storage, `usuarios/${usuario.uid}/fondo`)).then(async () => {
            const imageFondRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
            const urlFondo = await getDownloadURL(imageFondRef)

            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                fotoFondoURL: urlFondo
            }).catch((error) => {
                console.log(error)
            })

            router.reload()
            return

        }).catch((error) => {
            console.log(error)
            setCargando(false)
            setConfirmarEliminacionFondo(false)
            return
        })


    }

    const handleSelectTipo = (event) => {
        if (event == null) {
            setNuevoTipo("")
        }
        else {
            const value = event.value
            setNuevoTipo(value)
        }
    }

    const handleSelectProv = (event) => {
        if (event == null) {
            setNuevaProvincia("")
            setNuevoMunicipio("")
            setNuevaLocalidad("")
            setMunicipios([])
            setLocalidades([])
        }
        else {
            const value = event.value
            setNuevaProvincia(value)
            setNuevoMunicipio("")
            setNuevaLocalidad("")
            setMunicipios([])
            setLocalidades([])
        }
    }

    const handleSelectMun = (event) => {
        if (event == null) {
            setNuevoMunicipio("")
            setNuevaLocalidad("")
            setLocalidades([])
        }
        else {
            const value = event.value
            setNuevoMunicipio(value)
            setNuevaLocalidad("")
            setLocalidades([])
        }
    }

    const handleSelectLoc = (event) => {
        if (event == null) {
            setNuevaLocalidad("")
        }
        else {
            const value = event.value
            setNuevaLocalidad(value)
        }
    }




    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")

        const q = query(colRef, where("publicador", "==", `${usuario.uid}`))

        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        console.log(ps)
    }









    if (info == null) {
        return (
            <div>
                <Head>
                    <title>Inmo</title>
                    <meta name="description" content="Generated" />
                    <link rel="icon" href="/Logo_inmo_new.png" />
                </Head>
                <Layout perfil={true}>
                    <div className={styles.loading}>
                        <Spinner></Spinner>
                    </div>
                </Layout>
            </div>


        )
    } else {
        return (
            <div>
                <Head>
                    <title>Inmo</title>
                    <meta name="description" content="Generated" />
                    <link rel="icon" href="/Logo_inmo_new.png" />
                </Head>
                <Layout perfil={true}>
                    <div className={styles.arriba}>
                        {
                            modalPerfil ?
                                <div className={styles.modal_crop}>
                                    <div className={styles.modal_crop_inside}>
                                        {
                                            cargandoCorte == false ?
                                                (
                                                    <div className={styles.menu} onClick={() => { setModalPerfil(false); setImagePerfilUpload([]); setCroppedAreaPixels(null); setZoom(1); setRotation(0) }}>
                                                        <div className={styles.bar}></div>
                                                        <div className={styles.bar}></div>
                                                        <div className={styles.bar}></div>
                                                    </div>
                                                ) : <div className={styles.menu_cargando}></div>
                                        }

                                        <div className={styles.div_cropper}>
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                rotation={rotation}
                                                zoom={zoom}
                                                aspect={1 / 1}
                                                onCropChange={setCrop}
                                                onRotationChange={setRotation}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                                style={{
                                                    containerStyle: {
                                                        backgroundColor: "white"
                                                    }
                                                }}
                                            />
                                        </div>


                                        {
                                            cargandoCorte == false ?
                                                (
                                                    <div className={styles.div_controls}>
                                                        <div className={styles.controls}>
                                                            <input
                                                                type="range"
                                                                value={zoom}
                                                                min={1}
                                                                max={3}
                                                                step={0.1}
                                                                aria-labelledby="Zoom"
                                                                onChange={(e) => {
                                                                    setZoom(e.target.value)
                                                                }}
                                                                className={styles.zoom_range}
                                                            />

                                                            <div className={styles.div_rotate}>
                                                                <button onClick={() => setRotation(rotation - 90)} className={styles.btn_rotate}>

                                                                    <Image height={30} width={30} src="/rotate-left.png" />

                                                                    {/*https://www.flaticon.com/premium-icon/rotate-left_3889488 */}
                                                                </button>

                                                                <button onClick={() => setRotation(rotation + 90)} className={styles.btn_rotate}>

                                                                    <Image height={30} width={30} src="/rotate-right.png" />


                                                                    {/*https://www.flaticon.com/premium-icon/rotate-right_3889492 */}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className={styles.button_recortar} onClick={showCroppedImagePerfil}>
                                                            <div className={styles.button_back}></div>
                                                            <div className={styles.button_content}><span>Recortar</span></div>
                                                        </div>
                                                    </div>


                                                ) :
                                                (
                                                    <div className={styles.div_controls}>
                                                        <p>cargando</p>
                                                    </div>
                                                )

                                        }




                                    </div>
                                </div>
                                : null
                        }

                        {
                            modalFondo ?
                                <div className={styles.modal_crop}>
                                    <div className={styles.modal_crop_inside}>
                                        {
                                            cargandoCorte == false ?
                                                (
                                                    <div className={styles.menu} onClick={() => { setModalFondo(false); setImageFondoUpload([]); setZoom(1); setRotation(0) }}>
                                                        <div className={styles.bar}></div>
                                                        <div className={styles.bar}></div>
                                                        <div className={styles.bar}></div>
                                                    </div>
                                                ) : <div className={styles.menu_cargando}></div>
                                        }

                                        <div className={styles.div_cropper}>
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                rotation={rotation}
                                                zoom={zoom}
                                                aspect={2 / 1}
                                                onCropChange={setCrop}
                                                onRotationChange={setRotation}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                                style={{
                                                    containerStyle: {
                                                        backgroundColor: "white"
                                                    }
                                                }}
                                            />
                                        </div>


                                        {
                                            cargandoCorte == false ?
                                                (
                                                    <div className={styles.div_controls}>
                                                        <div className={styles.controls}>
                                                            <input
                                                                type="range"
                                                                value={zoom}
                                                                min={1}
                                                                max={3}
                                                                step={0.1}
                                                                aria-labelledby="Zoom"
                                                                onChange={(e) => {
                                                                    setZoom(e.target.value)
                                                                }}
                                                                className={styles.zoom_range}
                                                            />

                                                            <div className={styles.div_rotate}>
                                                                <button onClick={() => setRotation(rotation - 90)} className={styles.btn_rotate}>

                                                                    <Image height={30} width={30} src="/rotate-left.png" />

                                                                    {/*https://www.flaticon.com/premium-icon/rotate-left_3889488 */}
                                                                </button>

                                                                <button onClick={() => setRotation(rotation + 90)} className={styles.btn_rotate}>

                                                                    <Image height={30} width={30} src="/rotate-right.png" />


                                                                    {/*https://www.flaticon.com/premium-icon/rotate-right_3889492 */}
                                                                </button>
                                                            </div>

                                                        </div>


                                                        <div className={styles.button_recortar} onClick={showCroppedImageFondo}>
                                                            <div className={styles.button_back}></div>
                                                            <div className={styles.button_content}><span>Recortar</span></div>
                                                        </div>


                                                    </div>
                                                ) :
                                                (
                                                    <div className={styles.div_controls}>
                                                        <Spinner></Spinner>
                                                    </div>
                                                )
                                        }



                                    </div>
                                </div>
                                : null
                        }



                        <div className={styles.infoChange_container}>

                            <div className={styles.pInfo}>
                                <h1>Tu perfil</h1>
                                <p>Los campos marcados con * son obligatorios para realizar publicaciones</p>
                                <h2>Informacion personal:</h2>


                                <div className={styles.fieldDir}>
                                    <p>Nombre*:</p>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        <input maxLength={40} value={nuevoNombre} onChange={e => { setNuevoNombre(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                    </label>
                                </div>

                                <p>Tipo de cuenta*:</p>
                                <div className={styles.fieldDirSelect}>
                                    <Select options={tipos} onChange={handleSelectTipo} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de cuenta"} defaultValue={nuevoTipo == "" ? { value: null, label: "Seleccione un tipo" } : { value: nuevoTipo, label: titleCase(nuevoTipo) }}></Select>
                                </div>


                                <div className={styles.fieldDir}>
                                    <p>Numero de celular*:</p>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        {
                                            nuevoNumeroCelular.length == 0 ? <span className={styles.placeholder}>5491112341234</span> : null
                                        }

                                        <input maxLength={16} value={nuevoNumeroCelular} onChange={e => { setNuevoNumeroCelular(isNumber(e)); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                    </label>
                                </div>

                                <div className={styles.fieldDir}>
                                    <p>Numero de telefono:</p>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        {
                                            nuevoNumeroTelefono.length == 0 ? <span className={styles.placeholder}>12341234</span> : null
                                        }


                                        <input maxLength={16} value={nuevoNumeroTelefono} onChange={e => { setNuevoNumeroTelefono(isNumber(e)); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                    </label>
                                </div>
                            </div>

                            <div className={styles.uInfo}>
                                <h2>Ubicacion:</h2>
                                <div className={styles.ubi}>
                                    <h3>Tu ubicacion actual:</h3>
                                    {

                                        info.provincia.length > 0 || info.municipio.length > 0 || info.localidad.length > 0 ?
                                            (

                                                <p>
                                                    {
                                                        info.provincia.length > 0 &&
                                                        (
                                                            info.provincia
                                                        )
                                                    }, {`${" "}`}
                                                    {
                                                        info.municipio.length > 0 &&
                                                        (
                                                            info.municipio
                                                        )
                                                    }
                                                    {
                                                        info.localidad.length > 0 &&
                                                        (
                                                            <>
                                                                ,{`${" "}`}{info.localidad}
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        info.direccion.length > 0 &&
                                                        (
                                                            <>
                                                                ,{`${" "}`}{info.direccion}
                                                            </>
                                                        )
                                                    }
                                                </p>

                                            ) :
                                            (
                                                <p>No tiene ninguna ubicacion asignada</p>
                                            )
                                    }
                                    <div className={styles.reloadBtn} onClick={() => { provincia(); setNuevaProvincia(""); setNuevoMunicipio(""); setNuevaLocalidad(""); setMunicipios([]); setLocalidades([]) }}><img src="/reload.png" /></div>
                                </div>



                                <div >
                                    {
                                        toggleProvincia == false ?
                                            (
                                                <div>
                                                    <p className={styles.ubiLabel}> Provincia* <span onClick={() => { setToggleProvincia(!toggleProvincia) }}>No encuentro mi provincia</span></p>

                                                    {/* <select value={nuevaProvincia} disabled={cargando} onChange={(e) => { setNuevaProvincia(e.target.value) }} >
                                                    <option value="">Elige una provincia</option>
                                                    {
                                                        provincias.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select> */}

                                                    <div className={styles.fieldDirSelect}>
                                                        <Select options={provincias} onChange={handleSelectProv} isClearable={true} isSearchable={true} placeholder={"Seleccione una provincia"} value={nuevaProvincia == "" ? { value: null, label: "Seleccione una provincia" } : { value: nuevaProvincia, label: nuevaProvincia }}></Select>
                                                    </div>

                                                </div>

                                            ) :
                                            (

                                                <div>
                                                    <div className={styles.fieldDir}>
                                                        <p className={styles.ubiLabel}> Escriba su provincia* <span onClick={() => { setToggleProvincia(!toggleProvincia) }}>Volver</span></p>
                                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                                            <input maxLength={30} value={nuevaProvincia} readOnly={cargando} onChange={(e) => { setNuevaProvincia(titleCase(e.target.value)) }} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>


                                <div>
                                    {
                                        toggleMunicipio == false ?
                                            (
                                                <div>
                                                    <p className={styles.ubiLabel}> Municipio* <span onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>No encuentro mi municipio</span></p>

                                                    {/* <select value={nuevoMunicipio} disabled={cargando} onChange={(e) => { setNuevoMunicipio(e.target.value) }} >
                                                    <option value="">Elige un municipio</option>
                                                    {
                                                        municipios.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select> */}

                                                    <div className={styles.fieldDirSelect}>
                                                        <Select options={municipios} onChange={handleSelectMun} isClearable={true} isSearchable={true} placeholder={"Seleccione un municipio"} value={nuevoMunicipio == "" ? { value: null, label: "Seleccione un municipio" } : { value: nuevoMunicipio, label: nuevoMunicipio }}></Select>
                                                    </div>

                                                </div>

                                            ) :
                                            (
                                                <div>
                                                    <div className={styles.fieldDir}>
                                                        <p className={styles.ubiLabel}> Escriba su municipio* <span onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>Volver</span></p>
                                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                                            <input maxLength={30} readOnly={cargando} value={nuevoMunicipio} onChange={(e) => { nuevaProvincia.length == 0 ? null : setNuevoMunicipio(titleCase(e.target.value)) }} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>

                                <div className={styles.fieldDir}>
                                    <p>Codigo Postal*</p>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        <input maxLength={30} value={nuevoCodigoPostal} onChange={e => { setNuevoCodigoPostal(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                    </label>
                                </div>

                                <div>
                                    {
                                        toggleLocalidad == false ?
                                            (
                                                <div>
                                                    <p className={styles.ubiLabel}>Localidad <span onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>No encuentro mi localidad</span></p>
                                                    {/* <select value={nuevaLocalidad} disabled={cargando} onChange={(e) => { setNuevaLocalidad(e.target.value) }}>
                                                    <option value="">Elige una localidad</option>
                                                    {
                                                        localidades.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select> */}

                                                    <div className={styles.fieldDirSelect}>
                                                        <Select options={localidades} onChange={handleSelectLoc} isClearable={true} isSearchable={true} placeholder={"Seleccione una localidad"} value={nuevaLocalidad == "" ? { value: null, label: "Seleccione una localidad" } : { value: nuevaLocalidad, label: nuevaLocalidad }}></Select>
                                                    </div>

                                                </div>
                                            ) :
                                            (
                                                <div>

                                                    <div className={styles.fieldDir}>
                                                        <p className={styles.ubiLabel}> Escriba su localidad <span onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>Volver</span></p>
                                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                                            <input maxLength={30} readOnly={cargando} value={nuevaLocalidad} onChange={(e) => { nuevoMunicipio.length == 0 ? null : setNuevaLocalidad(titleCase(e.target.value)) }} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>

                                <div className={styles.fieldDir}>
                                    <p>Direccion</p>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        <input maxLength={30} value={nuevaDireccion} onChange={e => { setNuevaDireccion(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                    </label>
                                </div>
                            </div>


                            <div className={styles.dInfo}>
                                <h2>Descripcion: <span>{nuevaDescripcion.length}/200</span></h2>
                                <div className={styles.fieldDir}>
                                    <textarea className={styles.descripArea} value={nuevaDescripcion} onChange={e => { setNuevaDescripcion(e.target.value); }} maxLength="200" type="text" readOnly={cargando} placeholder="&nbsp;"></textarea>
                                </div>
                            </div>

                            <div className={styles.email_publico}>
                                <label htmlFor='check'>Email publico</label>
                                <input id='check' checked={emailPublico} onChange={(e) => setEmailPublico(e.target.checked)} type="checkbox" />
                            </div>
                            {
                                cargando == false ?
                                    (
                                        botonConfirmar == false ?
                                            (
                                                <div className={styles.divButtons}>
                                                    <div className={styles.buttonsInside}>
                                                        <div className={styles.buttonConfirm} onClick={() => { setBotonConfirmar(true) }}>
                                                            <div className={styles.buttonConfirm_back}></div>
                                                            <div className={styles.buttonConfirm_content}><span>Aplicar Cambios</span></div>
                                                        </div>
                                                    </div>

                                                    <div className={styles.buttonsInside}>
                                                        <div className={styles.buttonDiscard} onClick={() => {
                                                            setNuevoNombre(info.nombreUsuario)
                                                            setNuevoTipo(info.type)
                                                            setNuevoNumeroCelular(info.numeroCelular)
                                                            setNuevoNumeroTelefono(info.numeroTelefono)
                                                            setNuevaProvincia(info.provincia)
                                                            setNuevoMunicipio(info.municipio)
                                                            setNuevaLocalidad(info.localidad)
                                                            setNuevaDireccion(info.direccion)
                                                            setNuevaDescripcion(info.descripcion)
                                                        }}>
                                                            <div className={styles.buttonDiscard_back}></div>
                                                            <div className={styles.buttonDiscard_content}><span>Descartar Cambios</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <div className={styles.sure}>
                                                    <p>Esta seguro que desea modificar su perfil?</p>
                                                    <div className={styles.divButtonsSure}>
                                                        <div className={styles.buttonsInside}>
                                                            <div className={styles.buttonYes} onClick={() => { handleModificar() }}>
                                                                <div className={styles.buttonYes_back}></div>
                                                                <div className={styles.buttonYes_content}><span>Si</span></div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.buttonsInside}>
                                                            <div className={styles.buttonNo} onClick={() => { setBotonConfirmar(false) }}>
                                                                <div className={styles.buttonNo_back}></div>
                                                                <div className={styles.buttonNo_content}><span>No</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    ) :
                                    <div className={styles.loadingMod}>
                                        <Spinner></Spinner>
                                    </div>

                            }
                        </div>
















                        <div className={styles.derecha}>


                            <div className={styles.profileDataContainer}>

                                <div className={styles.container_imgBack}>
                                    {
                                        cargando == false ?
                                            confirmarEliminacionFondo == false ?
                                                (
                                                    <div className={styles.div_buttons}>
                                                        <label htmlFor='file-img-fondo'><img className={styles.edit_icon} src='/edit.png' /></label>
                                                        <input className={styles.input_file} onChange={(e) => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-fondo' />

                                                        {
                                                            info.fotoFondoURL.includes("https://firebasestorage.googleapis.com/v0/b/inmo-proyect.appspot.com/o/imagenesDefault%2FfondoDefault.png?alt=media&token=d4bde7ff-b705-43cd-b647-899db546186b") == false ?
                                                                (
                                                                    <img onClick={() => { setConfirmarEliminacionFondo(true) }} className={styles.delete_icon} src='/bin.png' />
                                                                ) : null
                                                        }

                                                    </div>
                                                ) :
                                                (
                                                    <div className={styles.div_buttons}>
                                                        <img onClick={() => { handleEliminarFondo() }} className={styles.delete_icon} src='/bin.png' />
                                                        <img onClick={() => { setConfirmarEliminacionFondo(false) }} className={styles.delete_icon} src='/delete.png' />
                                                    </div>
                                                ) :
                                            <div className={styles.div_buttons}>

                                            </div>
                                    }



                                    { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                    <img className={styles.fondo} src={info.fotoFondoURL} />
                                </div>






                                <div className={styles.imageProfileInside}>
                                    <div className={styles.container_imgProfile}>
                                        {
                                            cargando == false ?
                                                (
                                                    confirmarEliminacionPerfil == false ?
                                                        (
                                                            <div className={styles.div_buttons}>
                                                                <label htmlFor='file-img-perfil'><img className={styles.edit_icon} src='/edit.png' /></label>
                                                                <input className={styles.input_file} onChange={(e) => { setImagePerfilUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-perfil' />

                                                                {
                                                                    info.fotoPerfilURL.includes("https://firebasestorage.googleapis.com/v0/b/inmo-proyect.appspot.com/o/imagenesDefault%2FperfilDefault.jpg?alt=media&token=19044d3e-c7bc-493f-9850-20dc001ad5c5") == false ?
                                                                        (
                                                                            <img onClick={() => setConfirmarEliminacionPerfil(true)} className={styles.delete_icon} src='/bin.png' />
                                                                        ) :
                                                                        null

                                                                }

                                                            </div>
                                                        ) :
                                                        (
                                                            <div className={styles.div_buttons}>
                                                                <img onClick={() => handleEliminarPerfil()} className={styles.delete_icon} src='/bin.png' />
                                                                <img onClick={() => setConfirmarEliminacionPerfil(false)} className={styles.delete_icon} src='/delete.png' />
                                                            </div>
                                                        )
                                                ) :
                                                <div className={styles.div_buttons}>

                                                </div>

                                        }

                                        {/* https://www.flaticon.com/free-icon/x-mark_1617543?term=delete&page=1&position=34&page=1&position=34&related_id=1617543&origin=search */}

                                        { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                        <img className={styles.perfil} src={info.fotoPerfilURL} />
                                    </div>
                                    <div className={styles.profileTextPill}>
                                        <div className={styles.profileData}>
                                            <div className={styles.dataInside}>
                                                <div className={styles.profileName}>
                                                    <div className={styles.profileNameInside}>
                                                        <p className={styles.name}>{info.nombreUsuario}</p>
                                                        <p>{titleCase(info.type)}</p>
                                                    </div>
                                                    <div className={styles.pillUbi}>
                                                        {
                                                            info.provincia.length > 0 || info.municipio.length > 0 || info.localidad.length > 0 ?
                                                                (
                                                                    <p>
                                                                        {
                                                                            info.provincia.length > 0 &&
                                                                            (
                                                                                info.provincia
                                                                            )
                                                                        }, {`${" "}`}
                                                                        {
                                                                            info.municipio.length > 0 &&
                                                                            (
                                                                                info.municipio
                                                                            )
                                                                        }
                                                                        {
                                                                            info.codigoPostal.length > 0 &&
                                                                            (
                                                                                <>
                                                                                    ,{`${" "}`}{info.codigoPostal}
                                                                                </>
                                                                            )
                                                                        }
                                                                        {
                                                                            info.localidad.length > 0 &&
                                                                            (
                                                                                <>
                                                                                    ,{`${" "}`}{info.localidad}
                                                                                </>
                                                                            )
                                                                        }
                                                                        {
                                                                            info.direccion.length > 0 &&
                                                                            (
                                                                                <>
                                                                                    ,{`${" "}`}{info.direccion}
                                                                                </>
                                                                            )
                                                                        }
                                                                    </p>

                                                                ) :
                                                                (
                                                                    <p>No tiene ninguna ubicacion asignada</p>
                                                                )
                                                        }
                                                    </div>
                                                    {/* <div className={styles.contactInfo}>
                                                    <p className={styles.cInfo}>Informacion de contacto:</p>
                                                    <p>{info.mail}</p>
                                                    <div className={styles.numbers}>
                                                        <div>
                                                            {
                                                                info.numeroCelular.length > 0 ?
                                                                    (
                                                                        <p>{info.numeroCelular}</p>
                                                                    ) :
                                                                    (
                                                                        <p>No tiene ningun numero de celular asignado</p>
                                                                    )
                                                            }
                                                        </div>

                                                        <div>
                                                            {
                                                                info.numeroTelefono.length > 0 ?
                                                                    (
                                                                        <p>{info.numeroTelefono}</p>
                                                                    ) :
                                                                    (
                                                                        <p>No tiene ningun numero de telefono asignado</p>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                </div> */}
                                                </div>

                                                <div className={styles.descriptionPill}>
                                                    {
                                                        info.descripcion.length > 0 ?
                                                            (
                                                                <div>
                                                                    <p className={styles.descTitle}>Descripcion</p>
                                                                    <div className={styles.descript}>
                                                                        <p>{info.descripcion}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <p>No tiene ninguna descripcion</p>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                            <div className={styles.blackPill}>
                                                <p>{publicaciones.length} Publicaciones</p>
                                                {
                                                    info.valoraciones.length == 0 ?
                                                        <p>No tienes ninguna recomendacion, deja una buena impresion en los otros usuarios de inmo para mejorar la reputacion de tu perfil.</p>
                                                        :
                                                        <p>{Math.round(estrellas / info.valoraciones.length * 10) / 10} Estrellas de {info.valoraciones.length} valoraciones</p>
                                                }

                                                {
                                                    info.numeroCelular === "" && info.numeroTelefono === "" && info.emailPublico == false ?
                                                        (
                                                            <p>No proporciono medios de contacto</p>
                                                        ) :

                                                        (

                                                            <div className={styles.contactInfo}>
                                                                {
                                                                    info.numeroCelular !== "" ?
                                                                        (
                                                                            <p>Celular: {info.numeroCelular}</p>
                                                                        ) :
                                                                        null
                                                                }

                                                                {
                                                                    info.numeroTelefono !== "" ?
                                                                        (
                                                                            <p>Telefono: {info.numeroTelefono}</p>
                                                                        ) :
                                                                        null
                                                                }


                                                                {
                                                                    info.emailPublico == true ?
                                                                        (
                                                                            <p>{info.mail}</p>
                                                                        ) :
                                                                        null
                                                                }
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div> */}
                                    {/*       <p>Ubicacion</p>
                                        <div>
                                            {
                                                info.provincia.length > 0 || info.municipio.length > 0 || info.localidad.length > 0 ?
                                                    (
                                                        <p>
                                                            {
                                                                info.provincia.length > 0 &&
                                                                (
                                                                    info.provincia
                                                                )
                                                            }, {`${" "}`}
                                                            {
                                                                info.municipio.length > 0 &&
                                                                (
                                                                    info.municipio
                                                                )
                                                            }
                                                            {
                                                                info.localidad.length > 0 &&
                                                                (
                                                                    <>
                                                                        ,{`${" "}`}{info.localidad}
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                info.direccion.length > 0 &&
                                                                (
                                                                    <>
                                                                        ,{`${" "}`}{info.direccion}
                                                                    </>
                                                                )
                                                            }
                                                        </p>

                                                    ) :
                                                    (
                                                        <p>No tiene ninguna ubicacion asignada</p>
                                                    )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        {
                                            info.numeroCelular.length > 0 ?
                                                (
                                                    <p>{info.numeroCelular}</p>
                                                ) :
                                                (
                                                    <p>No tiene ningun numero de celular asignado</p>
                                                )
                                        }
                                    </div>

                                    <div>
                                        {
                                            info.numeroTelefono.length > 0 ?
                                                (
                                                    <p>{info.numeroTelefono}</p>
                                                ) :
                                                (
                                                    <p>No tiene ningun numero de telefono asignado</p>
                                                )
                                        }
                                    </div>


                                    <div>
                                        {
                                            info.descripcion.length > 0 ?
                                                (
                                                    <div>
                                                        <p>Descripcion</p>
                                                        <p>{info.descripcion}</p>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <p>No tiene ninguna descripcion</p>
                                                )
                                        }
                                    </div> */}

                                </div>



                            </div>










                            <div>
                                <div className={styles.headers}>
                                    <p onClick={() => { setMisPublicaciones(true); setComentarios(false); setMisComentarios(false) }} className={misPublicaciones == true ? styles.h2 : null}>Mis Publicaciones <span>{publicaciones.length}</span></p>
                                    <p onClick={() => { setMisPublicaciones(false); setComentarios(true); setMisComentarios(false) }} className={comentarios == true ? styles.h2 : null}>Valoraciones <span>{info.valoraciones.length}</span> </p>
                                    <p onClick={() => { setMisPublicaciones(false); setComentarios(false); setMisComentarios(true) }} className={misComentarios == true ? styles.h2 : null}>Tus Comentarios</p>
                                </div>
                                {
                                    misPublicaciones == true &&
                                    <MisPublicaciones
                                        publicaciones={publicaciones}
                                        setPublicaciones={setPublicaciones}
                                        queryFirebase={queryFirebase}
                                        info={info}
                                    />
                                }

                                {
                                    comentarios == true &&
                                    <Comentarios
                                        usuario={usuario}
                                        info={info}
                                    />
                                }

                                {
                                    misComentarios == true &&
                                    <MisComentarios
                                        usuario={usuario}
                                        info={info}
                                        misComentariosUsuarios={misComentariosUsuarios}
                                        misComentariosPublicaciones={misComentariosPublicaciones}
                                    />
                                }
                            </div>



                        </div>

                    </div>
                </Layout>
            </div>
        )
    }




}

export default principal