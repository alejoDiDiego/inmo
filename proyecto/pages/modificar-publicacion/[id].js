import { useRouter, } from 'next/router'
import React, { useEffect, useContext, useState, useRef } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { collection, doc, onSnapshot, getDoc, query, where, getDocs, collectionGroup, updateDoc } from 'firebase/firestore'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import InformacionBasica from '../../components/CrearPublicacionPrincipal/InformacionBasica'
import SubirImagenes from '../../components/CrearPublicacionPrincipal/SubirImagenes'
import FinalizarPublicacion from '../../components/CrearPublicacionPrincipal/FinalizarPublicacion'
import styles from '../../styles/CrearPublicacion.module.css'
import Axios from 'axios'
import { deleteObject, getBlob, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import Spinner from '../../components/Spinner/Spinner'


const ModificarPublicacion = () => {

  const [producto, setProducto] = useState({})
  const [cargando, setCargando] = useState(true)
  const [cargandoEditar, setCargandoEditar] = useState(false)


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
  const [nuevasImagenes, setNuevasImagenes] = useState([])


  const router = useRouter()
  const { query: { id } } = router

  const { usuario } = useContext(FirebaseContext)

  const [ubiTrigger, setUbiTrigger] = useState(true)
  const [infoTrigger, setInfoTrigger] = useState(false)
  const [imgTrigger, setImgTrigger] = useState(false)
  const [loadTrigger, setLoadTrigger] = useState(false)

  const referenciaUbi = useRef(null)
  const referenciaInfo = useRef(null)
  const referenciaImg = useRef(null)

  const queryFirebase = async () => {
    const docRef = doc(firebase.db, "Publicaciones", id)
    const docSnap = await getDoc(docRef)
    // // console.log(docSnap.data())
    if (docSnap.exists() == false) {
      // // console.log("no existe la publicacion")
      return
    }
    if (docSnap.data().publicador != usuario.uid) {
      // console.log("no tiene permiso")
      return
    }
    setProducto(docSnap.data())
    setProvincia(docSnap.data().provincia)
    setMunicipio(docSnap.data().municipio)
    setLocalidad(docSnap.data().localidad)
    setDireccion(docSnap.data().direccion)
    setCodigoPostal(docSnap.data().codigoPostal)
    setAltura(docSnap.data().altura)
    setLatLon(docSnap.data().latLon)
    // console.log(docSnap.data().latLon)
    setTipoVivienda(docSnap.data().tipoVivienda)
    setPiso(docSnap.data().piso)
    setNumeroLetraDepto(docSnap.data().numeroLetraDepto)
    setCantAmbientes(docSnap.data().cantAmbientes)
    setCantBanos(docSnap.data().cantBanos)
    setCantHabitaciones(docSnap.data().cantHabitaciones)
    setCantCocheras(docSnap.data().cantCocheras)
    setMt2Totales(docSnap.data().mt2Totales)
    setMt2Utilizados(docSnap.data().mt2Utilizados)
    setTipoPublicacion(docSnap.data().tipoPublicacion)
    setPrecio(docSnap.data().precio)
    setExpensas(docSnap.data().expensas)
    setDescripcion(docSnap.data().descripcion)
    setImagenes(docSnap.data().imagenes)

    // console.log(docSnap.data())





    async function createFile(img) {

      fetch(img)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          let objectURL = URL.createObjectURL(blob);
          let myImage = new Image();
          myImage.src = objectURL;
          // console.log(myImage.src)
          return myImage.src
        });



      // // console.log("imagen   " + img)
      // Axios.get(img).then(async (res) => {
      //   // console.log(data)
      //   let data = await res.blob()
      //   let file = new File([data], "test.jpg", { type: "image/jpeg" })
      //   // console.log(file)



      // }).catch((err) => {
      //   // console.log(err)
      // })

    }


    // async function createFile(img) {
    //   fetch(img, {method: 'GET'})
    //     .then(function (response) {
    //       return response.blob();
    //     })

    //   // ... do something with the file or return it
    // }


  }




  useEffect(() => {
    imagenes.map(async i => {

      let file = await fetch(i)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          let objectURL = URL.createObjectURL(blob);
          let myImage = new Image();
          myImage.src = objectURL;
          // console.log(myImage.src)
          return blob
        });

      // console.log(file)
      setNuevasImagenes(current => [...current, file]);
    })
  }, [imagenes])




  const handleUbi = () => {
    referenciaUbi.current.scrollIntoView()
  }

  const handleInfo = () => {
    referenciaInfo.current.scrollIntoView()
  }

  const handleImg = () => {
    referenciaImg.current.scrollIntoView()
  }









  useEffect(() => {

    const check = async () => {
      if (usuario != null) {
        try {
          if (Object.keys(usuario).length > 0) {
            queryFirebase()
            setCargando(false)
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



  const handleEditar = async () => {
    setCargandoEditar(true)
    if (
      provincia.length == 0 ||
      municipio.length == 0 ||
      localidad.length == 0 ||
      direccion.length == 0 ||
      codigoPostal.length == 0 ||
      altura.length == 0 ||
      tipoVivienda.length == 0 ||
      cantAmbientes.length == 0 || cantAmbientes == 0 ||
      cantBanos.length == 0 || cantBanos == 0 ||
      cantHabitaciones.length == 0 || cantHabitaciones == 0 ||
      cantCocheras.length == 0 ||
      tipoPublicacion.length == 0 ||
      precio.length == 0 || precio == 0 ||
      descripcion.length == 0 ||
      imagenes.length == 0 ||
      mt2Totales.length == 0 || mt2Totales == 0 ||
      mt2Utilizados.length == 0 || mt2Utilizados == 0
    ) {
      setErrorSiguiente(true)
      setCargandoEditar(false)
      throw "Error"
      return
    }

    if (tipoVivienda == "departamento" && piso.length == 0) {
      setErrorSiguiente(true)
      setCargandoEditar(false)
      throw "Error"
      return
    }

    if (tipoVivienda == "departamento" && piso.length == 0 && numeroLetraDepto.length == 0) {
      setErrorSiguiente(true)
      setCargandoEditar(false)
      throw "Error"
      return
    }

    try {



      await updateDoc(doc(firebase.db, "Publicaciones", `${producto.id}`), {
        ["provincia"]: provincia,
        ["municipio"]: municipio,
        ["localidad"]: localidad,
        ["direccion"]: direccion,
        ["codigoPostal"]: codigoPostal,
        ["altura"]: altura,
        ["piso"]: piso,
        ["numeroLetraDepto"]: numeroLetraDepto,
        ["latLon"]: latLon,
        ["tipoVivienda"]: tipoVivienda,
        ["cantAmbientes"]: cantAmbientes,
        ["cantBanos"]: cantBanos,
        ["cantHabitaciones"]: cantHabitaciones,
        ["cantCocheras"]: cantCocheras,
        ["mt2Totales"]: mt2Totales,
        ["mt2Utilizados"]: mt2Utilizados,
        ["tipoPublicacion"]: tipoPublicacion,
        ["precio"]: precio,
        ["expensas"]: expensas,
        ["descripcion"]: descripcion,
        ["publicador"]: usuario.uid,
      })


      const refFolder = ref(firebase.storage, `publicaciones/${producto.id}`)
      // console.log(refFolder)
      const allItems = await listAll(refFolder)
      // console.log(allItems)
      console.log("delete")
      await Promise.all(
        allItems.items.map(async i => {
          // console.log(i)
          await deleteObject(i)
        })
      )


      const map = async () => {
        // nuevasImagenes.map(async m => {
        //   // let random = Math.floor(Math.random() * 100) + Date.now()
        //   const imageRef = ref(firebase.storage, `publicaciones/${producto.id}/${Date.now()}`)
        //   const snapshot = await uploadBytes(imageRef, m)
        //   const url = await getDownloadURL(snapshot.ref)
        //   // console.log(url)
        //   imgs.push(url)
        //   // console.log(imgs)
        // }
        // )
        let imgs = []

        for (const m of nuevasImagenes) {
          const imageRef = ref(firebase.storage, `publicaciones/${producto.id}/${Date.now() + imgs.length}`)
          console.log("for")
          // console.log(m)
          const snapshot = await uploadBytes(imageRef, m)
          const url = await getDownloadURL(snapshot.ref)
          // console.log(url)
          imgs.push(url)
          // console.log(imgs)
        }

        await updateDoc(doc(firebase.db, "Publicaciones", `${producto.id}`), {
          imagenes: imgs,
        }).catch((error) => {
          setCargandoEditar(false)
          setError(error)
          // console.log(error)
        })

        router.push("/perfil/principal")


      }

      await map()

      setCargandoEditar(false)
      console.log("Listo")


    } catch (err) {
      setCargandoEditar(false)
      alert("Error")
      // console.log(err)
    }






    // if (
    //   provincia.length == producto ||
    //   municipio.length == 0 ||
    //   localidad.length == 0 ||
    //   direccion.length == 0 ||
    //   codigoPostal.length == 0 ||
    //   altura.length == 0 ||
    //   tipoVivienda.length == 0 ||
    //   cantAmbientes.length == 0 ||
    //   cantBanos.length == 0 ||
    //   cantHabitaciones.length == 0 ||
    //   cantCocheras.length == 0 ||
    //   tipoPublicacion.length == 0 ||
    //   precio.length == 0 ||
    //   descripcion.length == 0 ||
    //   imagenes.length == 0 ||
    //   mt2Totales.length == 0 ||
    //   mt2Utilizados.length == 0
    //   ) {

    // }
  }


  if (cargando) {
    return (
      <>
        <Head>
          <title>Inmo</title>
          <meta name="description" content="Generated" />
          <link rel="icon" href="/Logo_inmo_new.png" />
        </Head>
        <Layout perfil={true}>
          <div className={styles.loading}>
            <Spinner></Spinner>
          </div>
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
              <h1>Edita tu<span> publicación</span></h1>
              <p>Modifica la información que sea necesaria para tener tu publicación actualizada, agrega imagenes nuevas o información extra que creas que puede llamar la atención a posibles compradores/inquilinos</p>

              <div className={styles.cardsContainer}>

                <div className={styles.cardDivider}>

                  <div className={styles.cuadradoContainer} onClick={handleUbi}>

                    <div className={ubiTrigger == false ? styles.cuadrado : styles.cuadradoHighlited} >
                      <h3>1. Ubicación</h3>
                      <p className={styles.infoc}>Selecciona la ubicación de la propiedad sobre el mapa</p>
                    </div>
                  </div>

                  <div className={styles.cuadradoContainer} onClick={handleInfo}>
                    <div className={infoTrigger == false ? styles.cuadrado : styles.cuadradoHighlited} >
                      <h3 >2. Información Básica</h3>
                      <p className={styles.infoc}>Añade información de relevancia sobre las características de la propiedad</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className={styles.cardDivider}>

                <div className={styles.cuadradoContainer} onClick={handleImg}>
                  <div className={imgTrigger == false ? styles.cuadrado : styles.cuadradoHighlited}>
                    <h3>3. Subir imagenes</h3>
                    <p className={styles.infoc}>Sube imagenes para que los usuarios puedan conocer en detalle tu propiedad</p>
                  </div>
                </div>
                <div className={styles.cuadradoContainer} onClick={handleImg}>
                  <div className={loadTrigger == false ? styles.cuadrado : styles.cuadradoHighlited}>
                    <h3>4. Cargar publicación</h3>
                    <p className={styles.infoc}>finalizar el proceso de publicación</p>
                  </div>
                </div>
              </div>

            </div>


            <div className={styles.derecha}>
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
                  referenciaUbi={referenciaUbi}
                  referenciaInfo={referenciaInfo}
                  setUbiTrigger={setUbiTrigger}
                  setInfoTrigger={setInfoTrigger}
                  setImgTrigger={setImgTrigger}
                  setEditTrigger={true}

                />


                <SubirImagenes
                  imagenes={nuevasImagenes}
                  setImagenes={setNuevasImagenes}
                  referenciaImg={referenciaImg}
                />


                {
                  cargandoEditar == false ?

                    <div className={styles.div_buttonContinue}>
                      <label className={styles.buttonConfirm} onClick={() => handleEditar()}>
                        <div className={styles.buttonConfirm_back}></div>
                        <div className={styles.buttonConfirm_content}><span>Confirmar</span></div>
                      </label>
                    </div>
                    :
                    <div className={styles.spinner}>
                      <Spinner />
                    </div>

                }
              </div>
            </div>






          </div>
        </Layout >
      </>

    )
  }


}

export default ModificarPublicacion