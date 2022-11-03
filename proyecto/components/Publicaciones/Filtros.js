import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Select, { components } from 'react-select'
import styles from "../../styles/Filtros.module.css"

const Filtros = ({ router }) => {

    const { query: {
        direccion,
        tipoPublicacion,
        tipoVivienda,
        precioMin,
        precioMax,
        cantBanosMin,
        cantBanosMax,
        cantAmbientesMax,
        cantAmbientesMin,
        cantCocherasMax,
        cantCocherasMin,
        cantHabitacionesMax,
        cantHabitacionesMin,
        publicacion
    } } = router

    const r = useRouter()

    const [active, setActive] = useState(false)


    const [nuevaDireccion, setNuevaDireccion] = useState("")
    const [nuevoTipoPublicacion, setNuevoTipoPublicacion] = useState("")
    const [nuevoTipoVivienda, setNuevoTipoVivienda] = useState("")
    const [nuevoPrecioMin, setNuevoPrecioMin] = useState("")
    const [nuevoPrecioMax, setNuevoPrecioMax] = useState("")
    const [nuevoBanosMin, setNuevoBanosMin] = useState("")
    const [nuevoBanosMax, setNuevoBanosMax] = useState("")
    const [nuevoCantAmbientesMin, setNuevoCantAmbientesMin] = useState("")
    const [nuevoCantAmbientesMax, setNuevoCantAmbientesMax] = useState("")
    const [nuevoCantCocherasMin, setNuevoCantCocherasMin] = useState("")
    const [nuevoCantCocherasMax, setNuevoCantCocherasMax] = useState("")
    const [nuevoCantHabitacionesMin, setNuevoCantHabitacionesMin] = useState("")
    const [nuevoCantHabitacionesMax, setNuevoCantHabitacionesMax] = useState("")



    const tipoViviendaOptions =
        [
            { value: "", label: "Todos" },
            { value: "casa", label: "Casa" },
            { value: "departamento", label: "Departamento" }]

    const tipoPublicacionOptions =
        [
            { value: "", label: "Todos" },
            { value: "venta", label: "Venta" },
            { value: "alquiler", label: "Alquiler" }]


    const handleSelectTipoVivienda = (event) => {
        if (event == null) {
            setNuevoTipoVivienda("")
        }
        else {
            const value = event.value
            setNuevoTipoVivienda(value)
        }
    }


    const handleSelectTipoPublicacion = (event) => {
        if (event == null) {
            setNuevoTipoPublicacion("")
        }
        else {
            const value = event.value
            setNuevoTipoPublicacion(value)
        }
    }






    useEffect(() => {
        if (
            direccion == null ||
            tipoPublicacion == null ||
            tipoVivienda == null ||
            precioMin == null ||
            precioMax == null ||
            cantBanosMin == null ||
            cantBanosMax == null ||
            cantAmbientesMax == null ||
            cantAmbientesMin == null ||
            cantCocherasMax == null ||
            cantCocherasMin == null ||
            cantHabitacionesMax == null ||
            cantHabitacionesMin == null
        ) {
            return
        }
        console.log(router.query)
        setNuevaDireccion(direccion)
        setNuevoTipoPublicacion(tipoPublicacion)
        setNuevoTipoVivienda(tipoVivienda)
        setNuevoPrecioMin(precioMin)
        setNuevoPrecioMax(precioMax)
        setNuevoBanosMin(cantBanosMin)
        setNuevoBanosMax(cantBanosMax)
        setNuevoCantAmbientesMin(cantAmbientesMin)
        setNuevoCantAmbientesMax(cantAmbientesMax)
        setNuevoCantCocherasMin(cantCocherasMin)
        setNuevoCantCocherasMax(cantCocherasMax)
        setNuevoCantHabitacionesMin(cantHabitacionesMin)
        setNuevoCantHabitacionesMax(cantHabitacionesMax)
    }, [router])





    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }








    const handleBuscar = () => {
        Router.push({
            pathname: '/publicaciones/principal',
            query: {
                direccion: nuevaDireccion,
                tipoPublicacion: nuevoTipoPublicacion,
                tipoVivienda: nuevoTipoVivienda,
                precioMin: nuevoPrecioMin,
                precioMax: nuevoPrecioMax,
                cantBanosMin: nuevoBanosMin,
                cantBanosMax: nuevoBanosMax,
                cantAmbientesMax: nuevoCantAmbientesMax,
                cantAmbientesMin: nuevoCantAmbientesMin,
                cantCocherasMax: nuevoCantCocherasMax,
                cantCocherasMin: nuevoCantCocherasMin,
                cantHabitacionesMax: nuevoCantHabitacionesMax,
                cantHabitacionesMin: nuevoCantHabitacionesMin
            }
        })
    }






    const handleReiniciar = () => {
        Router.push({
            pathname: '/publicaciones/principal',
            query: {
                direccion: "",
                tipoPublicacion: "",
                tipoVivienda: "",
                precioMax: "",
                precioMin: "",
                cantBanosMin: "",
                cantBanosMax: "",
                cantAmbientesMax: "",
                cantAmbientesMin: "",
                cantCocherasMax: "",
                cantCocherasMin: "",
                cantHabitacionesMax: "",
                cantHabitacionesMin: ""
            }
        })
    }




    const isNumber = e => {
        return e.target.value.replace(/\D/g, '');
    };



    useEffect(() => {
        setNuevoPrecioMax("")
        setNuevoPrecioMin("")
    }, [nuevoTipoPublicacion])



    return (
        <div>
            <div>
                <div className={styles.mapFilters}>

                    <div className={styles.searchPlusButtons}>
                        <div className={styles.fieldDir}>
                            <label className={`${styles.custom_field} ${styles.two}`}>
                                <input maxLength={40} value={nuevaDireccion} onChange={e => setNuevaDireccion(e.target.value)} placeholder='Provincia, Municipio, Localidad, Código Postal' />
                            </label>
                        </div>

                        <div className={styles.searchControl}>
                            <div onClick={() => handleBuscar()} className={styles.div_img}>
                                <img className={styles.div_img2} src='/lupa3.png' layout='fill' />
                            </div>
                            <div onClick={() => handleReiniciar()} className={styles.div_img}>
                                <img className={styles.div_img3} src='/crossed.png' layout='fill' />
                            </div>
                        </div>
                    </div>


                    <div className={styles.filtersSelects}>
                        <Select options={tipoViviendaOptions} onChange={handleSelectTipoVivienda} isClearable={false} isSearchable={false} value={nuevoTipoVivienda == "" ? { value: null, label: "Tipo de propiedad" } : { value: nuevoTipoVivienda, label: titleCase(nuevoTipoVivienda) }} ></Select>
                        <Select options={tipoPublicacionOptions}  onChange={handleSelectTipoPublicacion} isClearable={false} isSearchable={false} value={nuevoTipoPublicacion == "" ? { value: null, label: "Tipo de publicacion" } : { value: nuevoTipoPublicacion, label: titleCase(nuevoTipoPublicacion) }}></Select>
                    </div>


                </div>


                <div className={styles.div_menu}>
                    <div className={`${styles.menu} ${active == true ? styles.active : null}`} onClick={() => { setActive(!active) }}>
                        <div className={styles.filtersControl}>
                        <p>Filtros avanzados</p>
                            <img className={styles.div_imgFilters} src='/down.png' layout='fill'></img>
                        </div>
                    </div>


                    <div className={`${styles.hidden_menu} ${active == true ? styles.active : null}`}>
                        <div className={styles.inside_hidden_menu}>
                            {
                                nuevoTipoPublicacion.length == 0 ?
                                    <>

                                    </>
                                    :
                                    <>

                                        <h4>Precio:</h4>
                                        <div className={styles.filtersUnit}>
                                            <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                                <input placeholder={`Minimo ${nuevoTipoPublicacion == "alquiler" ? "$ARS" : "$USD"}`} value={nuevoPrecioMin} onChange={e => setNuevoPrecioMin(isNumber(e))} />
                                            </label>
                                            <h2>-</h2>
                                            <label className={`${styles.custom_fieldFilter} ${styles.two}`}>

                                                <input placeholder={`Maximo ${nuevoTipoPublicacion == "alquiler" ? "$ARS" : "$USD"}`} value={nuevoPrecioMax} onChange={e => setNuevoPrecioMax(isNumber(e))} />
                                            </label>
                                        </div>
                                    </>
                            }


                            <h4>Cantidad de ambientes:</h4>

                            <div className={styles.filtersUnit}>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Mínimo" value={nuevoCantAmbientesMin} onChange={e => setNuevoCantAmbientesMin(isNumber(e))} />
                                </label>
                                <h2>-</h2>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Máximo" value={nuevoCantAmbientesMax} onChange={e => setNuevoCantAmbientesMax(isNumber(e))} />
                                </label>
                            </div>


                            <h4>Cantidad de habitaciones:</h4>

                            <div className={styles.filtersUnit}>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Mínimo" value={nuevoCantHabitacionesMin} onChange={e => setNuevoCantHabitacionesMin(isNumber(e))} />
                                </label>
                                <h2>-</h2>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Máximo" value={nuevoCantHabitacionesMax} onChange={e => setNuevoCantHabitacionesMax(isNumber(e))} />
                                </label>
                            </div>


                            <h4>Cantidad de baños:</h4>

                            <div className={styles.filtersUnit}>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Mínimo" value={nuevoBanosMin} onChange={e => setNuevoBanosMin(isNumber(e))} />
                                </label>
                                <h2>-</h2>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Máximo" value={nuevoBanosMax} onChange={e => setNuevoBanosMax(isNumber(e))} />
                                </label>
                            </div>



                            <h4>Cantidad de cocheras:</h4>

                            <div className={styles.filtersUnit}>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Mínimo" value={nuevoCantCocherasMin} onChange={e => setNuevoCantCocherasMin(isNumber(e))} />
                                </label>
                                <h2>-</h2>
                                <label className={`${styles.custom_fieldFilter} ${styles.two}`}>
                                    <input placeholder="Máximo" value={nuevoCantCocherasMax} onChange={e => setNuevoCantCocherasMax(isNumber(e))} />
                                </label>
                            </div>

                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Filtros