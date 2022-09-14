import React, { useCallback, useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import styles from '../../styles/Principal.module.css'
import Axios from 'axios'
import Head from 'next/head'
import { getCroppedImg, getRotatedImage } from '../../crop/auxCrop'
import Cropper from 'react-easy-crop'
import { updateProfile } from 'firebase/auth'
import Select from 'react-select'



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
    const [nuevaLocalidad, setNuevaLocalidad] = useState("")

    const [nuevaDireccion, setNuevaDireccion] = useState("")

    const [nuevaDescripcion, setNuevaDescripcion] = useState("")

    const [toggleProvincia, setToggleProvincia] = useState(false)
    const [toggleMunicipio, setToggleMunicipio] = useState(false)
    const [toggleLocalidad, setToggleLocalidad] = useState(false)

    const [botonConfirmar, setBotonConfirmar] = useState(false)

    const [cargando, setCargando] = useState(false)


    const router = useRouter()


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

    const [jamesWeb, setJamesWeb] = useState([])
    const [alejitiEnaniti, setAlejitiEnaniti] = useState([])
    const [enanism, setEnanism] = useState([])


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
                        setNuevaLocalidad(docSnap.data().localidad)
                        setNuevaDireccion(docSnap.data().direccion)
                        setNuevaDescripcion(docSnap.data().descripcion)
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
            (nuevoNombre.length == 0
                && nuevoTipo.length == 0
                && nuevoNumeroCelular.length == 0
                && nuevoNumeroTelefono.length == 0
                && nuevaProvincia.length == 0
                && nuevoMunicipio.length == 0
                && nuevaLocalidad.length == 0
                && nuevaDireccion.length == 0
                && nuevaDescripcion.length == 0)
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
                && nuevaDescripcion === info.descripcion)

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
            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                [nuevoNombre.length > 0 && 'nombreUsuario']: nuevoNombre,
                [nuevoTipo.length > 0 && 'type']: nuevoTipo,
                [nuevoNumeroCelular.length > 0 && 'numeroCelular']: nuevoNumeroCelular,
                [nuevoNumeroTelefono.length > 0 && 'numeroTelefono']: nuevoNumeroTelefono,
                [nuevaProvincia.length > 0 && 'provincia']: nuevaProvincia,
                [nuevoMunicipio.length > 0 && 'municipio']: nuevoMunicipio,
                [nuevaLocalidad.length > 0 && 'localidad']: nuevaLocalidad,
                [nuevaDireccion.length > 0 && 'direccion']: nuevaDireccion,
                [nuevaDescripcion.length > 0 && 'descripcion']: nuevaDescripcion
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
            setProvincias(sort)
            sort.map((prov) => {
                return arr.push({value: titleCase(prov.nombre), label: titleCase(prov.nombre)});
              });
              setJamesWeb(arr)
              console.log(jamesWeb)
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
            setMunicipios(sort)
            sort.map((mun) => {
                return arr.push({value: titleCase(mun.nombre), label: titleCase(mun.nombre)});
              });
            setAlejitiEnaniti(arr)
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
            setLocalidades(sort)
            sort.map((loc) => {
                return arr.push({value: titleCase(loc.nombre), label: titleCase(loc.nombre)});
              });
            setEnanism(arr)
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

    const handleSelectProv = (event) => {
        if(event == null){
            setNuevaProvincia("")
            setNuevoMunicipio("")
            setNuevaLocalidad("")
            setAlejitiEnaniti([])
            setEnanism([])
        }
        else{
        const value = event.value
        setNuevaProvincia(value)
        setNuevoMunicipio("")
        setNuevaLocalidad("")
        setAlejitiEnaniti([])
        setEnanism([])
        }
    }

    const handleSelectMun = (event) => {
        if(event == null){
            setNuevoMunicipio("")
            setNuevaLocalidad("")
            setEnanism([])
        }
        else{
        const value = event.value
        setNuevoMunicipio(value)
        setNuevaLocalidad("")
        setEnanism([])
        }
    }

    const handleSelectLoc = (event) => {
        if(event == null){
            setNuevaLocalidad("")
        }
        else{
        const value = event.value
        setNuevaLocalidad(value)
        }
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
                    <p>cargando</p>
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
                                                        <p>cargando</p>
                                                    </div>
                                                )
                                        }



                                    </div>
                                </div>
                                : null
                        }



                        <div className={styles.infoChange_container}>

                            <h1>Tu perfil</h1>
                            <h2>Modificar informacion:</h2>


                            <div className={styles.fieldDir}>
                                <p>Nombre:</p>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={nuevoNombre} onChange={e => { setNuevoNombre(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                </label>
                            </div>

                            <div className={styles.fieldDir}>
                                <label>Tipo de cuenta: {info.type}</label>
                                <select value={nuevoTipo} disabled={cargando} onChange={(e) => setNuevoTipo(e.target.value)}>
                                    <option value="particular">Particular</option>
                                    <option value="empresa">Empresa</option>
                                </select>
                            </div>

                            <div className={styles.fieldDir}>
                                <p>Numero de celular:</p>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={nuevoNumeroCelular} onChange={e => { setNuevoNumeroCelular(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                </label>
                            </div>

                            <div className={styles.fieldDir}>
                                <p>Numero de telefono:</p>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={nuevoNumeroTelefono} onChange={e => { setNuevoNumeroTelefono(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                </label>
                            </div>




                            <p>Tu ubicacion actual:</p>
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



                            <div >
                                <p>Cambiar tu ubicacion:</p>
                                {
                                    toggleProvincia == false ?
                                        (
                                            <div>
                                                <p onClick={() => { setToggleProvincia(!toggleProvincia) }}>Provincia</p>

                                                <select value={nuevaProvincia} disabled={cargando} onChange={(e) => { setNuevaProvincia(e.target.value) }} >
                                                    <option value="">Elige una provincia</option>
                                                    {
                                                        provincias.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select>


                                                <div>
                                                    <Select options={jamesWeb}  onChange={handleSelectProv} placeholder={"Seleccione una provincia"} value = {nuevaProvincia == "" ? {value: null, label: "Seleccione una provincia"} : {value: nuevaProvincia, label: nuevaProvincia}}></Select>
                                                </div>

                                            </div>

                                        ) :
                                        (
                                            <div>
                                                <p onClick={() => { setToggleProvincia(!toggleProvincia) }}>x</p>
                                                <input placeholder='Ingrese su provincia' value={nuevaProvincia} readOnly={cargando} onChange={(e) => { setNuevaProvincia(titleCase(e.target.value)) }} />
                                            </div>
                                        )
                                }
                            </div>


                            <div>
                                {
                                    toggleMunicipio == false ?
                                        (
                                            <div>
                                                <p onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>No encuentra su municipio?</p>
                                                <select value={nuevoMunicipio} disabled={cargando} onChange={(e) => { setNuevoMunicipio(e.target.value) }} >
                                                    <option value="">Elige un municipio</option>
                                                    {
                                                        municipios.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select>

                                                
                                                <div>
                                                    <Select options={alejitiEnaniti}  onChange={handleSelectMun}  placeholder={"Seleccione un municipio"}  value={nuevoMunicipio == "" ? {value: null, label: "Seleccione un municipio"} : {value: nuevoMunicipio, label: nuevoMunicipio}}></Select>
                                                </div>

                                            </div>
                                            
                                        ) :
                                        (
                                            <div>
                                                <p onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>x</p>
                                                <input placeholder='Ingrese su municipio' readOnly={cargando} value={nuevoMunicipio} onChange={(e) => { setNuevoMunicipio(titleCase(e.target.value)) }} />
                                            </div>
                                        )
                                }
                            </div>

                            <div>
                                {
                                    toggleLocalidad == false ?
                                        (
                                            <div>
                                                <p onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>No encuentra su localidad?  (no es obligatorio para para poder publicar)</p>
                                                <select value={nuevaLocalidad} disabled={cargando} onChange={(e) => { setNuevaLocalidad(e.target.value) }}>
                                                    <option value="">Elige una localidad</option>
                                                    {
                                                        localidades.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select>
                                                
                                                <div>
                                                    <Select options={enanism}  onChange={handleSelectLoc} placeholder={"Seleccione una localidad"}  value={nuevaLocalidad == "" ? {value: null, label: "Seleccione una localidad"} : {value: nuevaLocalidad, label: nuevaLocalidad}}></Select>
                                                </div>

                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <p onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>x</p>
                                                <input placeholder='Ingrese su localidad' readOnly={cargando} value={nuevaLocalidad} onChange={(e) => { setNuevaLocalidad(titleCase(e.target.value)) }} />
                                            </div>
                                        )
                                }
                            </div>





                            <div className={styles.divButtons}>
                                <div className={styles.button} onClick={() => { provincia(); setNuevaProvincia(""); setNuevoMunicipio(""); setNuevaLocalidad(""); setAlejitiEnaniti([]); setEnanism([])}}>
                                    <div className={styles.button_back}></div>
                                    <div className={styles.button_content}><span>Recargar ubicaciones</span></div>
                                </div>
                            </div>


                            <div className={styles.fieldDir}>
                                <p>Direccion:</p>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={nuevaDireccion} onChange={e => { setNuevaDireccion(e.target.value); }} type="text" readOnly={cargando} placeholder="&nbsp;" />
                                </label>
                            </div>




                            <div className={styles.fieldDir}>
                                <p>Descripcion:</p>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={nuevaDescripcion} onChange={e => { setNuevaDescripcion(e.target.value); }} maxLength="300" type="text" readOnly={cargando} placeholder="&nbsp;" />
                                </label>
                            </div>

                            {
                                cargando == false ?
                                    (
                                        botonConfirmar == false ?
                                            (

                                                <div>
                                                    <button onClick={() => { setBotonConfirmar(true) }}>Modificar perfil</button>
                                                    <button onClick={() => {
                                                        setNuevoNombre(info.nombreUsuario)
                                                        setNuevoTipo(info.type)
                                                        setNuevoNumeroCelular(info.numeroCelular)
                                                        setNuevoNumeroTelefono(info.numeroTelefono)
                                                        setNuevaProvincia(info.provincia)
                                                        setNuevoMunicipio(info.municipio)
                                                        setNuevaLocalidad(info.localidad)
                                                        setNuevaDireccion(info.direccion)
                                                        setNuevaDescripcion(info.descripcion)
                                                    }}>Descartar cambios</button>
                                                </div>
                                            ) :
                                            (
                                                <div>
                                                    <p>Esta seguro que desea modificar su perfil?</p>
                                                    <div>
                                                        <button onClick={() => { handleModificar() }}>Si</button>
                                                        <button onClick={() => { setBotonConfirmar(false) }}>No</button>
                                                    </div>
                                                </div>
                                            )
                                    ) :
                                    <p>cargando</p>
                            }
                        </div>
















                        <div className={styles.derecha}>
                            <p>{info.mail}</p>
                            <p>{info.nombreUsuario}</p>
                            <p>{info.type}</p>
                            <div>
                                <p>Ubicacion</p>
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
                            </div>

                            <div className={styles.container_img}>
                                {
                                    cargando == false ?
                                        (
                                            confirmarEliminacionPerfil == false ?
                                                (
                                                    <div>
                                                        <label htmlFor='file-img-perfil'><img className={styles.edit_icon} src='/edit.png' /></label>
                                                        <input className={styles.input_file} onChange={(e) => { setImagePerfilUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-perfil' />

                                                        {
                                                            info.fotoPerfilURL.includes("https://firebasestorage.googleapis.com/v0/b/inmo-proyect.appspot.com/o/imagenesDefault%2FperfilDefault.jpg?alt=media&token=19044d3e-c7bc-493f-9850-20dc001ad5c5") == false ?
                                                                (
                                                                    <img onClick={() => setConfirmarEliminacionPerfil(true)} className={styles.delete_icon} src='/delete.png' />
                                                                ) :
                                                                null

                                                        }

                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <p>Desea eliminar la foto?</p>
                                                        <div>
                                                            <button onClick={() => { handleEliminarPerfil() }}>Si</button>
                                                            <button onClick={() => setConfirmarEliminacionPerfil(false)}>No</button>
                                                        </div>
                                                    </div>
                                                )
                                        ) :
                                        <p>cargando</p>

                                }

                                {/* https://www.flaticon.com/free-icon/x-mark_1617543?term=delete&page=1&position=34&page=1&position=34&related_id=1617543&origin=search */}

                                { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                <img className={styles.perfil} src={info.fotoPerfilURL} />
                            </div>



                            <div className={styles.container_img}>
                                {
                                    cargando == false ?
                                        confirmarEliminacionFondo == false ?
                                            (
                                                <div>
                                                    <label htmlFor='file-img-fondo'><img className={styles.edit_icon} src='/edit.png' /></label>
                                                    <input className={styles.input_file} onChange={(e) => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-fondo' />

                                                    {
                                                        info.fotoFondoURL.includes("https://firebasestorage.googleapis.com/v0/b/inmo-proyect.appspot.com/o/imagenesDefault%2FfondoDefault.png?alt=media&token=d4bde7ff-b705-43cd-b647-899db546186b") == false ?
                                                            (
                                                                <img onClick={() => { setConfirmarEliminacionFondo(true) }} className={styles.delete_icon} src='/delete.png' />
                                                            ) : null
                                                    }

                                                </div>
                                            ) :
                                            (
                                                <div>
                                                    <p>Desea eliminar la foto?</p>
                                                    <div>
                                                        <button onClick={() => { handleEliminarFondo() }}>Si</button>
                                                        <button onClick={() => setConfirmarEliminacionFondo(false)}>No</button>
                                                    </div>
                                                </div>
                                            ) :
                                        <p>cargando</p>
                                }



                                { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                <img className={styles.fondo} src={info.fotoFondoURL} />
                            </div>


                        </div>

                    </div>
                </Layout>
            </div>
        )
    }


}

export default principal