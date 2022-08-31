import React, { useContext } from 'react'
import Layout from '../components/layout/Layout'
import firebase, { FirebaseContext } from '../firebase'





const verificar = () => {
    const { usuario } = useContext(FirebaseContext)


    return (
        <Layout>
            <div>
                <h2>por favor verifique su cuenta</h2>
                <p>se ha enviado el mail de verificacion, si llego haga click en el boton de abajo</p>
                <button onClick={() => { firebase.verificar() }}>Reenviar mail de verificacion</button>
            </div>
        </Layout>

    )
}

export default verificar