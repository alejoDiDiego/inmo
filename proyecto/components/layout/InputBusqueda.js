import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/InputBusqueda.module.css"
import Select from 'react-select'

const InputBusqueda = () => {

    const [busqueda, setBusqueda] = useState("")

    const [tipoBusqueda, setTipoBusqueda] = useState("publicacion")
    const [barraHabilitada, setBarraHabilitada] = useState(true)

    const router = useRouter()




    const tipoBusquedaOptions =
        [{ value: "publicacion", label: "Publicación" },
        { value: "usuario", label: "Usuario" }]


        const customSelectStyles = {
            control: (provided, state) => ({
                ...provided,
                
                backgroundColor: 'none',
                border: state.IsOpen? 'none': 'none',
              }),

            indicatorSeparator: (provided, state) => ({
                ...provided,
                backgroundColor: 'white',
            }),

            indicatorsContainer: (provided, state) => ({
                ...provided,
                color: 'none',
            }),

            singleValue: (provided, state) => ({
                ...provided,
                color: 'white',
            }),
          }


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
                // query: {
                //     q: busqueda,
                //     nombre: "",
                //     provincia: "",
                //     municipio: "",
                //     localidad: "",
                //     codigoPostal: ""

                // }
                query: {
                    q: busqueda,
                    tipo: ""

                }
            })
        }

    }



    useEffect(() => {
        if (router.pathname.includes("publicaciones") || router.pathname.includes("usuarios")) {
            setBarraHabilitada(false)
            return
        }
        setBarraHabilitada(true)

    }, [router])



    const handleSelectTipoBusqueda = (event) => {
        console.log(event.value)
        setBusqueda("")
        if (event == null) {
            setTipoBusqueda("publicación")
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





    if (barraHabilitada == true) {
        return (
            <div className={styles.main}>
                {
                    tipoBusqueda == "" ? null :
                        <>
                            <div className={styles.selectContainer}>
                                <Select styles={customSelectStyles} options={tipoBusquedaOptions} onChange={handleSelectTipoBusqueda} isClearable={false} isSearchable={false} placeholder={"Seleccione un tipo de busqueda"} defaultValue={{ value: router.pathname.includes("usuarios") ? 'usuario' : "publicación", label: titleCase(router.pathname.includes("usuarios") ? 'usuario' : "publicación") }}></Select>
                            </div>

                            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.input} placeholder={tipoBusqueda == "publicacion" ? 'Provincia, Municipio, Localidad, Código Postal' : "Nombre, Provincia, Municipio, Localidad, Código Postal"} />
                            <div onClick={() => handleBuscar()} className={styles.div_img}>
                                <Image src='/search2.png' layout='fill' />
                            </div>
                        </>
                }

            </div>
        )
    }
}

export default InputBusqueda