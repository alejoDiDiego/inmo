import React from 'react'

const FinalizarPublicacion = ({
    setSiguiente
}) => {
  return (
    <div>
        <button onClick={() => setSiguiente(false)}>Volver</button>
    </div>
  )
}

export default FinalizarPublicacion