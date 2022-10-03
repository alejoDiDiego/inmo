import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../../firebase'
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import styles from "../../styles/PublicacionesPrincipal.module.css"
import Filtros from '../../components/Publicaciones/Filtros'

const MapNoSSR = dynamic(() => import("../../components/Publicaciones/Map"), {
    ssr: false,
});


const principal = () => {

    const { usuario } = useContext(FirebaseContext)
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const { query: {
        direccion,
        tipoPublicacion,
        tipoVivienda,
        precioMin,
        precioMax,
        cantBanosMin,
        cantBanosMax,
        cantAmbientesMax,
        cantAmbientesMin,
        cantCocherasMax,
        cantCocherasMin,
        cantHabitacionesMax,
        cantHabitacionesMin
    } } = router
    console.log(direccion)

    const [publicaciones, setPublicaciones] = useState([])
    const [resultado, setResultado] = useState([])

    const [positions, setPositions] = useState([])






    useEffect(() => {

        const check = async () => {
            if (usuario != null) {
                try {
                    queryFirebase()
                    if (Object.keys(usuario).length > 0) {
                        setLoading(false)
                    } else {
                        setLoading(false)
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









    useEffect(() => {

        if (direccion == "" || direccion == null) return
        if (publicaciones.length == 0) return
        console.log(tipoPublicacion)

        const filtro = publicaciones.filter(p => {
            return (
                (
                    p.provincia.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.municipio.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.localidad.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.codigoPostal.includes(busqueda)
                ) 
                &&
                (
                    tipoPublicacion.length == 0 ? p.tipoPublicacion : p.tipoPublicacion.toLowerCase().includes(tipoPublicacion.toLowerCase())
                )
            )
        })
        setResultado(filtro)
        console.log(filtro)

    }, [router, publicaciones])


    useEffect(() => {
        if (resultado.length == 0) {setPositions([]); return}

        const posiciones = resultado.map(p => {
            return ({
                id: p.id,
                latLon: p.latLon
            })
        })
        console.log(posiciones)
        setPositions(posiciones)
    }, [resultado])








    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")
        const querySnapshot = await getDocs(colRef);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        return true
    }
















    if (loading == true) {
        return (
            <>
                <Head>
                    <title>Inmo</title>
                    <meta name="description" content="Generated" />
                    <link rel="icon" href="/Logo_inmo_new.png" />
                </Head>
                <Layout>
                    <p>Cargando</p>
                </Layout>
            </>
        )
    }

    else {
        return (
            <>
                <Head>
                    <title>Inmo</title>
                    <meta name="description" content="Generated" />
                    <link rel="icon" href="/Logo_inmo_new.png" />
                </Head>
                <Layout perfil={true}>
                    <div className={styles.main}>
                        <div className={styles.izquierda}>

                            <div className={styles.filtros}>
                                <Filtros router={router} />
                            </div>

                            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: "1" }}>
                                <MapNoSSR
                                    positions={positions}
                                />
                            </div>

                        </div>

                        <div className={styles.derecha}>

                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

export default principal