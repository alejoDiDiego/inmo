import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../../firebase'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import styles from '../../styles/CrearPublicacion.module.css'
import InformacionBasica from '../../components/CrearPublicacionPrincipal/InformacionBasica'
import Descripcion from '../../components/CrearPublicacionPrincipal/Descripcion'
import SubirImagenes from '../../components/CrearPublicacionPrincipal/SubirImagenes'


const principal = () => {


  const { usuario } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)

  const [provincia, setProvincia] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [direccion, setDireccion] = useState("")
  const [codigoPostal, setCodigoPostal] = useState("")
  const [altura, setAltura] = useState("")
  const [pisoDepto, setPisoDepto] = useState("")
  const [latLon, setLatLon] = useState({})

  const [tipoVivienda, setTipoVivienda] = useState("")

  const [cantAmbientes, setCantAmbientes] = useState("")
  const [cantBanos, setCantBanos] = useState("")
  const [cantHabitaciones, setCantHabitaciones] = useState("")
  const [cantCocheras, setCantCocheras] = useState("")

  const [tipoPublicacion, setTipoPublicacion] = useState("")
  const [precio, setPrecio] = useState("")
  const [expensas, setExpensas] = useState("")



  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")



  const [imagenes, setImagenes] = useState([])




  useEffect(() => {

    const check = async () => {
      if (usuario != null) {
        try {
          if (Object.keys(usuario).length > 0) {
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




  if (loading) {
    return (
      <div>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout perfil={true}>
          <p>cargando</p>
        </Layout>
      </div>
    )
  }


  else {
    return (
      <div>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout perfil={true}>
          <div className={styles.main}>
            <div className={styles.izquierda}>

            </div>


            <div className={styles.derecha}>
              <InformacionBasica
                provincia={provincia}
                setProvincia={setProvincia}
                municipio={municipio}
                setMunicipio={setMunicipio}
                localidad={localidad}
                setLocalidad={setLocalidad}
                direccion={direccion}
                setDireccion={setDireccion}
                codigoPostal={codigoPostal}
                setCodigoPostal={setCodigoPostal}
                altura={altura}
                setAltura={setAltura}
                latLon={latLon}
                setLatLon={setLatLon}
                pisoDepto={pisoDepto}
                setPisoDepto={setPisoDepto}
                setTipoVivienda={setTipoVivienda}
                cantAmbientes={cantAmbientes}
                setCantAmbientes={setCantAmbientes}
                cantBanos={cantBanos}
                setCantBanos={setCantBanos}
                cantHabitaciones={cantHabitaciones}
                setCantHabitaciones={setCantHabitaciones}
                cantCocheras={cantCocheras}
                setCantCocheras={setCantCocheras}
                setTipoPublicacion={setTipoPublicacion}
                precio={precio}
                setPrecio={setPrecio}
                expensas={expensas}
                setExpensas={setExpensas}
              />

              <Descripcion
                titulo={titulo}
                setTitulo={setTitulo}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
              />

              <SubirImagenes
                imagenes={imagenes}
                setImagenes={setImagenes}
              />

            </div>






          </div>

        </Layout>
      </div>
    )
  }


}

export default principal