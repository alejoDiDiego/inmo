import React, { useEffect, useState } from 'react'
import styles from '../../styles/InformacionBasica.module.css'
import dynamic from "next/dynamic"
import SearchBox from './SearchBox'

const MapNoSSR = dynamic(() => import("./Map"), {
    ssr: false,
});


const InformacionBasica = ({
    provincia,
    setProvincia
 }) => {
    const [selectPosition, setSelectPosition] = useState(null)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        console.log(selectPosition)
        if(selectPosition != null){
            setSearchText(selectPosition.display_name)
            setProvincia(selectPosition.address.state)
        }
        
    }, [selectPosition])





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
                </div>

                <div>
                    <label>Provincia</label>
                    <input value={provincia} onChange={e => setProvincia(e.target.value)} />
                </div>


            </div>
        </div>
    )
}

export default InformacionBasica