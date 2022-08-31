import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import firebase, { FirebaseContext } from '../firebase'





const verificar = () => {
    const { usuario } = useContext(FirebaseContext)

    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const check = async () => {
            if (usuario != null) {
                console.log(usuario)
                setLoading(false)
                console.log('no')
                return true

            } else {
                return false
            }
        }

        let prueba = check()
        while (prueba == false) {
            setInterval(() => {
                prueba = check()
                console.log("probando")
            }, 200)

        }


    })


    return (
        <Layout>
            {
                loading ? (
                    <div>
                        cargando
                    </div>
                ) :
                    (
                        <div>
                            <h2>por favor verifique su cuenta</h2>
                            <p>se ha enviado el mail de verificacion a {usuario.email}, si llego haga click en el boton de abajo</p>
                            <button onClick={() => { firebase.verificar() }}>Reenviar mail de verificacion</button>
                        </div>
                    )
            }

        </Layout>

    )
}

export default verificar