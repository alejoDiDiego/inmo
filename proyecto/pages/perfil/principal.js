import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'

const principal = () => {

    const { usuario } = useContext(FirebaseContext)
    
    const [cargar, setCargar] = useState(false)

    const [url, setUrl] = useState("")

    useEffect(() => {
        const check = async () => {
          await usuario
          if (usuario != null) {
            console.log(usuario.email)
            setUrl(usuario.photoURL)
            console.log(url)
            setCargar(true)
          } else {
            console.log('no esta loggeado')
          }
        }
    
        check()
    
    
      }, [usuario])

    
    


    return (
        <div>
            {
                cargar && 
                <div>
                    <h2>Perfil principal</h2>
                    {usuario.email}
                    {usuario.displayName}
                    <Image width={50} height={50} src={url} />
                    {/* Como cargar imagenes https://stackoverflow.com/questions/51679211/retrieving-user-profile-image-from-firebase-but-it-is-not-displaying-in-imagevie */}
                </div>

            }

        </div>
    )
}

export default principal