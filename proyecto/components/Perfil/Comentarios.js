import React from 'react'

const Comentarios = ({ usuario, info }) => {
    if (info.valoraciones.length > 0) {
        return (
            <div>
            {
                info.valoraciones.map(c => {
                    console.log(c)
                    let fecha = new Date(c.fecha)
                    console.log(fecha)
                    return (
                        <div>
                            <p>{c.comentario}</p>
                            <p>{c.estrellas}</p>
                            <p>{fecha.toLocaleDateString("es-ES")}</p>
                            <p>{c.usuarioComentador.nombre}</p>
                        </div>
                    )
                })
            }
            </div>
        )
    } else {
        return (
            <div>
                No tiene ningun comentario
            </div>
        )
    }

}

export default Comentarios