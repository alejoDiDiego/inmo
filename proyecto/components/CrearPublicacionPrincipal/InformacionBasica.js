import React, { useEffect, useState } from 'react'
import styles from '../../styles/CrearPublicacion.module.css'
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
    piso,
    setPiso,
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
    mt2Totales,
    setMt2Totales,
    mt2Utilizados,
    setMt2Utilizados,
    tipoPublicacion,
    setTipoPublicacion,
    precio,
    setPrecio,
    expensas,
    setExpensas,
    descripcion,
    setDescripcion,
    selectPosition,
    setSelectPosition,
    numeroLetraDepto,
    setNumeroLetraDepto
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
                } if ("residential" in selectPosition.address) {
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
                setPiso("")
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

            <div className={styles.ubicacion}>
                <h1>Crear Publicacion</h1>
                <p>Los campos marcados con un asterisco (*) son obligatorios</p>
                <h2 className={styles.ubiTitle}>1. Ubicacion</h2>
                <div className={styles.mapPlusData}>
                    <div className={styles.mapPlusInfo}>
                        <div className={styles.mapa}>
                            <div className={styles.search}>
                                <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} searchText={searchText} setSearchText={setSearchText} />
                            </div>
                            <div className={styles.map}>
                                <MapNoSSR selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
                            </div>
                            <div className={styles.advices}>
                                <p>ATENCION 1: es posible que no encuentre su direccion y/o altura. Haga click en el lugar mas exacto de su casa y luego escriba la direccion/altura de esta debajo.</p>
                                <p>ATENCION 2: es posible que no pueda marcar correctamente la direccion haciendo click. En ese caso intente marcar la ubicacion de su casa con la mayor exactitud y escriba la direccion debajo.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ubiInput}>
                        <div className={styles.fieldDir}>
                            <p>Provincia*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={provincia} onChange={e => setProvincia(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Municipio*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={municipio} onChange={e => setMunicipio(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Localidad*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={localidad} onChange={e => setLocalidad(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Codigo Postal*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Direccion*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={direccion} onChange={e => setDireccion(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Altura*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={100} value={altura} onChange={e => setAltura(e.target.value)} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.informacionV}>

                <div className={styles.basicInfo}>
                    <div className={styles.fieldsInputs}>
                        <h2>2. Informacion de la propiedad</h2>
                        <h3>Informacion basica</h3>

                        <div>
                            <p className={styles.selectLabel}>Tipo de propiedad</p>
                            <div>
                                <Select className={styles.selectContainer} options={tipoViviendaOptions} onChange={handleSelectTipoVivienda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de vivienda"} defaultValue={{ value: tipoVivienda, label: titleCase(tipoVivienda) }}></Select>
                            </div>
                        </div>

                        {
                            tipoVivienda == "departamento" ?
                                (
                                    <div>
                                        <div className={styles.fieldDir}>
                                            <p>Piso*:</p>
                                            <label className={`${styles.custom_field} ${styles.two}`}>
                                                <input maxLength={25} value={piso} onChange={e => setPiso(isNumber(e))} type="text" placeholder="&nbsp;" />
                                            </label>
                                        </div>
                                        <div className={styles.fieldDir}>
                                            <p>Depto*:</p>
                                            <label className={`${styles.custom_field} ${styles.two}`}>
                                                <input maxLength={25} value={numeroLetraDepto} onChange={e => setNumeroLetraDepto(e.target.value)} type="text" placeholder="Ej: A / 1 / 1C" />
                                            </label>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className={styles.fieldDir}>
                                        <p>Depto/Division*:</p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={25} value={numeroLetraDepto} onChange={e => setNumeroLetraDepto(e.target.value)} type="text" placeholder="Ej: A / 1 / 1C" />
                                        </label>
                                    </div>
                                )

                        }


                        <div className={styles.fieldDir}>
                            <p>Cantidad de ambientes*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={cantAmbientes} onChange={e => setCantAmbientes(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Cantidad de baños*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={cantBanos} onChange={e => setCantBanos(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Cantidad de habitaciones*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={cantHabitaciones} onChange={e => setCantHabitaciones(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Cantidad de cocheras*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={cantCocheras} onChange={e => setCantCocheras(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Mt<sup>2</sup> Totales*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={mt2Totales} onChange={e => setMt2Totales(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                        <div className={styles.fieldDir}>
                            <p>Mt<sup>2</sup> Utilizados*:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={25} value={mt2Utilizados} onChange={e => setMt2Utilizados(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                    </div>
                        {
                            tipoVivienda == "casa" ?
                                (

                                    <div className={styles.houseGraph}>
                                    <img src='/houseIlustration.png'></img>
                                    </div>

                                ) :
                                (
                                    <div className={styles.houseGraph}>
                                    <img src='/buildingIlustration.png'></img>
                                    </div>
                                )
                        }
                </div>


                <div className={styles.valueInfoContainer}>
                    <div className={styles.valueFields}>
                        <h3>Valor</h3>

                        <div>
                            <p className={styles.selectLabel}>Tipo de publicacion</p>
                            <div className={styles.selectContainer}>
                                <Select options={tipoPublicacionOptions} onChange={handleSelectTipoPublicacion} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} defaultValue={{ value: tipoPublicacion, label: titleCase(tipoPublicacion) }}></Select>
                            </div>
                        </div>

                        {
                            tipoPublicacion == "venta" ?
                                (

                                    <div className={styles.fieldDir}>
                                        <p>Precio USD$*:</p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={10} value={precio} onChange={e => setPrecio(isNumber(e))} type="text" placeholder="&nbsp;" />
                                        </label>
                                    </div>



                                ) :
                                (
                                    <div className={styles.fieldDir}>
                                        <p>Precio por mes ARS$*:</p>
                                        <label className={`${styles.custom_field} ${styles.two}`}>
                                            <input maxLength={10} value={precio} onChange={e => setPrecio(isNumber(e))} type="text" placeholder="&nbsp;" />
                                        </label>
                                    </div>
                                )
                        }

                        <div className={styles.fieldDir}>
                            <p>Expensas:</p>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={10} value={expensas} onChange={e => setExpensas(isNumber(e))} type="text" placeholder="&nbsp;" />
                            </label>
                        </div>
                    </div>
                    <div className={styles.cardContainer}>
                        <div className={styles.pole}></div>
                        <div className={styles.valueCard}>
                            {
                                tipoPublicacion == "venta" ?
                                    (
                                        <div className={styles.cardInside}>
                                            <div>
                                                <h2>En venta</h2>
                                                {
                                                    expensas == 0 ?
                                                        (
                                                            <div className={styles.expContainer}>
                                                                <h3 className={styles.exp1}>Sin expensas</h3>
                                                            </div>
                                                        ) :
                                                        (
                                                            <div className={styles.expContainer}>
                                                                <h3>Expensas</h3>
                                                                <h3 className={styles.exp2}>{expensas} <span>$/mes</span></h3>
                                                            </div>
                                                        )
                                                }
                                            </div>

                                            {
                                                precio == 0 ?
                                                    (
                                                        <div className={styles.priceContainer}>
                                                            <h2 className={styles.price}>----------</h2>
                                                            <h2 className={styles.price}>USD</h2>
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className={styles.priceContainer}>
                                                            <h2 className={styles.price}>{precio}</h2>
                                                            <h2 className={styles.price}>USD</h2>
                                                        </div>

                                                    )
                                            }
                                        </div>

                                    ) :
                                    (
                                        <div className={styles.cardInside}>
                                            <div>
                                                <h2>Alquiler</h2>
                                                {
                                                    expensas == 0 ?
                                                        (
                                                            <div className={styles.expContainer}>
                                                                <h3 className={styles.exp1}>Sin expensas</h3>
                                                            </div>
                                                        ) :
                                                        (
                                                            <div className={styles.expContainer}>
                                                                <h3>Expensas</h3>
                                                                <h3 className={styles.exp2}>{expensas} <span>ARS$/mes</span></h3>
                                                            </div>
                                                        )
                                                }
                                            </div>

                                            {
                                                precio == 0 ?
                                                    (
                                                        <div className={styles.priceContainer}>
                                                            <h2 className={styles.price}>----------</h2>
                                                            <h2 className={styles.price}>ARS$/mes</h2>
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className={styles.priceContainer}>
                                                            <h2 className={styles.price}>{precio}</h2>
                                                            <h2 className={styles.price}>ARS$/mes</h2>
                                                        </div>

                                                    )
                                            }
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.descripAreaContainer}>
                <h3>Descripcion: <span>{descripcion.length}/200</span></h3>
                <div className={styles.fieldDir}>
                    <textarea className={styles.descripArea} value={descripcion} onChange={e => setDescripcion(e.target.value)} maxLength="200" type="text" placeholder="&nbsp;"></textarea>
                </div>
            </div>
        </div>
    )
}

export default InformacionBasica