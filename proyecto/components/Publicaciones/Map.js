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

// function ResetCenterView({ selectPosition, setSelectPosition }) {
//     const map = useMap()

//     useEffect(() => {
//         if (selectPosition) {
//             map.setView(
//                 L.latLng(selectPosition?.lat, selectPosition?.lon),
//                 map.getZoom(),
//                 {
//                     animate: true
//                 }
//             )
//         }
//     }, [selectPosition])

// }


const Map = ({ positions }) => {


    return (

        <MapContainer center={position} zoom={10} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                positions.map(p => {
                    const { id, latLon } = p
                    console.log(id)
                    console.log(latLon)

                    return (
                        <Marker position={latLon} icon={icon}>

                        </Marker>
                    )
                })
            }



            {/* {
                selectPosition &&
                (
                    <Marker position={locationSelection} icon={icon}>
                        <Popup>
                            sarpao
                        </Popup>
                    </Marker>
                )
            } */}

            {/* <ResetCenterView selectPosition={selectPosition} /> */}

        </MapContainer>


    )
}

export default Map