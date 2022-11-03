import React from 'react'
import styles from '../../styles/Comentario.module.css'

const UsuarioComentarios = ({ u, usuario }) => {


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (
        <div u={u}>
            <div className={styles.receiverInfo}>
                <h3>Valoracion enviada a:</h3>
                <div className={styles.userInfo}>
                    <img className={styles.profileImg} src={u.fotoPerfilURL} />
                    <div className={styles.infoContainer}>
                        <h3>{u.nombreUsuario}</h3>
                        <p>{titleCase(u.type)}</p>
                        {u.emailPublico == true ? <p>u.mail</p> : null}
                    </div>
                </div>
            </div>
            {
                u.valoraciones.map((v, id) => {
                    if (v.usuarioComentador.uid == usuario.uid) {
                        let fecha = new Date(v.fecha)
                        let fechaRespuesta = {}
                        if (Object.keys(v.respuesta).length > 0) {
                            fechaRespuesta = new Date(v.respuesta.fecha)
                        }
                        return (
                            <div className={styles.valorationContainer} key={id}>
                                <div className={styles.valoration}>
                                    <div className={styles.header}>
                                        <h3>{v.usuarioComentador.nombre}</h3>
                                        <p>{fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
                                    </div>

                                    <div className={styles.stars}>
                                        <h3>{v.estrellas}</h3>
                                        <div >
                                            <img className={styles.divImg} src='/estrella.png'></img>
                                        </div>

                                    </div>
                                    <div className={styles.commentBody}>
                                        <h4>Comentario del usuario:</h4>
                                        <p className={styles.responseText}>{v.comentario}</p>
                                    </div>
                                </div>
                                <div className={styles.response}>
                                    {
                                        Object.keys(v.respuesta).length > 0 ?
                                            <div>
                                                <div className={styles.responseHeader}>
                                                    <h4>Respuesta del usuario</h4>
                                                    <p>{fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                                                </div>
                                                <p className={styles.responseText}> {v.respuesta.texto}</p>

                                                <button onClick={() => handleEliminar(v.usuarioComentador)}>Eliminar</button>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default UsuarioComentarios