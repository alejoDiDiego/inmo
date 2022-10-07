import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import firebase from '../../firebase'

const UsuarioExtendido = ({u}) => {


    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")

        const q = query(colRef, where("publicador", "==", `${u.uid}`))

        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        console.log(ps)
    }





    return (
        <div>
            usuario extendido
        </div>
    )
}

export default UsuarioExtendido