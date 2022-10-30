import React, { useState } from 'react'
import Select from 'react-select'
import Usuario from './Usuario'

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
              <Usuario 
                key={id}
                u={u}
                usuario={usuario}
              />
            )
          })
          :
          null
      }
    </div>
  )
}

export default MisComentarios