import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../../firebase'
import { doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import styles from "../../styles/PublicacionesPrincipal.module.css"
import Filtros from '../../components/Publicaciones/Filtros'
import Publicacion from '../../components/Publicaciones/Publicacion'
import Link from 'next/link'


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
        cantHabitacionesMin,
        publicacion
    } } = router
    // console.log(direccion)

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
                    // console.log(err)
                    // console.log("a chekear")
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
                // console.log("probando")
            }, 200)

        }



    }, [usuario])









    useEffect(() => {
        if (publicaciones.length == 0) return

        if (publicacion != null) {
            
            // console.log(publicacion)
            // console.log(publicaciones)
            const filtro = publicaciones.filter(p => {
                return (p.id == publicacion)
            })
            if (filtro.length == 0) {
                const query = async () => {
                    try {
                        const docRef = doc(firebase.db, "Publicaciones", publicacion)
                        const docSnap = await getDoc(docRef)

                        if (docSnap.data() == undefined) {
                            alert("La publicacion no existe")
                            return
                        }
                        let p = []
                        p.push(docSnap.data())
                        setResultado(p)
                        // console.log("No estaba en la lista")
                        return

                    } catch (err) { console.log(err) }
                }

                query()
                return

            }
            setResultado(filtro)
            return
        }



        if (direccion == "" || direccion == null) {
            setResultado([])
            return
        }

        // console.log(precioMin)


        const filtro = publicaciones.filter(p => {

            return (
                (
                    p.provincia.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.municipio.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.localidad.toLowerCase().includes(direccion.toLowerCase()) ||
                    p.codigoPostal.includes(direccion.toLowerCase())
                )
                &&
                (
                    tipoPublicacion.length == 0 ? p.tipoPublicacion : p.tipoPublicacion.toLowerCase().includes(tipoPublicacion.toLowerCase())
                )
                &&
                (
                    tipoVivienda.length == 0 ? p.tipoVivienda : p.tipoVivienda.toLowerCase().includes(tipoVivienda.toLowerCase())
                )
                &&
                (
                    precioMax.length > 0 && precioMin.length > 0 ?
                        p.precio >= precioMin && p.precio <= precioMax
                        :
                        (
                            precioMax.length == 0 ? true : p.precio <= precioMax
                        ) &&
                        (
                            precioMin.length == 0 ? true : p.precio >= precioMin
                        )
                )
                &&
                (
                    cantBanosMax.length > 0 && cantBanosMin.length > 0 ?
                        p.cantBanos >= cantBanosMin && p.cantBanos <= cantBanosMax
                        :
                        (
                            cantBanosMax.length == 0 ? true : p.cantBanos <= cantBanosMax
                        ) &&
                        (
                            cantBanosMin.length == 0 ? true : p.cantBanos >= cantBanosMin
                        )
                )
                &&
                (
                    cantAmbientesMax.length > 0 && cantAmbientesMin.length > 0 ?
                        p.cantAmbientes >= cantAmbientesMin && p.cantAmbientes <= cantAmbientesMax
                        :
                        (
                            cantAmbientesMax.length == 0 ? true : p.cantAmbientes <= cantAmbientesMax
                        ) &&
                        (
                            cantAmbientesMin.length == 0 ? true : p.cantAmbientes >= cantAmbientesMin
                        )
                )
                &&
                (
                    cantCocherasMax.length > 0 && cantCocherasMin.length > 0 ?
                        p.cantCocheras >= cantCocherasMin && p.cantCocheras <= cantCocherasMax
                        :
                        (
                            cantCocherasMax.length == 0 ? true : p.cantCocheras <= cantCocherasMax
                        ) &&
                        (
                            cantCocherasMin.length == 0 ? true : p.cantCocheras >= cantCocherasMin
                        )
                )
                &&
                (
                    cantHabitacionesMax.length > 0 && cantHabitacionesMin.length > 0 ?
                        p.cantHabitaciones >= cantHabitacionesMin && p.cantHabitaciones <= cantHabitacionesMax
                        :
                        (
                            cantHabitacionesMax.length == 0 ? true : p.cantHabitaciones <= cantHabitacionesMax
                        ) &&
                        (
                            cantHabitacionesMin.length == 0 ? true : p.cantHabitaciones >= cantHabitacionesMin
                        )
                )






            )
        })
        setResultado(filtro)
        // console.log(filtro)

    }, [router, publicaciones])


    useEffect(() => {
        if (resultado.length == 0) { setPositions([]); return }

        const posiciones = resultado.map(p => {
            return ({
                id: p.id,
                latLon: p.latLon
            })
        })
        // console.log(posiciones)
        setPositions(posiciones)
    }, [resultado])








    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")
        const q = query(colRef, limit(5))
        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        console.log("queryf")
        return true
    }




    const handleBuscarUsuarios = () => {
        Router.push({
            pathname: '/usuarios/principal',
            query: {
                q: "",
                tipo: ""
            }
        })
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
                                <button onClick={() => handleBuscarUsuarios()}>Buscar usuarios</button>
                            </div>

                            <div style={{ width: "100%", height: "100%", position: "relative", zIndex: "1" }}>
                                <MapNoSSR
                                    positions={positions}
                                />
                            </div>

                        </div>

                        <div className={styles.derecha}>
                            {
                                resultado.length == 0 ?
                                    <h2>No se han encontrado resultados, escriba una provincia, municipio, localidad o codigo postal</h2>

                                    :

                                    (
                                        resultado.map((p, i) => {
                                            console.log(p.id)
                                            return (
                                                <Publicacion
                                                    publicacion={p}
                                                    key={i}
                                                />
                                            )
                                        })
                                    )
                            }

                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

export default principal