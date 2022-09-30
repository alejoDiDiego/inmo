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
            <div className={styles.searchController}>
                <label className={`${styles.custom_field} ${styles.two}`}>
                    <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Escriba una ubicación" />
                </label>
                <div className={styles.searchButton} onClick={() => handleClick()}>
                    <img src='/search2.png'/>
                </div>
            </div>

            {
                listPlace.length > 0 ?
                    (
                        <div className={styles.results}>
                            {
                                listPlace.map(p => {
                                    return (
                                        <div>
                                            <button className={styles.ubiButton} key={p?.osm_id} onClick={() => { setSelectPosition(p); setListPlace([]) }}>
                                                <p>{p?.display_name}</p>
                                            </button>
                                        </div>
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