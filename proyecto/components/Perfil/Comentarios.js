import React from 'react'

const Comentarios = ({ usuario, info }) => {
    if (info.valoraciones.length > 0) {
        return (
            info.valoraciones.map(c => {
                return (
                    <div>
                        {c}
                    </div>
                )
            })
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