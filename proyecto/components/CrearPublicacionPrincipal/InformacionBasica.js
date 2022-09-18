import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from '../../styles/InformacionBasica.module.css'
import Axios from 'axios'

const InformacionBasica = ({
    provincia,
    setProvincia,
    municipio,
    setMunicipio,
    localidad,
    setLocalidad,
    direccion,
    setDireccion
}) => {


    const [provincias, setProvincias] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [localidades, setLocalidades] = useState([])



    const [toggleProvincia, setToggleProvincia] = useState(false)
    const [toggleMunicipio, setToggleMunicipio] = useState(false)
    const [toggleLocalidad, setToggleLocalidad] = useState(false)









    useEffect(() => {
        setProvincia("")
    }, [toggleProvincia])

    useEffect(() => {
        setMunicipio("")
    }, [toggleMunicipio])

    useEffect(() => {
        setLocalidad("")
    }, [toggleLocalidad])





    const provinciaFunc = () => {
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


    const municipioFunc = (provincia) => {
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


    const localidadFunc = (municipio) => {
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


    useEffect(() => {
        provinciaFunc()
    }, [])


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    useEffect(() => {
        setMunicipio("")
        setMunicipios([])
        setLocalidad("")
        setLocalidades([])
        if (provincia.length == 0) {
            return
        }

        setProvincia(provincia)

        municipioFunc(provincia)

    }, [provincia])


    useEffect(() => {
        setLocalidad("")
        setLocalidades([])
        if (municipio.length == 0) {
            return
        }

        setMunicipio(municipio)

        localidadFunc(municipio)
    }, [municipio])


    useEffect(() => {
        setLocalidad(localidad)
    }, [localidad])




    const handleSelectProv = (event) => {
        if (event == null) {
            setProvincia("")
            setMunicipio("")
            setLocalidad("")
            setMunicipios([])
            setLocalidades([])
        }
        else {
            const value = event.value
            setProvincia(value)
            setMunicipio("")
            setLocalidad("")
            setMunicipios([])
            setLocalidades([])
        }
    }

    const handleSelectMun = (event) => {
        if (event == null) {
            setMunicipio("")
            setLocalidad("")
            setLocalidades([])
        }
        else {
            const value = event.value
            setMunicipio(value)
            setLocalidad("")
            setLocalidades([])
        }
    }

    const handleSelectLoc = (event) => {
        if (event == null) {
            setLocalidad("")
        }
        else {
            const value = event.value
            setLocalidad(value)
        }
    }






    return (
        <div>
            <h2>Ubicacion</h2>

            <div>

                <div >
                    {
                        toggleProvincia == false ?
                            (
                                <div>
                                    <p className={styles.ubiLabel}> Provincia* <span onClick={() => { setToggleProvincia(!toggleProvincia) }}>No encuentro mi provincia</span></p>

                                    {/* <select value={provincia} disabled={cargando} onChange={(e) => { setProvincia(e.target.value) }} >
                                                    <option value="">Elige una provincia</option>
                                                    {
                                                        provincias.map((p) => {
                                                            return <option key={p.id} value={titleCase(p.nombre)}>{titleCase(p.nombre)}</option>
                                                        })
                                                    }
                                                </select> */}

                                    <div className={styles.fieldDirSelect}>
                                        <Select options={provincias} onChange={handleSelectProv} isClearable={true} isSearchable={true} placeholder={"Seleccione una provincia"} value={provincia == "" ? { value: null, label: "Seleccione una provincia" } : { value: provincia, label: provincia }}></Select>
                                    </div>

                                </div>

                            ) :
                            (

                                <div>
                                    <div className={styles.fieldDir}>
                                        <p className={styles.ubiLabel}> Escriba su provincia* <span onClick={() => { setToggleProvincia(!toggleProvincia) }}>Volver</span></p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={30} value={provincia} onChange={(e) => { setProvincia(titleCase(e.target.value)) }} />
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
                                        <Select options={municipios} onChange={handleSelectMun} isClearable={true} isSearchable={true} placeholder={"Seleccione un municipio"} value={municipio == "" ? { value: null, label: "Seleccione un municipio" } : { value: municipio, label: municipio }}></Select>
                                    </div>

                                </div>

                            ) :
                            (
                                <div>
                                    <div className={styles.fieldDir}>
                                        <p className={styles.ubiLabel}> Escriba su municipio* <span onClick={() => { setToggleMunicipio(!toggleMunicipio) }}>Volver</span></p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={30} value={municipio} onChange={(e) => { provincia.length == 0 ? null : setMunicipio(titleCase(e.target.value)) }} />
                                        </label>
                                    </div>
                                </div>
                            )
                    }
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
                                        <Select options={localidades} onChange={handleSelectLoc} isClearable={true} isSearchable={true} placeholder={"Seleccione una localidad"} value={localidad == "" ? { value: null, label: "Seleccione una localidad" } : { value: localidad, label: localidad }}></Select>
                                    </div>

                                </div>
                            ) :
                            (
                                <div>

                                    <div className={styles.fieldDir}>
                                        <p className={styles.ubiLabel}> Escriba su localidad <span onClick={() => { setToggleLocalidad(!toggleLocalidad) }}>Volver</span></p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={30} value={localidad} onChange={(e) => { municipio.length == 0 ? null : setLocalidad(titleCase(e.target.value)) }} />
                                        </label>
                                    </div>
                                </div>
                            )
                    }
                </div>

                <div>
                    <br />
                    <label>Direccion</label>
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}

export default InformacionBasica