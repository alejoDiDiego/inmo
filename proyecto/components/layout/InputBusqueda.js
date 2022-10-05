import Image from 'next/image'
import Router from 'next/router'
import React, { useState } from 'react'
import styles from "../../styles/InputBusqueda.module.css"
import Select from 'react-select'

const InputBusqueda = () => {

    const [busqueda, setBusqueda] = useState("")

    const [tipoBusqueda, setTipoBusqueda] = useState("publicacion")





    const tipoBusquedaOptions =
        [{ value: "publicacion", label: "Publicacion" },
        { value: "usuario", label: "Usuario" }]



    const handleBuscar = () => {
        if (busqueda.trim() === "") return

        if (tipoBusqueda == "publicacion") {
            Router.push({
                pathname: '/publicaciones/principal',
                query: {
                    direccion: busqueda,
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

        if (tipoBusqueda == "usuario") {
            Router.push({
                pathname: '/usuarios/principal',
                query: {
                    provincia: "",
                    municipio: ""
                    
                }
            })
        }

    }




    const handleSelectTipoBusqueda = (event) => {
        setBusqueda("")
        if (event == null) {
            setTipoBusqueda("publicacion")
        }
        else {
            const value = event.value
            setTipoBusqueda(value)
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
            <Select className={styles.selectContainer} options={tipoBusquedaOptions} onChange={handleSelectTipoBusqueda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de vivienda"} defaultValue={{ value: "publicacion", label: titleCase("Publicacion") }}></Select>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.input} placeholder={tipoBusqueda == "publicacion" ? 'Provincia, Municipio, Localidad, Codigo Postal' : "Nombre"} />
            <div onClick={() => handleBuscar()} className={styles.div_img}>
                <Image src='/search2.png' layout='fill' />
            </div>

        </div>
    )
}

export default InputBusqueda