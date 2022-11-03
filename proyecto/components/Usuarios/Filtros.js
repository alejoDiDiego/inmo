import Router from 'next/router'
import React, { useState } from 'react'
import Select from 'react-select'
import styles from "../../styles/Usuario.module.css"


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
        if (busqueda.length == 0) {
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
                q: "",
                tipo: ""
            }
        })
    }







    return (
        <div className={styles.controls}>
            <label className={`${styles.custom_field} ${styles.two}`}>
                <input placeholder="Nombre, Provincia, Municipio, Localidad, Codigo Postal" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            </label>
            <div className={styles.searchControl}>
                <div onClick={() => handleBuscar()} className={styles.div_img}>
                    <img className={styles.div_img2} src='/lupa3.png' layout='fill' />
                </div>
                <div onClick={() => handleReiniciar()} className={styles.div_img}>
                    <img className={styles.div_img3} src='/crossed.png' layout='fill' />
                </div>
            </div>
            <Select options={tipoCuentaOptions} onChange={handleSelectTipoCuenta} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de publicacion"} defaultValue={tipoCuenta == "" ? { value: null, label: "Tipo de propiedad" } : { value: tipoCuenta, label: titleCase(tipoCuenta) }}></Select>
        </div>
    )
}

export default Filtros