import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Usuario.module.css"
import UsuarioExtendido from './UsuarioExtendido'


const Usuario = ({ u }) => {


  const [extendido, setExtendido] = useState(false)

  const [estrellas, setEstrellas] = useState(0)


  const router = useRouter()



  useEffect(() => {
    let puntajeEstrellas = 0
    u.valoraciones.map(v => {
      puntajeEstrellas = parseInt(puntajeEstrellas) + parseInt(v.estrellas)
      setEstrellas(puntajeEstrellas)
      console.log(v)
      console.log(estrellas)
    })
  }, [u])

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }


  console.log(u)

  const handleExtendido = async () => {
    // console.log("router.query.publicacion " + router.query.publicacion)
    // console.log("p.id " + p.id)
    setExtendido(true)
    Router.push({
      pathname: '/usuarios/principal',
      query: {
        user: u.uid
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
    console.log("a")
    if ("user" in router.query) {
      setExtendido(true)
    } else {
      setExtendido(false)
    }
  }, [router])


  return (
    <div onClick={() => extendido == false ? handleExtendido() : null} className={extendido == true ? `${styles.usuario_extendido}` : `${styles.usuario}`}>
      <div>

        <div className={styles.profileContainer}>
          <div className={styles.image}>
            <img className={styles.usuarioImg} src={u.fotoPerfilURL} />
          </div>
          <div className={styles.profilePill}>

            <div className={styles.infoContainer}>
              <div>
                <div className={styles.userData}>
                </div>
                <div className={styles.name}>
                  <h2>{u.nombreUsuario}{" "}</h2>
                  <h3>{titleCase(u.type)}</h3>
                </div>
                <div>
                  {u.provincia}{" "}
                  {u.municipio}{" "}
                  {u.localidad.length > 0 && u.localidad}{" "}
                  {u.direccion.length > 0 && u.direccion}{" "}
                </div>

              </div>
              <div className={styles.descrip}>
                {
                  u.descripcion.length == 0 ?
                    (
                      <>
                      </>
                    ) :
                    (
                      <>
                        <h4>Descripcion del usuario:</h4>
                        {u.descripcion}
                      </>
                    )
                }

              </div>
            </div>



          </div>

          <div className={styles.starsPill}>
            <div className={styles.valorations}>
              <p>Valoraciones:</p>
              {
                u.valoraciones.length == 0 ?
                  <p>Nadie ha valorado a este usuario todavia.</p>
                  :
                  <p>{Math.round(estrellas / u.valoraciones.length * 10) / 10} Estrellas de {u.valoraciones.length} valoraciones</p>
              }
              <div className={styles.contactInfo}>
                <p>Informacion de contacto:</p>
                <p>{u.numeroCelular}{" "}</p>
                <p>{u.numeroTelefono}{" "}</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      


      {
        extendido &&
        <UsuarioExtendido
          u={u}
        />
      }


    </div>


  )
}

export default Usuario