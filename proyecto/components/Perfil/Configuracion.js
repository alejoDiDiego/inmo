import React, { useEffect, useState } from 'react'


const Configuracion = ({ info }) => {

    const [nuevoNombre, setNuevoNombre] = useState("")
    const [nuevoTipo, setNuevoTipo] = useState("no seleccionar")
    const [nuevoNumeroCelular, setNuevoNumeroCelular] = useState("")
    const [nuevoNumeroTelefono, setNuevoNumeroTelefono] = useState("")
    const [nuevaProvincia, setNuevaProvincia] = useState("")
    const [nuevoMunicipio, setNuevoMunicipio] = useState("")
    const [nuevaLocalidad, setNuevaLocalidad] = useState("")


    const $d = document;
    const $selectProvincias = $d.getElementById("selectProvincias");
    const $selectMunicipios = $d.getElementById("selectMunicipios");
    const $selectLocalidades = $d.getElementById("selectLocalidades");



    useEffect(() => {
        provincia()

    }, [])

    useEffect(() => {
        if (nuevaProvincia.includes("Elige una provincia")) {
            setNuevaProvincia("Elige una provincia")
            setNuevoMunicipio("Elige un municipio")
            setNuevaLocalidad("Elige una localidad")
        }

        municipio(nuevaProvincia)



    }, [nuevaProvincia])

    useEffect(() => {
        if (nuevoMunicipio.includes("Elige un municipio")) {
            setNuevoMunicipio("Elige un municipio")
            setNuevaLocalidad("Elige una localidad")
        }
        localidad(nuevoMunicipio)
    }, [nuevoMunicipio])


    const provincia = () => {
        fetch("https://apis.datos.gob.ar/georef/api/provincias")
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                let $options = `<option value="Elige una provincia">Elige una provincia</option>`;

                json.provincias.forEach(el => $options += `<option value="${el.nombre}">${el.nombre}</option>`);

                $selectProvincias.innerHTML = $options;
            })
            .catch(error => {
                let message = error.statusText || "Ocurrió un error";

                console.log(message)
            })
    }


    const municipio = (provincia) => {
        fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=200`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                let $options = `<option value="Elige un municipio">Elige un municipio</option>`;

                json.municipios.forEach(el => $options += `<option value="${el.nombre}">${el.nombre}</option>`);

                $selectMunicipios.innerHTML = $options;
            })
            .catch(error => {
                let message = error.statusText || "Ocurrió un error";

                console.log(message)
            })
    }


    const localidad = (municipio) => {
        fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=20`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                let $options = `<option value="Elige una localidad">Elige una localidad</option>`;

                json.localidades.forEach(el => $options += `<option value="${el.nombre}">${el.nombre}</option>`);

                $selectLocalidades.innerHTML = $options;
            })
            .catch(error => {
                let message = error.statusText || "Ocurrió un error";

                console.log(message)
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
                    <select value={nuevaProvincia} onChange={(e) => { setNuevaProvincia(e.target.value) }} id="selectProvincias">
                        <option value="Elige una provincia">Elige una provincia</option>
                    </select>

                    <select value={nuevoMunicipio} onChange={(e) => { setNuevoMunicipio(e.target.value) }} id="selectMunicipios">
                        <option value="Elige un municipio">Elige un municipio</option>
                    </select>

                    <select value={nuevaLocalidad} onChange={(e) => { setNuevaLocalidad(e.target.value) }} id="selectLocalidades">
                        <option value="Elige una localidad">Elige una localidad</option>
                    </select>

                    <button onClick={() => {setNuevaProvincia("Elige una provincia"); setNuevoMunicipio("Elige un municipio"); setNuevaLocalidad("Elige una localidad")}}>Resetear</button>

                </div>


            </div>

        </div>
    )
}

export default Configuracion