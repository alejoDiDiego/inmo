import React, { useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import styles from '../../styles/FinalizarPublicacion.module.css'
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'

const MapNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

const FinalizarPublicacion = ({
  setSiguiente,
  setLoadTrigger,
  setImgTrigger,
  setOnFinish,
  provincia,
  municipio,
  localidad,
  direccion,
  codigoPostal,
  altura,
  piso,
  numeroLetraDepto,
  latLon,
  tipoVivienda,
  cantAmbientes,
  cantBanos,
  cantHabitaciones,
  cantCocheras,
  tipoPublicacion,
  precio,
  expensas,
  descripcion,
  imagenes,
  usuario,
  selectPosition,
  mt2Totales,
  mt2Utilizados,
}) => {

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleVolver = async () => {
    setSiguiente(false)
    setLoadTrigger(false)
    setImgTrigger(true)
    setOnFinish(false)
  }
  const handlePublicar = async () => {
    console.log("Publicando...")
    setError("")
    setCargando(true)
    const publicacion = {
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
      ["creado"]: Date.now(),
      ["comentarios"]: []
    }


    // let randomDoc = Math.floor(Math.random() * 100) + Date.now()

    try {
      const publi = await addDoc(collection(firebase.db, "Publicaciones"),
        publicacion
      ).catch(err => {
        setCargando(false)
        setError(err)
      })

      console.log(publi)
      console.log(publi.id)




      const map = async () => {

        // imagenes.map(async m => {
        //   // let random = Math.floor(Math.random() * 100) + Date.now()
        //   const imageRef = ref(firebase.storage, `publicaciones/${randomDoc}/${Date.now() + imgs.length}`)
        //   console.log(m)
        //   const snapshot = await uploadBytes(imageRef, m)
        //   const url = await getDownloadURL(snapshot.ref)
        //   console.log(url)
        //   imgs.push(url)
        //   console.log(imgs)
        // }
        // )
        let imgs = []
        for (const m of imagenes) {
          const imageRef = ref(firebase.storage, `publicaciones/${publi.id}/${Date.now() + imgs.length}`)
          console.log(m)
          const snapshot = await uploadBytes(imageRef, m)
          const url = await getDownloadURL(snapshot.ref)
          console.log(url)
          imgs.push(url)
          console.log(imgs)
        }
        await updateDoc(doc(firebase.db, "Publicaciones", `${publi.id}`), {
          imagenes: imgs,
          id: publi.id
        }).catch((error) => {
          setCargando(false)
          setError(error)
          console.log(error)
        })


      }

      await map()

      setCargando(false)
      console.log("Listo")
      router.push("/perfil/principal")

    } catch (err) {
      console.log(err)
    }



  }










  return (
    <div className={styles.main}>
      <div className={styles.map}>
        <MapNoSSR selectPosition={selectPosition} />
      </div>
      <p>provincia: {provincia}</p>
      <p>municipio: {municipio}</p>
      <p>localidad: {localidad}</p>
      <p>direccion: {direccion}</p>
      <p>codigoPostal: {codigoPostal}</p>
      <p>altura: {altura}</p>
      <p>piso: {piso}</p>
      <p>numeroLetraDepto: {numeroLetraDepto}</p>
      <p>tipoVivienda: {tipoVivienda}</p>
      <p>cantAmbientes: {cantAmbientes}</p>
      <p>cantBanos: {cantBanos}</p>
      <p>cantHabitaciones: {cantHabitaciones}</p>
      <p>cantCocheras: {cantCocheras}</p>
      <p>mt2Totales: {mt2Totales}</p>
      <p>mt2Utilizados: {mt2Utilizados}</p>
      <p>tipoPublicacion: {tipoPublicacion}</p>
      <p>precio: {precio}</p>
      <p>expensas: {expensas}</p>
      <p>descripcion: {descripcion}</p>
      {
        imagenes.map(m => {
          let urlCreator = window.URL || window.webkitURL;
          let index = imagenes.indexOf(m)
          console.log(index)

          return (
            <img key={index} src={urlCreator.createObjectURL(m)} />
          )
        })
      }
      {
        cargando == true ?
          (
            <p>Cargando</p>
          ) :
          (
            <div>
              <button onClick={handleVolver}>Editar</button>
              <button onClick={() => handlePublicar()}>Publicar</button>
            </div>
          )
      }
      {
        error.length > 0 &&
        (
          <p>Error {error}</p>
        )
      }
    </div>
  )
}

export default FinalizarPublicacion