import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'



const principal = () => {

    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(false)
    const [error, setError] = useState(false)

    const [perfilFoto, setPerfilFoto] = useState("")
    const [fondoFoto, setFondoFoto] = useState("")

    const router = useRouter()





    useEffect(() => {
        if (usuario != null) {
            console.log(usuario)
            if(Object.keys(usuario.fotos).length < 1) {
                setError(true)
                return
            }
            usuario.fotos.then((fot) => {
                console.log(fot.urlPerfil)
                setPerfilFoto(fot.urlPerfil)
                setFondoFoto(fot.urlFondo)
                setError(false)
                setCargar(true)
            }).catch((err) => {
                setError(true)
                console.log(err)
            })
        }



    }, [usuario])





    return (
        <div>
            {
                cargar ?
                    <div>
                        <h2>Perfil principal</h2>
                        {usuario.email}
                        {usuario.displayName}
                        <Image width={50} height={50} src={perfilFoto} />
                        <Image width={100} height={50} src={fondoFoto} />
                        <Link href="/perfil/configuracion">Configuracion</Link>
                        {/* Como cargar imagenes https://stackoverflow.com/questions/51679211/retrieving-user-profile-image-from-firebase-but-it-is-not-displaying-in-imagevie */}
                    </div> : error &&
                    <p>error</p>

            }

        </div>
    )
}

export default principal