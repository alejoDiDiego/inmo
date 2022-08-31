import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import Layout from '../../components/layout/Layout'

const configuracion = () => {


    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(false)
    const [error, setError] = useState(false)

    const [info, setInfo] = useState(null)

    const [nuevoNombre, setNuevoNombre] = useState("")

    const router = useRouter()



    useEffect(() => {

        const check = async () => {
            if (usuario != null) {
                try {
                    if(Object.keys(usuario).length > 0){
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
        while (prueba == false) {
            setInterval(() => {
                prueba = check()
                console.log("probando")
            }, 200)

        }



    }, [usuario])


    if (cargar == true) {
        <Layout>
            <div>
                <p>cargando</p>
            </div>
        </Layout>
    } else {
        return (
            <Layout>
                {
                    info != null ?
                        (
                            <div>
                                <div>
                                    <label>Nombre actual : {info.nombreUsuario}</label>
                                    <input value={nuevoNombre} placeholder="Nuevo nombre" onChange={e => setNuevoNombre(e.target.value)} type="text" />
                                </div>

                            </div>
                        ) :
                        (
                            <p>cargando</p>
                        )
                }

            </Layout>
        )
    }



}

export default configuracion