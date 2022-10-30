import React from 'react'

const Usuario = ({ u, usuario }) => {


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (
        <div u={u}>
            <p>{u.nombreUsuario}</p>
            <p>{titleCase(u.type)}</p>
            {u.emailPublico == true ? <p>u.mail</p> : null}
            <img src={u.fotoPerfilURL} />
            {
                u.valoraciones.map((v, id) => {
                    if (v.usuarioComentador.uid == usuario.uid) {
                        let fecha = new Date(v.fecha)
                        let fechaRespuesta = {}
                        if (Object.keys(v.respuesta).length > 0) {
                            fechaRespuesta = new Date(v.respuesta.fecha)
                        }
                        return (
                            <div key={id}>
                                <p>{v.comentario}</p>
                                <p>{v.estrellas}</p>
                                <p>{fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
                                {
                                    Object.keys(v.respuesta).length > 0 ?
                                        <div>
                                            <p>Respuesta:</p>
                                            <p>{v.respuesta.texto}</p>
                                            <p>{fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default Usuario