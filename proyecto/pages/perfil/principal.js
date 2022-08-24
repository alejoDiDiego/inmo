import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'




const principal = () => {

    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(true)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(null)

    const [perfilFoto, setPerfilFoto] = useState("")
    const [fondoFoto, setFondoFoto] = useState("")

    const router = useRouter()





    useEffect(() => {
        const check = async () => {
            if (usuario != null) {
                console.log(usuario)
                let documento = await usuario.document
                await documento
                setCargar(false)
                setInfo({ usuario: usuario.usuario, documento })
            }
        }

        check()



    }, [usuario])



    if (cargar == true) {
        return (
            <Layout>
                <p>cargando</p>
            </Layout>

        )
    } else {
        return (
            <Layout usuario={usuario}>
                <div>
                    {
                        info != null ?
                            <div>
                                <p>{info.documento.mail}</p>
                                <p>{info.documento.nombreUsuario}</p>
                                <p>{info.documento.type}</p>
                                <img src={info.documento.fotoPerfilURL} />
                                <img src={info.documento.fotoFondoURL} />
                            </div>
                            : null

                    }

                </div>
            </Layout>

        )
    }


}

export default principal