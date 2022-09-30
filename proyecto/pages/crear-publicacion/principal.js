import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase, { FirebaseContext } from '../../firebase'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import styles from '../../styles/CrearPublicacion.module.css'
import InformacionBasica from '../../components/CrearPublicacionPrincipal/InformacionBasica'
import SubirImagenes from '../../components/CrearPublicacionPrincipal/SubirImagenes'
import FinalizarPublicacion from '../../components/CrearPublicacionPrincipal/FinalizarPublicacion'



const principal = () => {


  const { usuario } = useContext(FirebaseContext)
  const [loading, setLoading] = useState(true)

  const [selectPosition, setSelectPosition] = useState(null)

  const [provincia, setProvincia] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [localidad, setLocalidad] = useState("")
  const [direccion, setDireccion] = useState("")
  const [codigoPostal, setCodigoPostal] = useState("")
  const [altura, setAltura] = useState("")

  const [latLon, setLatLon] = useState({})

  const [tipoVivienda, setTipoVivienda] = useState("casa")

  const [piso, setPiso] = useState("")
  const [numeroLetraDepto, setNumeroLetraDepto] = useState("")

  const [cantAmbientes, setCantAmbientes] = useState("")
  const [cantBanos, setCantBanos] = useState("")
  const [cantHabitaciones, setCantHabitaciones] = useState("")
  const [cantCocheras, setCantCocheras] = useState("")
  const [mt2Totales, setMt2Totales] = useState("")
  const [mt2Utilizados, setMt2Utilizados] = useState("")

  const [tipoPublicacion, setTipoPublicacion] = useState("venta")
  const [precio, setPrecio] = useState("")
  const [expensas, setExpensas] = useState("")



  const [descripcion, setDescripcion] = useState("")



  const [imagenes, setImagenes] = useState([])





  const [errorSiguiente, setErrorSiguiente] = useState(false)


  const [siguiente, setSiguiente] = useState(false)




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






  const handleSiguiente = () => {
    if (
      provincia.length == 0 ||
      municipio.length == 0 ||
      localidad.length == 0 ||
      direccion.length == 0 ||
      codigoPostal.length == 0 ||
      altura.length == 0 ||
      tipoVivienda.length == 0 ||
      cantAmbientes.length == 0 ||
      cantBanos.length == 0 ||
      cantHabitaciones.length == 0 ||
      cantCocheras.length == 0 ||
      tipoPublicacion.length == 0 ||
      precio.length == 0 ||
      descripcion.length == 0 ||
      imagenes.length == 0 ||
      mt2Totales.length == 0 ||
      mt2Utilizados.length == 0
    ) {
      setErrorSiguiente(true)
      return
    }

    if (tipoVivienda == "departamento" && piso.length == 0) {
      setErrorSiguiente(true)
      return
    }

    if (tipoVivienda == "departamento" && piso.length == 0 && numeroLetraDepto.length == 0) {
      setErrorSiguiente(true)
      return
    }


    setSiguiente(true)



  }















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

              {
                siguiente == false ?
                  (
                    <div>
                      <InformacionBasica
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
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
                        piso={piso}
                        setPiso={setPiso}
                        tipoVivienda={tipoVivienda}
                        setTipoVivienda={setTipoVivienda}
                        cantAmbientes={cantAmbientes}
                        setCantAmbientes={setCantAmbientes}
                        cantBanos={cantBanos}
                        setCantBanos={setCantBanos}
                        cantHabitaciones={cantHabitaciones}
                        setCantHabitaciones={setCantHabitaciones}
                        cantCocheras={cantCocheras}
                        setCantCocheras={setCantCocheras}
                        tipoPublicacion={tipoPublicacion}
                        setTipoPublicacion={setTipoPublicacion}
                        precio={precio}
                        setPrecio={setPrecio}
                        expensas={expensas}
                        setExpensas={setExpensas}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        mt2Totales={mt2Totales}
                        setMt2Totales={setMt2Totales}
                        mt2Utilizados={mt2Utilizados}
                        setMt2Utilizados={setMt2Utilizados}
                        numeroLetraDepto={numeroLetraDepto}
                        setNumeroLetraDepto={setNumeroLetraDepto}
                      />


                      <SubirImagenes
                        imagenes={imagenes}
                        setImagenes={setImagenes}
                      />

                      <div className={styles.div_buttonContinue}>
                        <label className={styles.buttonConfirm} onClick={() => handleSiguiente()}>
                          <div className={styles.buttonConfirm_back}></div>
                          <div className={styles.buttonConfirm_content}><span>Confirmar</span></div>
                        </label>
                        {
                          errorSiguiente == true ?
                            (
                              <p>Le falta completar campos</p>
                            ) :
                            (
                              null
                            )
                        }
                      </div>
                    </div>

                  ) :
                  (
                    <FinalizarPublicacion
                      setSiguiente={setSiguiente}
                      provincia={provincia}
                      municipio={municipio}
                      localidad={localidad}
                      direccion={direccion}
                      codigoPostal={codigoPostal}
                      altura={altura}
                      piso={piso}
                      numeroLetraDepto={numeroLetraDepto}
                      latLon={latLon}
                      tipoVivienda={tipoVivienda}
                      cantAmbientes={cantAmbientes}
                      cantBanos={cantBanos}
                      cantHabitaciones={cantHabitaciones}
                      cantCocheras={cantCocheras}
                      tipoPublicacion={tipoPublicacion}
                      precio={precio}
                      expensas={expensas}
                      descripcion={descripcion}
                      imagenes={imagenes}
                      usuario={usuario}
                      selectPosition={selectPosition}
                      mt2Totales={mt2Totales}
                      mt2Utilizados={mt2Utilizados}
                    />
                  )
              }

            </div>
          </div>

        </Layout>
      </div>
    )
  }


}

export default principal