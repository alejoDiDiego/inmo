import React, { useEffect, useState } from 'react'
import styles from '../../styles/InformacionBasica.module.css'
import dynamic from "next/dynamic"
import SearchBox from './SearchBox'
import Select from 'react-select'

const MapNoSSR = dynamic(() => import("./Map"), {
    ssr: false,
});


const InformacionBasica = ({
    provincia,
    setProvincia,
    municipio,
    setMunicipio,
    localidad,
    setLocalidad,
    direccion,
    setDireccion,
    codigoPostal,
    setCodigoPostal,
    altura,
    setAltura,
    latLon,
    setLatLon,
    pisoDepto,
    setPisoDepto,
    tipoVivienda,
    setTipoVivienda,
    cantAmbientes,
    setCantAmbientes,
    cantBanos,
    setCantBanos,
    cantHabitaciones,
    setCantHabitaciones,
    cantCocheras,
    setCantCocheras,
    tipoPublicacion,
    setTipoPublicacion,
    precio,
    setPrecio,
    expensas,
    setExpensas,
    descripcion,
    setDescripcion,
    selectPosition,
    setSelectPosition
}) => {
    
    const [searchText, setSearchText] = useState("")

    const tipoViviendaOptions =
        [{ value: "casa", label: "Casa" },
        { value: "departamento", label: "Departamento" }]

    const tipoPublicacionOptions =
        [{ value: "venta", label: "Venta" },
        { value: "alquiler", label: "Alquiler" }]



    useEffect(() => {
        console.log(selectPosition)
        if (selectPosition != null) {
            if ("address" in selectPosition) {
                setSearchText(selectPosition.display_name)

                if ("state" in selectPosition.address) {
                    setProvincia(selectPosition.address.state)
                } else {
                    setProvincia("")
                }


                if ("state_district" in selectPosition.address) {
                    if (selectPosition.address.state_district.includes("Partido de")) {
                        setMunicipio(selectPosition.address.state_district.slice(11))
                    } else if (selectPosition.address.state_district.includes("Partido")) {
                        setMunicipio(selectPosition.address.state_district.slice(8))
                    } else {
                        setMunicipio(selectPosition.address.state_district)
                    }

                } else if ("city_district" in selectPosition.address) {
                    setMunicipio(selectPosition.address.city_district)
                } else {
                    setMunicipio("")
                }


                if ("city" in selectPosition.address) {
                } if ("town" in selectPosition.address) {
                    setLocalidad(selectPosition.address.town)
                } if ("quarter" in selectPosition.address) {
                    setLocalidad(selectPosition.address.quarter)
                } if ("village" in selectPosition.address) {
                    setLocalidad(selectPosition.address.village)
                } if ("suburb" in selectPosition.address) {
                    setLocalidad(selectPosition.address.suburb)
                } if ("neighbourhood" in selectPosition.address) {
                    setLocalidad(selectPosition.address.neighbourhood)
                } if ("district" in selectPosition.address) {
                    setLocalidad(selectPosition.address.district)
                } if ("county" in selectPosition.address) {
                    setLocalidad(selectPosition.address.county)
                } if("residential" in selectPosition.address){
                    setLocalidad(selectPosition.address.residential)
                }



                if ("postcode" in selectPosition.address) {
                    setCodigoPostal(selectPosition.address.postcode)
                } else {
                    setCodigoPostal("")
                }


                if ("road" in selectPosition.address) {
                    setDireccion(selectPosition.address.road)
                } else {
                    setDireccion("")
                }

                if ("house_number" in selectPosition.address) {
                    setAltura(selectPosition.address.house_number)
                } else {
                    setAltura("")
                }
                setLatLon({ lat: selectPosition.lat, lon: selectPosition.lon })
                console.log(latLon)




            } else {
                setProvincia("")
                setMunicipio("")
                setLocalidad("")
                setCodigoPostal("")
                setDireccion("")
                setAltura("")
                setPisoDepto("")
                setLatLon({})
            }



        }

    }, [selectPosition])




    const isNumber = e => {
        return e.target.value.replace(/\D/g, '');
    };


    const handleSelectTipoVivienda = (event) => {
        if (event == null) {
            setTipoVivienda("")
        }
        else {
            const value = event.value
            setTipoVivienda(value)
        }
    }


    const handleSelectTipoPublicacion = (event) => {
        if (event == null) {
            setTipoPublicacion("")
        }
        else {
            const value = event.value
            setTipoPublicacion(value)
        }
    }




    
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }





    return (
        <div className={styles.main}>
            <div>
                <h2>Ubicacion</h2>

                <div>
                    <div>
                        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className={styles.map}>
                        <MapNoSSR selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
                    </div>
                    <p>ATENCION 1: es posible que no encuentre su direccion y/o altura. Haga click en el lugar mas exacto de su casa y luego escriba la direccion/altura de esta debajo.</p>
                    <p>ATENCION 2: es posible que no pueda marcar correctamente la direccion haciendo click. En ese caso intente marcar la ubicacion de su casa con la mayor exactitud y escriba la direccion debajo.</p>
                </div>

                <div>
                    <label>Provincia*</label>
                    <input value={provincia} onChange={e => setProvincia(e.target.value)} />
                </div>

                <div>
                    <label>Municipio*</label>
                    <input value={municipio} onChange={e => setMunicipio(e.target.value)} />
                </div>

                <div>
                    <label>Localidad*</label>
                    <input value={localidad} onChange={e => setLocalidad(e.target.value)} />
                </div>

                <div>
                    <label>Codigo Postal*</label>
                    <input value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} />
                </div>

                <div>
                    <label>Direccion*</label>
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} />
                </div>

                <div>
                    <label>Altura*</label>
                    <input value={altura} onChange={e => setAltura(e.target.value)} />
                </div>


            </div>


            <div>
                <Select options={tipoViviendaOptions} onChange={handleSelectTipoVivienda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de vivienda"} defaultValue={{ value: tipoVivienda, label: titleCase(tipoVivienda) }}></Select>
            </div>

            {
                tipoVivienda == "departamento" ?
                    (
                        <div>
                            <label>Piso/Departamento*</label>
                            <input value={pisoDepto} onChange={e => setPisoDepto(e.target.value)} />
                        </div>
                    ) : null

            }




            <div>

                <h2>Informacion de la propiedad</h2>

                <div>
                    <label>Cantidad de ambientes*</label>
                    <input value={cantAmbientes} onChange={e => setCantAmbientes(isNumber(e))} />
                </div>

                <div>
                    <label>Cantidad de baños*</label>
                    <input value={cantBanos} onChange={e => setCantBanos(isNumber(e))} />
                </div>

                <div>
                    <label>Cantidad de habitacion*</label>
                    <input value={cantHabitaciones} onChange={e => setCantHabitaciones(isNumber(e))} />
                </div>

                <div>
                    <label>Cantidad de cocheras*</label>
                    <input value={cantCocheras} onChange={e => setCantCocheras(isNumber(e))} />
                </div>
            </div>


            <div>
                <h2>Valor</h2>

                <div>
                    <div>
                        <Select options={tipoPublicacionOptions} onChange={handleSelectTipoPublicacion} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} defaultValue={{ value: tipoPublicacion, label: titleCase(tipoPublicacion) }}></Select>
                    </div>

                    {
                        tipoPublicacion == "venta" ?
                            (

                                <div>
                                    <label>Precio USD$*</label>
                                    <input value={precio} onChange={e => setPrecio(isNumber(e))} />
                                </div>



                            ) :
                            (
                                <div>
                                    <label>Precio por mes ARS$*</label>
                                    <input value={precio} onChange={e => setPrecio(isNumber(e))} />
                                </div>
                            )
                    }

                    <div>
                        <label>Expensas</label>
                        <input value={expensas} onChange={e => setExpensas(isNumber(e))} />
                    </div>



                </div>
            </div>


            <div>
                <h2>Descripcion</h2>
                <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default InformacionBasica