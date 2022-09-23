import React, { useEffect, useState } from 'react'
import styles from '../../styles/InformacionBasica.module.css'
import dynamic from "next/dynamic"
import SearchBox from './SearchBox'

const MapNoSSR = dynamic(() => import("./Map"), {
    ssr: false,
});


const InformacionBasica = ({}) => {
    const [selectPosition, setSelectPosition] = useState(null)
    const [searchText, setSearchText] = useState("")

    useEffect(() =>{
        console.log(selectPosition)
        setSearchText(selectPosition != null ? selectPosition.display_name : "")
    }, [selectPosition])





    return (
        <div>
            <h2>Ubicacion</h2>

            <div>
                <div>
                    <div>
                        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className={styles.map}>
                        <MapNoSSR selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InformacionBasica