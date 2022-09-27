import React, { useEffect, useState } from 'react'
import styles from '../../styles/CrearPublicacion.module.css'


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails"
}

const SearchBox = ({ selectPosition, setSelectPosition, searchText, setSearchText }) => {


    const [listPlace, setListPlace] = useState([])

    const [ocultar, setOcultar] = useState(false)

    // useEffect(() => {
    //     handleClick()
    // }, [searchText])




    const handleClick = () => {
        const params = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            limit: 5,
            polygon_geojson: 0,
            countrycodes: "AR"
        }
        const queryString = new URLSearchParams(params).toString()
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        }
        console.log(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result))
                setListPlace(JSON.parse(result))
            })
            .catch((err) => console.log("err ", err))
    }

    return (
        <div>
            <div>
                <input style={{ width: "600px" }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button
                    onClick={() => handleClick()}
                >Buscar</button>
            </div>

            {
                listPlace.length > 0 ?
                    (
                        <div>
                            {
                                listPlace.map(p => {
                                    return (
                                        <button key={p?.osm_id} onClick={() => {setSelectPosition(p); setListPlace([])}}>
                                            <img src='/location-sign-azul.png' />
                                            <p>{p?.display_name}</p>
                                        </button>
                                    )
                                })
                            }
                        </div>
                    ) : null
            }


        </div>
    )
}

export default SearchBox