import React, { useEffect, useState } from 'react'
import Axios from 'axios'


const Configuracion = ({ info }) => {

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






    return (
        <div>
            <div>
                <div>
                    <label>Nombre actual : {info.nombreUsuario}</label>
                    <input value={nuevoNombre} placeholder="Nuevo nombre" onChange={e => setNuevoNombre(e.target.value)} type="text" />
                </div>


                <br />

                <div>
                    <label>Tipo de cuenta : {info.type}</label>
                    <select value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
                        <option value="no seleccionar" disabled>-- Seleccione un nuevo tipo de cuenta --</option>
                        <option value="particular">Particular</option>
                        <option value="empresa">Empresa</option>
                    </select>
                    <button onClick={() => { setNuevoTipo("no seleccionar") }}>Resetear</button>
                </div>

                <br />

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

                <br />

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

                <br />

                <div>
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

                    <button onClick={() => { setNuevaProvincia(""); setNuevoMunicipio(""); setNuevaLocalidad("") }}>Resetear</button>
                    <button onClick={() => { provincia() }}>Recargar</button>
                </div>


            </div>

        </div>
    )
}

export default Configuracion