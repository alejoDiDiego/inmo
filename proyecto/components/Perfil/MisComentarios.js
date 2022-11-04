import React, { useState } from 'react'
import Select from 'react-select'
import PublicacionComentarios from './PublicacionComentarios'
import UsuarioComentarios from './UsuarioComentarios'
import styles from '../../styles/Comentario.module.css'

const MisComentarios = ({ usuario, misComentariosUsuarios, misComentariosPublicaciones }) => {

  const [select, setSelect] = useState("usuarios")

  const [tipos, setTipos] = useState(
    [{ value: "usuarios", label: "Usuario" },
    { value: "publicaciones", label: "Publicaciones" }]
  )

  const handleSelectTipo = (event) => {
    const value = event.value
    setSelect(value)
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

  return (
    <div>
      <div className={styles.fieldDirSelect}>
        <Select options={tipos} onChange={handleSelectTipo} isClearable={false} isSearchable={false} placeholder={"Tipo de comentario"} value={{ value: select, label: titleCase(select)}}></Select>
      </div>

      {
        select == "usuarios" ?
          misComentariosUsuarios.map((u, id) => {
            return (
              <UsuarioComentarios
                key={id}
                u={u}
                usuario={usuario}
              />
            )
          })
          :
          misComentariosPublicaciones.map((p, id) => {
            console.log(p)
            if(p != undefined){
              return (
                <PublicacionComentarios
                  p={p}
                  usuario={usuario}
                  id={id}
                />
              )
            }
          })
      }
    </div>
  )
}

export default MisComentarios