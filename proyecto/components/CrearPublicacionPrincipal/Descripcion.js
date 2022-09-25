import React from 'react'

const Descripcion = ({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion
}) => {
    return (
        <div>
            <div>
                <h2>Titulo de la publicacion</h2>

                <input value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>

            <div>
                <h2>Descripcion</h2>
                <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default Descripcion