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
        const check = async () => {
            if(usuario){
                await usuario
                const ls = JSON.parse(localStorage.getItem("fotosUsuario"))
                console.log(usuario)
                console.log(ls)
                if (usuario != null && ls != null) {
    
                    setPerfilFoto(ls.urlPerfil)
                    setFondoFoto(ls.urlFondo)
                    setError(false)
                    setCargar(true)
    
                    //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil
    
                } else {
                    console.log("error")
                    setError(true)
                }
            } else{
                setTimeout(() => {
                    setError(true)
                }, 3000)
                // agregar spinner
            }
        }


        check()



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
                <div>
                    Error {/*  Insertar Spinner */}
                </div>

            }

        </div>
    )
}

export default principal