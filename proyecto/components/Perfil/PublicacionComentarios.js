import React, { useEffect, useState } from 'react'
import styles from '../../styles/PublicacionPerfil.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import firebase, { FirebaseContext } from '../../firebase'
import { getStorage, listAll, ref, deleteObject } from "firebase/storage";
import Link from 'next/link';
import Router from 'next/router';


const PublicacionComentarios = ({ p, usuario }) => {

  const [imagen, setImagen] = useState(0)

  function numeroConPuntos(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  const handlePublicacion = () => {
    Router.push({
      pathname: '/publicaciones/principal',
      query: {
        publicacion: p.id
      }
    })
  }


  return (
    <div className={styles.receiverInfo}>
      <h3>Publicaciones en las que has comentado:</h3>
      <div className={styles.publicacion}>

        <div className={styles.publicacion_div_img}>

          {

            <div className={styles.arrows}>
              {
                imagen > 0 ?
                  <img src='/arrow.png' onClick={() => setImagen(imagen - 1)} style={{ transform: "rotate(180deg)" }} className={styles.delete_icon} /> :
                  <div className={styles.fake}></div>
              }

              {
                imagen + 1 != p.imagenes.length ?
                  <img src='/arrow.png' onClick={() => setImagen(imagen + 1)} className={styles.delete_icon} /> :
                  <div className={styles.fake}></div>
              }


            </div>

          }


          <img className={styles.img} src={p.imagenes[imagen]} />
        </div>




        <div>

          <div onClick={() => handlePublicacion()} className={styles.infoContainer}>
            <div className={styles.headPlusDir}>
              <div className={styles.head}>
                <div className={styles.infoInside}>
                  {
                    p.tipoPublicacion == "venta" ?
                      (
                        <div className={styles.price}>
                          <h3>En venta</h3>
                          <h2>USD$</h2>
                          <h2>{numeroConPuntos(p.precio)}</h2>
                        </div>

                      ) :
                      (
                        <div className={styles.price}>
                          <h3>En alquiler</h3>
                          <h2>ARS$/Mes</h2>
                          <h2>{numeroConPuntos(p.precio)}</h2>
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

            </div>


            {/* <div>
            <p>Comentarios: {p.comentarios.length}</p>
        </div> */}

          </div>

          <div className={styles.escondido}></div>
        </div>

      </div>
    </div>

  )
}

export default PublicacionComentarios