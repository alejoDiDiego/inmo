import React, { useState } from 'react'


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"
const params = {
    q: "",
    format: "json",
    addressdetails : "addressdetails"
}

const SearchBox = ({selectPosition, setSelectPosition}) => {

    const [searchText, setSearchText] = useState("")
    const [listPlace, setListPlace] = useState([])

    


    const handleClick = () => {
        const params = {
            q: searchText,
            format: "json",
            addressdetails : 1,
            polygon_geojson: 0
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

    console.log(selectPosition)

    return (
        <div>
            <div>
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button
                    onClick={() => handleClick()}
                >Buscar</button>
            </div>

            <div>
                {
                    listPlace.map(p => {
                        return (
                            <button key={p?.osm_id} onClick={() => setSelectPosition(p)}>
                                <img src='/location-sign-azul.png' />
                                <p>{p?.display_name}</p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchBox