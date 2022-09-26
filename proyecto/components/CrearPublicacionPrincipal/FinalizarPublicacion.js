import React, { useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const FinalizarPublicacion = ({
  setSiguiente,
  provincia,
  municipio,
  localidad,
  direccion,
  codigoPostal,
  altura,
  pisoDepto,
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
  usuario
}) => {

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")



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
      ["pisoDepto"]: pisoDepto,
      ["latLon"]: latLon,
      ["tipoVivienda"]: tipoVivienda,
      ["cantAmbientes"]: cantAmbientes,
      ["cantBanos"]: cantBanos,
      ["cantHabitaciones"]: cantHabitaciones,
      ["cantCocheras"]: cantCocheras,
      ["tipoPublicacion"]: tipoPublicacion,
      ["precio"]: precio,
      ["expensas"]: expensas,
      ["descripcion"]: descripcion,
      ["publicador"]: usuario.uid
    }


    let randomDoc = Math.floor(Math.random() * 100) + Date.now()

    try {
      const publi = await setDoc(doc(firebase.db, "Publicaciones", `${randomDoc}`),
        publicacion
      ).catch(err => {
        setCargando(false)
        setError(err)
      })


      let imgs = []

      const map = async () => {
        await Promise.all(
          imagenes.map(async m => {
            let random = Math.floor(Math.random() * 100) + Date.now()
            const imageRef = ref(firebase.storage, `publicaciones/${randomDoc}/${random}`)
            const snapshot = await uploadBytes(imageRef, m)
            const url = await getDownloadURL(snapshot.ref)
            console.log(url)
            imgs.push(url)
            console.log(imgs)
          }
          )
        ).then(async () => {

          await updateDoc(doc(firebase.db, "Publicaciones", `${randomDoc}`), {
            imagenes: imgs,
            id: randomDoc
          }).catch((error) => {
            setCargando(false)
            setError(error)
            console.log(error)
          })
        })

      }

      await map()

      setCargando(false)
      console.log("Listo")

    } catch (err) {
      console.log(err)
    }



  }










  return (
    <div>
      <p>{provincia}</p>
      <p>{municipio}</p>
      <p>{localidad}</p>
      <p>{direccion}</p>
      <p>{codigoPostal}</p>
      <p>{altura}</p>
      <p>{pisoDepto}</p>
      <p>{tipoVivienda}</p>
      <p>{cantAmbientes}</p>
      <p>{cantBanos}</p>
      <p>{cantHabitaciones}</p>
      <p>{cantCocheras}</p>
      <p>{tipoPublicacion}</p>
      <p>{precio}</p>
      <p>{expensas}</p>
      <p>{descripcion}</p>
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
              <button onClick={() => setSiguiente(false)}>Editar</button>
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