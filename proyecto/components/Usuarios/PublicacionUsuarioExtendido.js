import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/PublicacionPublicaciones.module.css"
import PublicacionExtendida from '../Publicaciones/PublicacionExtendida'


const PublicacionUsuarioExtendido = ({ p }) => {


  const [extendido, setExtendido] = useState(false)

  const router = useRouter()


  console.log(p)


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

  useEffect(() => {
    console.log(extendido)
  }, [extendido])

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
    console.log("a")
    if ("publicacion" in router.query) {
      setExtendido(true)
    } else {
      setExtendido(false)
    }
  }, [router])




  return (
    <div onClick={extendido == true ? null : () => handleExtendido()} className={`${styles.publicacion1}`}>

      <div className={styles.publicacion_div_img}>
        <img className={styles.img} src={p.imagenes[0]} />
      </div>


      <div>
        <div className={styles.infoContainer}>
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
                      <img className={styles.iconImg} src='/open-door.png'></img>
                      <p>{p.cantAmbientes}</p>
                    </div>
                    <div className={styles.cantContainer}>
                      <img className={styles.iconImg}  src='/bed.png'></img>
                      <p>{p.cantHabitaciones}</p>
                    </div>
                  </div>
                  <div className={styles.cantContainerDiv}>
                    <div className={styles.cantContainer}>
                      <img className={styles.iconImg}  src='/shower.png'></img>
                      <p>{p.cantBanos}</p>
                    </div>
                    <div className={styles.cantContainer}>
                      <img className={styles.iconImg}  src='/garage.png'></img>
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
          </div>


          {/* <div>
                <p>Comentarios: {p.comentarios.length}</p>
            </div> */}

        </div>


      </div>
    </div>
  )
}

export default PublicacionUsuarioExtendido