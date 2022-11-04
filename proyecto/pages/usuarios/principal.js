import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Usuario from '../../components/Usuarios/Usuario'
import Link from 'next/link'
import styles from "../../styles/PublicacionesPrincipal.module.css"
import Filtros from '../../components/Usuarios/Filtros'


const principal = () => {

    const { usuario } = useContext(FirebaseContext)
    const [loading, setLoading] = useState(true)

    const [usuarios, setUsuarios] = useState([])
    const [resultado, setResultado] = useState([])


    const [nombreInclude, setNombreInclude] = useState(false)
    const [provinciaInclude, setProvinciaInclude] = useState(false)
    const [municipioInclude, setMunicipioInclude] = useState(false)
    const [localidadInclude, setLocalidadInclude] = useState(false)
    const [codigoPostalInclude, setCodigoPostalInclude] = useState(false)





    const [nombreFiltro, setNombreFiltro] = useState("")
    const [provinciaFiltro, setProvinciaFiltro] = useState("")
    const [municipioFiltro, setMunicipioFiltro] = useState("")
    const [localidadFiltro, setLocalidadFiltro] = useState("")
    const [codigoPostalFiltro, setCodigoPostalFiltro] = useState("")



    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Usuarios")
        const q = query(colRef)
        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setUsuarios(ps)
        return true
    }



    const router = useRouter()
    const { query: {
        q,
        tipo,
        user
    } } = router



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
        if (usuarios.length == 0) return
        console.log(usuarios)




        if (user != null) {
            // console.log(publicacion)
            // console.log(publicaciones)
            const filtro = usuarios.filter(u => {
                return (u.uid == user)
            })
            if (filtro.length == 0) {
                const query = async () => {
                    try {
                        const docRef = doc(firebase.db, "Usuarios", user)
                        const docSnap = await getDoc(docRef)

                        if (docSnap.data() == undefined) {
                            alert("La publicacion no existe")
                            return
                        }
                        let u = []
                        u.push(docSnap.data())
                        setResultado(u)
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


        if (q == null || q.length == 0) {
            setResultado([])
            return
        }







        const filtro = usuarios.filter(u => {
            const removeAccents = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }   

            return (
                (
                    removeAccents(u.nombreUsuario).toLowerCase().includes(q.toLowerCase()) ||
                    removeAccents(u.provincia).toLowerCase().includes(q.toLowerCase()) ||
                    removeAccents(u.municipio).toLowerCase().includes(q.toLowerCase()) ||
                    removeAccents(u.localidad).toLowerCase().includes(q.toLowerCase()) ||
                    u.codigoPostal.toLowerCase().includes(q.toLowerCase())
                )
                &&
                (
                    "tipo" in router.query == false || tipo.length == 0 ? u.type : u.type.toLowerCase().includes(tipo.toLowerCase())
                )
            )
        })

        setResultado(filtro)
        console.log(filtro)





        // console.log(filtro)

    }, [router, usuarios])




    const handleBuscarPublicaciones = () => {
        Router.push({
            pathname: '/publicaciones/principal',
            query: {
                direccion: "",
                tipoPublicacion: "",
                tipoVivienda: "",
                precioMin: "",
                precioMax: "",
                cantBanosMin: "",
                cantBanosMax: "",
                cantAmbientesMax: "",
                cantAmbientesMin: "",
                cantCocherasMax: "",
                cantCocherasMin: "",
                cantHabitacionesMax: "",
                cantHabitacionesMin: ""
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
                    {
                        "user" in router.query ? null :
                            <>


                                <div className={styles.pubSearch}>
                                    <p onClick={() => handleBuscarPublicaciones()}>Ir a buscar publicaciones</p>
                                </div>
                                <div>
                                    <Filtros />
                                </div>
                            </>
                    }
                    <div>

                        { 
                        resultado.length == 0?
                        (
                            <h2 className={styles.advice}>No se encontraron resultados, complete los campos para buscar usuarios.</h2>
                        ):
                        (
                            <></>
                        )

                        }

                        {
                            resultado.map((u, i) => {
                                return (
                                    <Usuario
                                        u={u}
                                        key={i}
                                    />
                                )
                            })
                        }
                    </div>
                </Layout>
            </>
        )
    }
}

export default principal


