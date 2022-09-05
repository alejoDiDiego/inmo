import React, { useCallback, useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import styles from '../../styles/Principal.module.css'
import Axios from 'axios'
import Head from 'next/head'
import { getCroppedImg, getRotatedImage } from '../../crop/auxCrop'
import Cropper from 'react-easy-crop'


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

    const [toggleProvincia, setToggleProvincia] = useState(false)
    const [toggleMunicipio, setToggleMunicipio] = useState(false)
    const [toggleLocalidad, setToggleLocalidad] = useState(false)

    const [botonConfirmar, setBotonConfirmar] = useState(false)


    const router = useRouter()



    const [imageSrc, setImageSrc] = React.useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const [croppedImagePerfil, setCroppedImagePerfil] = useState(null)
    const [croppedImageFondo, setCroppedImageFondo] = useState(null)

    const [modalPerfil, setModalPerfil] = useState(false)
    const [modalFondo, setModalFondo] = useState(false)

    const [imagePerfilUpload, setImagePerfilUpload] = useState([])
    const [imageFondoUpload, setImageFondoUpload] = useState([])

    const [resultadoPerfil, setResultadoPerfil] = useState(false)
    const [resultadoFondo, setResultadoFondo] = useState(false)

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


            setCroppedImagePerfil(croppedImage)
            setResultadoPerfil(true)

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


            setCroppedImageFondo(croppedImage)
            setResultadoFondo(true)

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
        if (imageFondoUpload.length == 0) {
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
        if (imagePerfilUpload.length == 0) {
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
        if (nuevaProvincia.length == 0) {
            setNuevoMunicipio("")
            setMunicipios([])
            setNuevaLocalidad("")
            setLocalidades([])
            return
        }

        setNuevaProvincia(titleCase(nuevaProvincia))

        municipio(nuevaProvincia)

    }, [nuevaProvincia])


    useEffect(() => {
        if (nuevoMunicipio.length == 0) {
            setNuevaLocalidad("")
            setLocalidades([])
            return
        }

        setNuevoMunicipio(titleCase(nuevoMunicipio))

        localidad(nuevoMunicipio)
    }, [nuevoMunicipio])











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
        if (
            nuevoNombre.length == 0
            && nuevoTipo.length == 0
            && nuevoNumeroCelular.length == 0
            && nuevoNumeroTelefono.length == 0
            && nuevaProvincia.length == 0
            && nuevoMunicipio.length == 0
            && nuevaLocalidad.length == 0
            && nuevaDireccion.length == 0
        ) {
            alert("No se aplicaron cambios")
            setBotonConfirmar(false)
            return
        }

        if (nuevaDireccion.length > 0 && nuevoMunicipio.length == 0 && nuevaProvincia.length == 0) {
            alert("Si incluye una direccion, por lo menos debe indicar una provincia y un municipio")
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
                [nuevaDireccion.length > 0 && 'direccion']: nuevaDireccion
            })
            alert("Se aplicaron los cambios")
            router.reload()
            return
        } catch (err) {
            console.log(err)
            alert("Ha habido un error")
        }






    }









    const provincia = () => {
        Axios.get("https://apis.datos.gob.ar/georef/api/provincias").then(async (res) => {
            let json = await res.data
            console.log(json.provincias)
            let sort = json.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre))
            setProvincias(sort)

        }).catch((err) => {
            console.log(err)
        })
    }


    const municipio = (provincia) => {
        Axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=400`).then(async (res) => {
            let json = await res.data
            console.log(json.municipios)
            let sort = json.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre))
            setMunicipios(sort)
        }).catch((err) => {
            console.log(err)
        })

    }


    const localidad = (municipio) => {
        Axios.get(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=20`).then(async (res) => {
            let json = await res.data
            console.log(json.localidades)
            let sort = json.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre))
            setLocalidades(sort)
        }).catch((err) => {
            console.log(err)
        })

    }




















    if (info == null) {
        return (
            <Layout>
                <p>cargando</p>
            </Layout>

        )
    } else {
        return (
            <div>
                <Head>
                    <title>Inmo</title>
                    <meta name="description" content="Generated" />
                    <link rel="icon" href="/Logo_inmo_new.png" />
                </Head>
                <Layout>
                    <div className={styles.arriba}>
                        {
                            modalPerfil ?
                                <div className={styles.modal_crop}>
                                    <div className={styles.modal_crop_inside}>
                                        <div className={styles.menu} onClick={() => { setModalPerfil(false); setImagePerfilUpload([]) }}>
                                            <div className={styles.bar}></div>
                                            <div className={styles.bar}></div>
                                            <div className={styles.bar}></div>
                                        </div>
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



                                    </div>
                                </div>
                                : null
                        }

                        {
                            modalFondo ?
                                <div className={styles.modal_crop}>
                                    <div className={styles.modal_crop_inside}>
                                        <div className={styles.menu} onClick={() => setModalFondo(false)}>
                                            <div className={styles.bar}></div>
                                            <div className={styles.bar}></div>
                                            <div className={styles.bar}></div>
                                        </div>
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



                                    </div>
                                </div>
                                : null
                        }
                        <div>

                            <div>
                                <label>Nuevo nombre</label>
                                <input value={nuevoNombre} placeholder="Nuevo nombre" onChange={e => setNuevoNombre(e.target.value)} type="text" />
                            </div>


                            <div>
                                <label>Tipo de cuenta : {info.type}</label>
                                <select value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
                                    <option value="">-- Seleccione un nuevo tipo de cuenta --</option>
                                    <option value="particular">Particular</option>
                                    <option value="empresa">Empresa</option>
                                </select>
                                <button onClick={() => { setNuevoTipo("") }}>Resetear</button>
                            </div>

                            <div>
                                {
                                    "numeroCelular" in info ?
                                        (
                                            <p>Tu numero de celular actual es: {info.numeroCelular}</p>
                                        ) :
                                        (
                                            <p>No tiene ningun numero de celular asignado</p>
                                        )

                                }

                                <input value={nuevoNumeroCelular} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} onChange={(e) => setNuevoNumeroCelular(e.target.value)} type="text" placeholder="Nuevo numero de celular Ej: 5491112341234" />
                            </div>

                            <div>
                                {
                                    "numeroTelefono" in info ?
                                        (
                                            <p>Tu numero de telefono actual es: {info.numeroTelefono}</p>
                                        ) :
                                        (
                                            <p>No tiene ningun numero de telefono asignado</p>
                                        )

                                }

                                <input value={nuevoNumeroTelefono} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} onChange={(e) => setNuevoNumeroTelefono(e.target.value)} type="text" placeholder="Nuevo numero de telefono" />
                            </div>

                            <div>
                                <p>Ubicacion</p>
                                {
                                    'provincia' in info || 'municipio' in info || 'direccion' in info ?
                                        (
                                            <p>
                                                {
                                                    'provincia' in info &&
                                                    (
                                                        info.provincia
                                                    )
                                                }, {`${" "}`}
                                                {
                                                    'municipio' in info &&
                                                    (
                                                        info.municipio
                                                    )
                                                }
                                                {
                                                    'localidad' in info &&
                                                    (
                                                        <>
                                                            ,{`${" "}`}{info.localidad}
                                                        </>
                                                    )
                                                }
                                                {
                                                    'direccion' in info &&
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



                                <div>
                                    <p>Nueva ubicacion</p>

                                    {
                                        toggleProvincia == false ?
                                            (
                                                <div>
                                                    <p onClick={() => { setToggleProvincia(!toggleProvincia) }}>No encuentra su provincia?</p>

                                                    <select value={nuevaProvincia} onChange={(e) => { setNuevaProvincia(e.target.value) }} >
                                                        <option value="">Elige una provincia</option>
                                                        {
                                                            provincias.map((p) => {
                                                                return <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                            ) :
                                            (
                                                <div>
                                                    <p onClick={() => { setToggleProvincia(!toggleProvincia) }}>x</p>
                                                    <input placeholder='Ingrese su provincia' value={nuevaProvincia} onChange={(e) => { setNuevaProvincia(e.target.value) }} />
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
                                                    <select value={nuevoMunicipio} onChange={(e) => { setNuevoMunicipio(e.target.value) }} >
                                                        <option value="">Elige un municipio</option>
                                                        {
                                                            municipios.map((p) => {
                                                                return <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                            ) :
                                            (
                                                <div>
                                                    <p onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>x</p>
                                                    <input placeholder='Ingrese su municipio' value={nuevoMunicipio} onChange={(e) => { setNuevoMunicipio(e.target.value) }} />
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
                                                    <select value={nuevaLocalidad} onChange={(e) => { setNuevaLocalidad(e.target.value) }}>
                                                        <option value="">Elige una localidad</option>
                                                        {
                                                            localidades.map((p) => {
                                                                return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            ) :
                                            (
                                                <div>
                                                    <p onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>x</p>
                                                    <input placeholder='Ingrese su localidad' value={nuevaLocalidad} onChange={(e) => { setNuevaLocalidad(titleCase(e.target.value)) }} />
                                                </div>
                                            )
                                    }
                                </div>



                                <button onClick={() => { provincia(); setNuevaProvincia(""); setNuevoMunicipio(""); setNuevaLocalidad("") }}>Recargar</button>

                                <div>
                                    <label>Nueva direccion</label>
                                    <input type="text" placeholder="Ej: Inmo 123" value={nuevaDireccion} onChange={(e) => setNuevaDireccion(e.target.value)} />
                                </div>

                                {
                                    botonConfirmar == false ?
                                        (
                                            <button onClick={() => { setBotonConfirmar(true) }}>Modificar perfil</button>
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
                                }


                            </div>



                        </div>
















                        <div className={styles.derecha}>
                            <p>{info.mail}</p>
                            <p>{info.nombreUsuario}</p>
                            <p>{info.type}</p>
                            <div>
                                <p>Ubicacion</p>
                                <div>
                                    {
                                        'provincia' in info || 'municipio' in info || 'direccion' in info ?
                                            (
                                                <p>
                                                    {
                                                        'provincia' in info &&
                                                        (
                                                            info.provincia
                                                        )
                                                    }, {`${" "}`}
                                                    {
                                                        'municipio' in info &&
                                                        (
                                                            info.municipio
                                                        )
                                                    }
                                                    {
                                                        'localidad' in info &&
                                                        (
                                                            <>
                                                                ,{`${" "}`}{info.localidad}
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        'direccion' in info &&
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
                                    'numeroCelular' in info ?
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
                                    'numeroTelefono' in info ?
                                        (
                                            <p>{info.numeroTelefono}</p>
                                        ) :
                                        (
                                            <p>No tiene ningun numero de telefono asignado</p>
                                        )
                                }
                            </div>

                            <div className={styles.container_img}>
                                <div>
                                    <label htmlFor='file-img-perfil'><img className={styles.edit_icon} src='/edit.png' /></label>
                                    <input className={styles.input_file} onChange={(e) => { setImagePerfilUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-perfil' />
                                </div>


                                { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                <img className={styles.perfil} src={croppedImagePerfil != null ? croppedImagePerfil : info.fotoPerfilURL} />
                            </div>



                            <div className={styles.container_img}>
                                <div>
                                    <label htmlFor='file-img-fondo'><img className={styles.edit_icon} src='/edit.png' /></label>
                                    <input className={styles.input_file} onChange={(e) => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/gif, image/jpeg" type="file" id='file-img-fondo' />
                                </div>


                                { /* https://www.flaticon.com/free-icon/edit_1159633?term=edit&page=1&position=1&page=1&position=1&related_id=1159633&origin=search# */}
                                <img className={styles.fondo} src={croppedImageFondo != null ? croppedImageFondo : info.fotoFondoURL} />
                            </div>

                            
                        </div>

                    </div>
                </Layout>
            </div>
        )
    }


}

export default principal