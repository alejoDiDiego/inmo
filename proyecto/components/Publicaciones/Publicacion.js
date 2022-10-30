import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/PublicacionPublicaciones.module.css"
import PublicacionExtendida from './PublicacionExtendida'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { FirebaseContext } from '../../firebase'
import firebase from '../../firebase'


const Publicacion = ({ p }) => {

  const [publicador, setPublicador] = useState({})

  const [extendido, setExtendido] = useState(false)

  const [cargando, setCargando] = useState(false)

  const [estrellas, setEstrellas] = useState(0)

  const router = useRouter()





  function numeroConPuntos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleExtendido = async () => {
    // console.log("router.query.publicacion " + router.query.publicacion)
    // console.log("p.id " + p.id)
    setExtendido(true)
    Router.push({
      pathname: '/publicaciones/principal',
      query: {
        publicacion: p.id
      }
    })

  }


  // useEffect(() => {
  //   console.log("a")
  //   if ("publicacion" in router.query) {
  //     console.log("true")
  //     if (router.query.publicacion == p.id) {
  //       console.log("true2")
  //       setExtendido(true)
  //     }
  //   } else {
  //     if (extendido == true && "direccion" in router.query) {
  //       window.history.back()
  //     }
  //   }
  // }, [router])

  useEffect(() => {
    if ("publicacion" in router.query) {
      setExtendido(true)
    } else {
      setExtendido(false)
    }
  }, [router])

  useEffect(() => {
    queryFirebase()
  }, [extendido])


  

  const queryFirebase = async () => {
    setCargando(true)
    const docRef = doc(firebase.db, "Usuarios", p.publicador)
    const docSnap = await getDoc(docRef)
    let puntajeEstrellas = 0
    for (const v of docSnap.data().valoraciones) {
      puntajeEstrellas = parseInt(puntajeEstrellas) + parseInt(v.estrellas)
    }
    setEstrellas(puntajeEstrellas)
    setPublicador(docSnap.data())
    setCargando(false)
  }

  useEffect(() => {
    if (!publicador.hasOwnProperty("uid")) {
      queryFirebase()
    }
  }, [publicador])


  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  return (
    <div onClick={extendido == true ? null : () => handleExtendido()} className={`${extendido == true ? styles.publicacion_extendido : styles.publicacion}`}>

      {
        extendido == true ? null :
          <div className={styles.publicacion_div_img}>

            <img className={styles.img} src={p.imagenes[0]} />
          </div>
      }




      <div>
        <div className={`${styles.infoContainer} ${extendido == true && styles.infoContainer_extendido}`}>
          <div className={styles.headPlusDir}>
            <div className={styles.head}>

              <div className={styles.infoInside}>
                {
                  p.tipoPublicacion == "venta" ?
                    (
                      <div className={styles.price}>
                        <h3>En venta</h3>
                        <div className={styles.price_valores}>
                          <h2>USD$</h2>
                          <h2>{numeroConPuntos(p.precio)}</h2>
                        </div>
                      </div>

                    ) :
                    (
                      <div className={styles.price}>
                        <h3>En alquiler</h3>
                        <div className={styles.price_valores}>
                          <h2>ARS$/Mes</h2>
                          <h2>{numeroConPuntos(p.precio)}</h2>
                        </div>
                      </div>

                    )
                }

                {
                  p.expensas.length > 0 &&
                  (
                    <p>Expensas ARS$/Mes {numeroConPuntos(p.expensas)}</p>
                  )
                }

                <div className={styles.imagesAndCant}>
                  <div className={styles.cantContainerDiv}>
                    <div className={styles.cantContainer}>
                      <img src='/open-door.png'></img>
                      <p>{p.cantAmbientes}</p>
                    </div>
                    <div className={styles.cantContainer}>
                      <img src='/bed.png'></img>
                      <p>{p.cantHabitaciones}</p>
                    </div>
                  </div>
                  <div className={styles.cantContainerDiv}>
                    <div className={styles.cantContainer}>
                      <img src='/shower.png'></img>
                      <p>{p.cantBanos}</p>
                    </div>
                    <div className={styles.cantContainer}>
                      <img src='/garage.png'></img>
                      <p>{p.cantCocheras}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.dire}>
              <h3>{p.direccion} {p.altura}</h3>
              <p>{p.provincia}, <span>{p.municipio},</span> <span>{p.localidad}</span></p>

              {
                p.piso.length > 0 ?
                  (
                    <div className={styles.pAndD}>
                      <p>Piso: {p.piso}</p>
                      {
                        p.numeroLetraDepto != 0 ?
                          (
                            <p>Depto: {p.numeroLetraDepto}</p>
                          ) :
                          (
                            <p></p>
                          )
                      }
                    </div>

                  ) :
                  (
                    p.piso.length == 0 && p.numeroLetraDepto.length > 0 ?
                      (
                        <div className={styles.pAndD}>
                          <p>Depto: {p.numeroLetraDepto}</p>
                        </div>

                      ) : null
                  )
              }

              <div className={styles.cantidades}>
                <div className={styles.meters}>
                  <div className={styles.metersContainer}>
                    <h4>Mt<sup>2</sup> Totales: </h4>
                    <p>{p.mt2Totales}</p>
                  </div>

                  {
                    p.mt2Utilizados.length > 0 ?
                      (
                        <div className={styles.metersContainer}>
                          <h4>Mt<sup>2</sup> Utilizados: </h4>
                          <p>{p.mt2Utilizados}</p>
                        </div>
                      ) :
                      null
                  }

                </div>
              </div>

            </div>

            {
              extendido == true ?
                (

                  !publicador.hasOwnProperty("uid") ? null :

                    (

                      cargando == false ?
                        (
                          <div className={styles.publicador}>
                            <p className={styles.divider}>Publicado por: </p>
                            <div className={styles.userNameContainer}>
                              <img src={publicador.fotoPerfilURL} />
                              <div className={styles.userInfo}>
                                <p>{publicador.nombreUsuario}</p>
                                <p className={styles.type}>{titleCase(publicador.type)}</p>
                              </div>
                            </div>

                            <div>
                              <p>{publicador.numeroCelular}</p>

                            </div>
                            {
                              publicador.numeroTelefono.length == 0 ? null :
                                <p>{publicador.numeroTelefono}</p>
                            }

                            {
                              publicador.emailPublico == true &&
                              <p>{publicador.mail}</p>

                            }
                            {
                              publicador.valoraciones.length == 0 ?
                                <p>0 Estrellas de 0 Valoraciones.</p>
                                :
                                <p>{Math.round(estrellas / publicador.valoraciones.length * 10) / 10} Estrellas de {publicador.valoraciones.length} Valoraciones</p>
                            }


                          </div>
                        ) : null
                    )

                ) :
                !publicador.hasOwnProperty("uid") ? null :
                  (
                    cargando == false ?
                      <div>
                        <div className={styles.userNameContainer}>
                          <img src={publicador.fotoPerfilURL} />
                          <div className={styles.userInfo}>
                            <p>{publicador.nombreUsuario}</p>
                            <p className={styles.type}>{titleCase(publicador.type)}</p>
                          </div>
                        </div>
                        {
                          publicador.valoraciones.length == 0 ?
                            <p>0 Estrellas de 0 Valoraciones.</p>
                            :
                            <p>{Math.round(estrellas / publicador.valoraciones.length * 10) / 10} Estrellas de {publicador.valoraciones.length} Valoraciones</p>
                        }
                      </div>
                      : null
                  )
            }

          </div>


          {/* <div>
                <p>Comentarios: {p.comentarios.length}</p>
            </div> */}

        </div>
        {
          extendido == false &&
          (
            <div className={styles.escondido}></div>
          )
        }
      </div>



      {
        extendido == true ?
          (
            <div>
              <PublicacionExtendida
                p={p}
                setExtendido={setExtendido}
                publicador={publicador}
              />
            </div>
          ) : null
      }
    </div>
  )
}

export default Publicacion