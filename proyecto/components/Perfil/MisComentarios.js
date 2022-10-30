import React, { useState } from 'react'
import Select from 'react-select'
import PublicacionComentarios from './PublicacionComentarios'
import UsuarioComentarios from './UsuarioComentarios'

const MisComentarios = ({ usuario, misComentariosUsuarios, misComentariosPublicaciones }) => {

  const [select, setSelect] = useState("usuarios")



  return (
    <div>
      <select value={select} onChange={e => setSelect(e.target.value)}>
        <option value="usuarios">Usuario</option>
        <option value="publicaciones">Publicaciones</option>
      </select>

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
          null
      }
      {
        misComentariosPublicaciones.map((p, id) => {
          return(
            <PublicacionComentarios
              p={p}
              usuario={usuario}
              id={id}
            />
          )
        })
      }
    </div>
  )
}

export default MisComentarios