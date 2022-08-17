import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'




const principal = () => {

    const { usuario } = useContext(FirebaseContext)
    
    const [cargar, setCargar] = useState(false)

    const [perfilFoto, setPerfilFoto] = useState("")
    const [fondoFoto, setFondoFoto] = useState("")



    useEffect(() => {
        const check = async () => {
          await usuario
          if (usuario != null) {
            const perfilRef = ref(firebase.storage, `usuarios/${usuario.email}/perfil`)
            const fondoRef = ref(firebase.storage, `usuarios/${usuario.email}/fondo`)
            const urlPerfil = ""
            const urlFondo = ""
            if(perfilRef == null){
                perfilRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
            }
            urlPerfil = await getDownloadURL(perfilRef)
            setPerfilFoto(urlPerfil)

            if(fondoRef == null){
                fondoRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
            }
            urlFondo = await getDownloadURL(fondoRef)
            setFondoFoto(urlFondo)

            setCargar(true)
            
            //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil


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
                    <Image width={50} height={50} src={perfilFoto} />
                    <Image width={100} height={50} src={fondoFoto} />
                    {/* Como cargar imagenes https://stackoverflow.com/questions/51679211/retrieving-user-profile-image-from-firebase-but-it-is-not-displaying-in-imagevie */}
                </div>

            }

        </div>
    )
}

export default principal