import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet' // npm i leaflet react-leaflet
import 'leaflet/dist/leaflet.css'
import L, { latLng } from "leaflet"
import Router, { useRouter } from 'next/router'

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


function CenterSelect({ positions }) {
    const map = useMap()
    const router = useRouter()




    useEffect(() => {
        if ("publicacion" in router.query) {
            const filter = positions.filter(p => {
                return (
                    p.id == router.query.publicacion
                )
            })
            if(filter.length == 0){
                return
            }

            map.setView(
                [filter[0].latLon.lat, filter[0].latLon.lon],
                20,
                {
                    animate: true
                }
            )
            return
        } else{
            map.setView(
                position,
                10,
                {
                    animate: true
                }
            )
        }
    }, [router])
}

const Map = ({ positions }) => {

    const [zoom, setZoom] = useState(10)
    const [selected, setSelected] = useState({})

    const router = useRouter()







    const handleClick = (p) => {
        setSelected(p)
        Router.push({
            pathname: '/publicaciones/principal',
            query: {
                publicacion: p.id
            }
        })
    }






    return (

        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                positions.map((p, id) => {
                    const { id, latLon } = p


                    return (
                        <>
                            <Marker key={id} eventHandlers={{
                                click: (e) => { handleClick(p) }
                            }} position={latLon} icon={icon}>
                                <div onClick={() => console.log("click")}>hola</div>
                            </Marker>

                        </>

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
            <CenterSelect positions={positions} />
        </MapContainer >


    )
}

export default Map