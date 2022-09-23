import React, { useEffect, useState } from 'react'
import styles from '../../styles/InformacionBasica.module.css'
import dynamic from "next/dynamic"
import SearchBox from './SearchBox'

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
    numeroDeCasa,
    setNumeroDeCasa
}) => {
    const [selectPosition, setSelectPosition] = useState(null)
    const [searchText, setSearchText] = useState("")

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
                    setLocalidad(selectPosition.address.city)
                } else if ("town" in selectPosition.address) {
                    setLocalidad(selectPosition.address.town)
                } else if ("quarter" in selectPosition.address) {
                    setLocalidad(selectPosition.address.quarter)
                } else {
                    setLocalidad("")
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
                    setNumeroDeCasa(selectPosition.address.house_number)
                } else {
                    setNumeroDeCasa("")
                }




            } else {
                setProvincia("")
                setMunicipio("")
                setLocalidad("")
                setCodigoPostal("")
                setDireccion("")
                setNumeroDeCasa("")
            }



        }

    }, [selectPosition])




    const isNumber = e => {
        const result = e.target.value.replace(/\D/g, '');
        setNumeroDeCasa(result);
      };





    return (
        <div>
            <div>
                <h2>Ubicacion</h2>

                <div>
                    <div>
                        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className={styles.map}>
                        <MapNoSSR selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
                    </div>
                    <p>ATENCION 1: es posible que no encuentre su direccion. Haga click en el lugar mas exacto de su casa y luego escriba la direccion de esta debajo.</p>
                    <p>ATENCION 2: es posible que no pueda marcar correctamente la direccion haciendo click. En ese caso intente marcar la ubicacion de su casa con la mayor exactitud y escriba la direccion debajo.</p>
                </div>

                <div>
                    <label>Provincia</label>
                    <input value={provincia} onChange={e => setProvincia(e.target.value)} />
                </div>

                <div>
                    <label>Municipio</label>
                    <input value={municipio} onChange={e => setMunicipio(e.target.value)} />
                </div>

                <div>
                    <label>Localidad</label>
                    <input value={localidad} onChange={e => setLocalidad(e.target.value)} />
                </div>

                <div>
                    <label>Codigo Postal</label>
                    <input value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} />
                </div>

                <div>
                    <label>Direccion</label>
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} />
                </div>

                <div>
                    <label>Numero de la vivienda</label>
                    <input value={numeroDeCasa} onChange={e => isNumber(e)} />
                </div>




            </div>
        </div>
    )
}

export default InformacionBasica