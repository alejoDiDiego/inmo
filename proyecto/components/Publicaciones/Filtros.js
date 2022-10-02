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
        [{ value: "casa", label: "Casa" },
        { value: "departamento", label: "Departamento" }]

    const tipoPublicacionOptions =
        [{ value: "venta", label: "Venta" },
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



    return (
        <div>
            <div>
                <input value={nuevaDireccion} onChange={e => setNuevaDireccion(e.target.value)} placeholder='Provincia, Municipio, Localidad, Codigo Postal' />
                <Select options={tipoViviendaOptions} onChange={handleSelectTipoVivienda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de vivienda"} value={{ value: nuevoTipoVivienda, label: titleCase(nuevoTipoVivienda) }}></Select>
                <Select options={tipoPublicacionOptions} onChange={handleSelectTipoPublicacion} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} value={{ value: nuevoTipoPublicacion, label: titleCase(nuevoTipoPublicacion) }}></Select>
                <input value={nuevoPrecioMin} onChange={e => setNuevoPrecioMin(e.target.value)} />
                <input value={nuevoPrecioMax} onChange={e => setNuevoPrecioMax(e.target.value)} />
                <input value={nuevoBanosMin} onChange={e => setNuevoBanosMin(e.target.value)} />
                <input value={nuevoBanosMax} onChange={e => setNuevoBanosMax(e.target.value)} />
                <input value={nuevoCantAmbientesMin} onChange={e => setNuevoCantAmbientesMin(e.target.value)} />
                <input value={nuevoCantAmbientesMax} onChange={e => setNuevoCantAmbientesMax(e.target.value)} />
                <input value={nuevoCantCocherasMin} onChange={e => setNuevoCantCocherasMin(e.target.value)} />
                <input value={nuevoCantCocherasMax} onChange={e => setNuevoCantCocherasMax(e.target.value)} />
                <input value={nuevoCantHabitacionesMin} onChange={e => setNuevoCantHabitacionesMin(e.target.value)} />
                <input value={nuevoCantHabitacionesMax} onChange={e => setNuevoCantHabitacionesMax(e.target.value)} />
            </div>

            <button onClick={() => handleBuscar()}>Buscar</button>
        </div>
    )
}

export default Filtros