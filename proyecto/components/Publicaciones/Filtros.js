import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Select from 'react-select'

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
        cantHabitacionesMin
    } } = router


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
            { value: "", label: "Filtro vacio" },
            { value: "casa", label: "Casa" },
            { value: "departamento", label: "Departamento" }]

    const tipoPublicacionOptions =
        [
            { value: "", label: "Filtro vacio" },
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
        setNuevaDireccion(direccion)
        setNuevoTipoPublicacion(tipoPublicacion)
        setNuevoTipoVivienda(tipoVivienda)
        setNuevoPrecioMin(precioMin)
        setNuevoPrecioMax(precioMax)
        setNuevoBanosMin(cantBanosMin)
        setNuevoBanosMax(cantBanosMax)
        setNuevoCantAmbientesMin(cantAmbientesMax)
        setNuevoCantAmbientesMax(cantAmbientesMin)
        setNuevoCantCocherasMin(cantCocherasMax)
        setNuevoCantCocherasMax(cantCocherasMin)
        setNuevoCantHabitacionesMin(cantHabitacionesMax)
        setNuevoCantHabitacionesMax(cantHabitacionesMin)
    }, [router])





    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }








    const handleBuscar = () => {
        if (nuevaDireccion.trim() === "") return

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
                cantAmbientesMax: nuevoCantAmbientesMin,
                cantAmbientesMin: nuevoCantAmbientesMax,
                cantCocherasMax: nuevoCantCocherasMin,
                cantCocherasMin: nuevoCantCocherasMax,
                cantHabitacionesMax: nuevoCantHabitacionesMin,
                cantHabitacionesMin: nuevoCantHabitacionesMax
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
                <input value={nuevaDireccion} onChange={e => setNuevaDireccion(e.target.value)} placeholder='Provincia, Municipio, Localidad, Codigo Postal' />
                <Select options={tipoViviendaOptions} onChange={handleSelectTipoVivienda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de vivienda"} value={{ value: nuevoTipoVivienda, label: titleCase(nuevoTipoVivienda) }}></Select>
                <Select options={tipoPublicacionOptions} onChange={handleSelectTipoPublicacion} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} value={{ value: nuevoTipoPublicacion, label: titleCase(nuevoTipoPublicacion) }}></Select>
                {
                    nuevoTipoPublicacion.length == 0 ?
                        <>
                            <input placeholder="Seleccione un tipo de vivienda" readOnly={true} />
                            <input placeholder="Seleccione un tipo de vivienda" readOnly={true} />
                        </>
                        :
                        <>
                            <input placeholder={`nuevoPrecioMin ${nuevoTipoPublicacion == "alquiler" ? "$ARS" : "$USD"}`} value={nuevoPrecioMin} onChange={e => setNuevoPrecioMin(isNumber(e))} />
                            <input placeholder={`nuevoPrecioMax ${nuevoTipoPublicacion == "alquiler" ? "$ARS" : "$USD"}`} value={nuevoPrecioMax} onChange={e => setNuevoPrecioMax(isNumber(e))} />
                        </>
                }
                <input placeholder="nuevoBanosMin" value={nuevoBanosMin} onChange={e => setNuevoBanosMin(isNumber(e))} />
                <input placeholder="nuevoBanosMax" value={nuevoBanosMax} onChange={e => setNuevoBanosMax(isNumber(e))} />
                <input placeholder="nuevoCantAmbientesMin" value={nuevoCantAmbientesMin} onChange={e => setNuevoCantAmbientesMin(e.target.value)} />
                <input placeholder="nuevoCantAmbientesMax" value={nuevoCantAmbientesMax} onChange={e => setNuevoCantAmbientesMax(e.target.value)} />
                <input placeholder="nuevoCantCocherasMin" value={nuevoCantCocherasMin} onChange={e => setNuevoCantCocherasMin(e.target.value)} />
                <input placeholder="nuevoCantCocherasMax" value={nuevoCantCocherasMax} onChange={e => setNuevoCantCocherasMax(e.target.value)} />
                <input placeholder="nuevoCantHabitacionesMin" value={nuevoCantHabitacionesMin} onChange={e => setNuevoCantHabitacionesMin(e.target.value)} />
                <input placeholder="nuevoCantHabitacionesMax" value={nuevoCantHabitacionesMax} onChange={e => setNuevoCantHabitacionesMax(e.target.value)} />
            </div>

            <button onClick={() => handleBuscar()}>Aplicar</button>
        </div>
    )
}

export default Filtros