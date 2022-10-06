import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Usuario from '../../components/Usuarios/Usuario'
import Link from 'next/link'


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
        const q = query(colRef, limit(5))
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
        nombre,
        provincia,
        municipio,
        localidad,
        codigoPostal
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

        if(q == null || q.length == 0){
            setResultado([])
            return
        }



        // console.log(precioMin)


        const filtro = usuarios.filter(u => {
            return (
                u.nombreUsuario.toLowerCase().includes(q.toLowerCase()) ||
                u.provincia.toLowerCase().includes(q.toLowerCase()) ||
                u.municipio.toLowerCase().includes(q.toLowerCase()) ||
                u.localidad.toLowerCase().includes(q.toLowerCase()) ||
                u.codigoPostal.toLowerCase().includes(q.toLowerCase())
            )
        })

        setResultado(filtro)
        console.log(filtro)





        // console.log(filtro)

    }, [router, usuarios])






















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
                    <div>
                        <Link href="/publicaciones/principal">
                            <button>Buscar Publicaciones</button>
                        </Link>
                    </div>
                    <div>
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