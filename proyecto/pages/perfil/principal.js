import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { doc, getDoc } from 'firebase/firestore'




const principal = () => {

    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(true)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(null)


    const router = useRouter()





    useEffect(() => {

        const check = async () => {
            if (usuario != null) {
                try {
                    if (Object.keys(usuario).length > 0) {
                        const docRef = doc(firebase.db, "Usuarios", usuario.uid)
                        const docSnap = await getDoc(docRef)
                        setCargar(false)
                        setInfo(docSnap.data())
                    }
                    return true

                } catch (err) {
                    console.log(err)
                    console.log("a chekear")
                    setTimeout(() => {
                        check()
                        return
                    }, 2000)
                }
            } else {
                return false
            }
        }

        //Op

        let prueba = check()
        while(prueba == false) {
          setInterval(() => {
            prueba = check()
            console.log("probando")
          }, 200)
          
        }



    }, [usuario])


    useEffect(() => {
        console.log(info)
    }, [info])





    if (cargar == true) {
        return (
            <Layout>
                <p>cargando</p>
            </Layout>

        )
    } else {
        return (
            <Layout>
                <div>
                    {
                        info != null ?
                            <div>
                                <p>{info.mail}</p>
                                <p>{info.nombreUsuario}</p>
                                <p>{info.type}</p>
                                <img src={info.fotoPerfilURL} />
                                <img src={info.fotoFondoURL} />
                                <Link href="/perfil/configuracion">
                                    <button>Configurar perfil</button>
                                </Link>
                            </div>
                            : null

                    }

                </div>
            </Layout>

        )
    }


}

export default principal