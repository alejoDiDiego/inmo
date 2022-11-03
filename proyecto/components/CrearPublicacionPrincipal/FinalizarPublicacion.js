import React, { useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import styles from '../../styles/FinalizarPublicacion.module.css'
import Publicacion from '../../components/Publicaciones/Publicacion'
import dynamic from "next/dynamic"
import { useRouter } from 'next/router'
import Spinner from '../Spinner/Spinner'

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

  function numeroConPuntos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      <h3>Ubicación en el mapa:</h3>
      <div className={styles.map}>
        <MapNoSSR selectPosition={selectPosition} />
      </div>
      <h3 className={styles.title}>Vista previa de publicacion:</h3>
      <div className={styles.pubContainer}>
        {
          imagenes.map((m, id) => {
            let urlCreator = window.URL || window.webkitURL;


            if (id == 1) {
              return (
                <img key={id} className={styles.pubImg} src={urlCreator.createObjectURL(m)} />
              )
            }
          })
        }

        {
          error.length > 0 &&
          (
            <p>Error {error}</p>
          )
        }
        <div>
          <div className={styles.infoContainer}>
            <div className={styles.headPlusDir}>
              <div className={styles.head}>

                <div className={styles.infoInside}>
                  {
                    tipoPublicacion == "venta" ?
                      (
                        <div className={styles.price}>
                          <div className={styles.header}>
                            <h3>En venta</h3>


                          </div>
                          <div className={styles.price_valores}>
                            <h2>USD$</h2>
                            <h2>{numeroConPuntos(precio)}</h2>
                          </div>
                        </div>

                      ) :
                      (
                        <div className={styles.price}>
                          <div className={styles.header}>
                            <h3>En alquiler</h3>


                          </div>
                          <div className={styles.price_valores}>
                            <h2>ARS$/Mes</h2>
                            <h2>{numeroConPuntos(precio)}</h2>
                          </div>
                        </div>

                      )
                  }

                  {
                    expensas.length > 0 &&
                    (
                      <p>Expensas ARS$/Mes {numeroConPuntos(expensas)}</p>
                    )
                  }

                  <div className={styles.imagesAndCant}>
                    <div className={styles.cantContainerDiv}>
                      <div className={styles.cantContainer}>
                        <img src='/open-door.png'></img>
                        <p>{cantAmbientes}</p>
                      </div>
                      <div className={styles.cantContainer}>
                        <img src='/bed.png'></img>
                        <p>{cantAmbientes}</p>
                      </div>
                    </div>
                    <div className={styles.cantContainerDiv}>
                      <div className={styles.cantContainer}>
                        <img src='/shower.png'></img>
                        <p>{cantBanos}</p>
                      </div>
                      <div className={styles.cantContainer}>
                        <img src='/garage.png'></img>
                        <p>{cantCocheras}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.dire}>
                <h3>{direccion} {altura}</h3>
                <p>{provincia}, <span>{municipio},</span> <span>{localidad}</span></p>

                {
                  piso.length > 0 ?
                    (
                      <div className={styles.pAndD}>
                        <p>Piso: {piso}</p>
                        {
                          numeroLetraDepto != 0 ?
                            (
                              <p>Depto: {numeroLetraDepto}</p>
                            ) :
                            (
                              <p></p>
                            )
                        }
                      </div>

                    ) :
                    (
                      piso.length == 0 && numeroLetraDepto.length > 0 ?
                        (
                          <div className={styles.pAndD}>
                            <p>Depto: {numeroLetraDepto}</p>
                          </div>

                        ) : null
                    )
                }

                <div className={styles.cantidades}>
                  <div className={styles.meters}>
                    <div className={styles.metersContainer}>
                      <h4>Mt<sup>2</sup> Totales: </h4>
                      <p>{mt2Totales}</p>
                    </div>

                    {
                      mt2Utilizados.length > 0 ?
                        (
                          <div className={styles.metersContainer}>
                            <h4>Mt<sup>2</sup> Utilizados: </h4>
                            <p>{mt2Utilizados}</p>
                          </div>
                        ) :
                        null
                    }

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>



      </div>


      {
        cargando == true ?
          (
            <Spinner />
          ) :
          (

            <div className={styles.buttons}>
              <div className={styles.button} onClick={handleVolver}>
                <div className={styles.button_back}></div>
                <div className={styles.button_content}><span>Editar</span></div>
              </div>
              <div className={styles.button} onClick={() => handlePublicar()}>
                <div className={styles.button_back}></div>
                <div className={styles.button_content}><span>Publicar</span></div>
              </div>
            </div>
          )
      }


    </div>
  )
}

export default FinalizarPublicacion