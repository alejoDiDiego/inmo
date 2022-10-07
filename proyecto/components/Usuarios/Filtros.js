import Router from 'next/router'
import React, { useState } from 'react'
import Select from 'react-select'


const Filtros = () => {

    const [busqueda, setBusqueda] = useState("")
    const [tipoCuenta, setTipoCuenta] = useState("")


    const tipoCuentaOptions =
        [
            { value: "", label: "Filtro Vacio" },
            { value: "empresa", label: "Empresa" },
            { value: "particular", label: "Particular" }]



    const handleSelectTipoCuenta = (event) => {
        console.log(event.value)
        setTipoCuenta("")
        if (event == null) {
            setTipoCuenta("")
        }
        else {
            const value = event.value
            setTipoCuenta(value)
        }
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }



    
    const handleBuscar = () => {
        if(busqueda.length == 0){
            return
        }

        Router.push({
            pathname: '/usuarios/principal',
            query: {
                q: busqueda,
                tipo: tipoCuenta
            }
        })
    }

    const handleReiniciar = () => {
        Router.push({
            pathname: '/usuarios/principal',
            query: {
                q: busqueda,
                tipo: tipoCuenta
            }
        })
    }







    return (
        <div>
            <input placeholder="Nombre, Provincia, Municipio, Localidad, Codigo Postal" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
            <Select options={tipoCuentaOptions} onChange={handleSelectTipoCuenta} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} value={{ value: tipoCuenta, label: titleCase(tipoCuenta) }}></Select>
            <button onClick={() => handleBuscar()}>Filtrar</button>
            <button onClick={() => handleReiniciar()}>Limpiar Filtros</button>
        </div>
    )
}

export default Filtros