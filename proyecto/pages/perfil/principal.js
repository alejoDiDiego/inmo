import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import styles from '../../styles/Principal.module.css'
import Axios from 'axios'


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
            <Layout>
                <div className={styles.arriba}>
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

                            <input value={nuevoNumeroCelular} onChange={(e) => setNuevoNumeroCelular(e.target.value)} type="text" placeholder="Nuevo numero de celular Ej: 5491112341234" />
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

                            <input value={nuevoNumeroTelefono} onChange={(e) => setNuevoNumeroTelefono(e.target.value)} type="text" placeholder="Nuevo numero de telefono" />
                        </div>

                        <div>
                            {
                                "ubicacion" in info ?
                                    (
                                        <p>Su actual ubicacion es {info.ubicacion.provincia}, {info.ubicacion.municipio}, {"localidad" in info.ubicacion && info.ubicacion.localidad}, {"direccion" in info.ubicacion && info.ubicacion.direccion}</p>
                                    ) :
                                    (
                                        <p>No tiene ninguna ubicacion asignada</p>
                                    )

                            }
                            <p>Nueva ubicacion</p>

                            <div>

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
                                                <p onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>No encuentra su localidad?</p>
                                                <select value={nuevaLocalidad} onChange={(e) => {setNuevaLocalidad(e.target.value)}}>
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
                                                <input placeholder='Ingrese su localidad' value={nuevaLocalidad} onChange={(e) => {setNuevaLocalidad(titleCase(e.target.value))}} />
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

                        <img className={styles.perfil} src={info.fotoPerfilURL} />
                        <img className={styles.fondo} src={info.fotoFondoURL} />
                    </div>

                </div>
            </Layout>

        )
    }


}

export default principal