import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Usuario.module.css"
import UsuarioExtendido from './UsuarioExtendido'


const Usuario = ({ u }) => {


  const [extendido, setExtendido] = useState(false)

  const router = useRouter()

  let puntajeEstrellas = 0

  useEffect(() => {
    u.valoraciones.map(v => {
      puntajeEstrellas += v.estrellas
    })
  }, [])

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
    <div onClick={() => handleExtendido()} className={`${styles.usuario} ${extendido == true && styles.usuario_extendido}`}>
      <div>
        {u.nombreUsuario}{" "}
        {u.provincia}{" "}
        {u.municipio}{" "}
        {u.localidad.length > 0 && u.localidad}{" "}
        {u.direccion.length > 0 && u.direccion}{" "}
        {u.type}
        {u.descripcion}
        {
          u.valoraciones.length == 0 ?
            <p>No tiene ninguna valoracion todavia</p>
            :
            <p>{puntajeEstrellas / u.valoraciones.length} Estrellas de {u.valoraciones.length} valoraciones</p>
        }

      </div>
      <img src={u.fotoPerfilURL} />
      <img src={u.fotoFondoURL} />

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