import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet' // npm i leaflet react-leaflet
import 'leaflet/dist/leaflet.css'
import L, { latLng } from "leaflet"

const icon = L.icon({
    iconUrl: "/location-sign.png", // <a href="https://www.flaticon.com/free-icons/gps" title="gps icons">Gps icons created by Freepik - Flaticon</a>
    iconSize: [38, 38]
})

const position = [-34.7, -58.5]


const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/reverse?"

function ResetCenterView({ selectPosition, setSelectPosition }) {
    const map = useMap()

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [selectPosition])

}


function HandleClickMap({ setSelectPosition }) {

    const [searchText, setSearchText] = useState("")
    const [listPlace, setListPlace] = useState([])



    const map = useMapEvents({
        click(e) {
            console.log(e.latlng)
            const lat = e.latlng.lat
            const lon = e.latlng.lng

            const params = {
                format: "json",
                lat,
                lon,
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
                    setSelectPosition(JSON.parse(result))
                })
                .catch((err) => console.log("err ", err))
        }
    })



    return null

}

const Map = ({ selectPosition, setSelectPosition }) => {

    const locationSelection = [selectPosition?.lat, selectPosition?.lon]

    return (
        <MapContainer center={position} zoom={10} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                selectPosition &&
                (
                    <Marker position={locationSelection} icon={icon}>
                        <Popup>
                            sarpao
                        </Popup>
                    </Marker>
                )
            }

            <ResetCenterView selectPosition={selectPosition} />
            <HandleClickMap setSelectPosition={setSelectPosition} />

        </MapContainer>
    )
}

export default Map