import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc } from 'firebase/firestore'
import styles from '../../styles/Principal.module.css'
import Axios from 'axios'


const principal = () => {

    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(true)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(null)


    const [nuevoNombre, setNuevoNombre] = useState("")
    const [nuevoTipo, setNuevoTipo] = useState("no seleccionar")
    const [nuevoNumeroCelular, setNuevoNumeroCelular] = useState("")
    const [nuevoNumeroTelefono, setNuevoNumeroTelefono] = useState("")



    const [provincias, setProvincias] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [localidades, setLocalidades] = useState([])


    const [nuevaProvincia, setNuevaProvincia] = useState("")
    const [nuevoMunicipio, setNuevoMunicipio] = useState("")
    const [nuevaLocalidad, setNuevaLocalidad] = useState("")

    const [nuevaDireccion, setNuevaDireccion] = useState("")


    const router = useRouter()



    useEffect(() => {
        provincia()
    }, [])


    useEffect(() => {
        municipio(nuevaProvincia)
    }, [nuevaProvincia])


    useEffect(() => {
        localidad(nuevoMunicipio)
    }, [nuevoMunicipio])



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
                                <option value="no seleccionar" disabled>-- Seleccione un nuevo tipo de cuenta --</option>
                                <option value="particular">Particular</option>
                                <option value="empresa">Empresa</option>
                            </select>
                            <button onClick={() => { setNuevoTipo("no seleccionar") }}>Resetear</button>
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

                            <input value={nuevoNumeroCelular} onChange={(e) => setNuevoNumeroCelular(e.target.value)} type="text" placeholder="Nuevo numero de celular" />
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

                            <select value={nuevaProvincia} onChange={(e) => { setNuevaProvincia(e.target.value) }} >
                                <option value="">Elige una provincia</option>
                                {
                                    provincias.map((p) => {
                                        return <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                    })
                                }
                            </select>


                            <select value={nuevoMunicipio} onChange={(e) => { setNuevoMunicipio(e.target.value) }} >
                                <option value="">Elige un municipio</option>
                                {
                                    municipios.map((p) => {
                                        return <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                    })
                                }
                            </select>


                            <select value={nuevaLocalidad} onChange={(e) => { setNuevaLocalidad(e.target.value) }}>
                                <option value="">Elige una localidad</option>
                                {
                                    localidades.map((p) => {
                                        return <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                    })
                                }
                            </select>



                            <button onClick={() => { provincia(); setNuevaProvincia(""); setNuevoMunicipio(""); setNuevaLocalidad("") }}>Recargar</button>

                            <div>
                                <label>Nueva direccion</label>
                                <input type="text" placeholder="Ej: Inmo 123" value={nuevaDireccion} onChange={(e) => setNuevaDireccion(e.target.value)} />
                            </div>

                            <button>Modificar perfil</button>
                        </div>



                    </div>

                    <div className={styles.derecha}>
                        <p>{info.mail}</p>
                        <p>{info.nombreUsuario}</p>
                        <p>{info.type}</p>
                        <img className={styles.perfil} src={info.fotoPerfilURL} />
                        <img className={styles.fondo} src={info.fotoFondoURL} />
                    </div>

                </div>
            </Layout>

        )
    }


}

export default principal