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
    const { query: { q } } = router

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

        if (q == "" || q == null) return
        if (publicaciones.length == 0) return

        const busqueda = q.toLowerCase()
        const filtro = publicaciones.filter(p => {
            if(p.provincia.toLowerCase().includes(busqueda)){
                console.log("provincia true")
            }
            if(p.municipio.toLowerCase().includes(busqueda)){
                console.log("municipio true")
            }
            if(p.localidad.toLowerCase().includes(busqueda)){
                console.log("localidad true")
            }
            return (
                p.provincia.toLowerCase().includes(busqueda) ||
                p.municipio.toLowerCase().includes(busqueda) ||
                p.localidad.toLowerCase().includes(busqueda)
            )
        })
        setResultado(filtro)
        console.log(filtro)

    }, [q, publicaciones])


    useEffect(() => {
        if (resultado.length == 0) return

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
                                <Filtros />
                            </div>

                            <div style={{width: "100%", height: "100%", position: "relative", zIndex: "1"}}>
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