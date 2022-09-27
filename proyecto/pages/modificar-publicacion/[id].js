import { useRouter, } from 'next/router'
import React, { useEffect, useContext, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import { collection, doc, onSnapshot, getDoc, query, where, getDocs, collectionGroup } from 'firebase/firestore'


const ModificarPublicacion = () => {

    const [producto, setProducto] = useState({})


    const router = useRouter()
    const { query: { id } } = router

    const { usuario } = useContext(FirebaseContext)

    const queryFirebase = async () => {
        const docRef = doc(firebase.db, "Publicaciones", id)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists() == false){
            console.log("no existe la publicacion")
            return
        }
        if(docSnap.data().publicador != usuario.uid){
            console.log("no tiene permiso")
            return
        }
        console.log(docSnap.data())
        

    }


    useEffect(() => {

        const check = async () => {
          if (usuario != null) {
            try {
              if (Object.keys(usuario).length > 0) {
                queryFirebase()
              }
              return true
    
            } catch (err) {
              console.log(err)
              console.log("a chekear")
              setTimeout(() => {
                check()
                return
              }, 2000)
            }
          } else {
            return false
          }
        }
    
        //Op
    
        let prueba = check()
        while (prueba == false) {
          setInterval(() => {
            prueba = check()
            console.log("probando")
          }, 200)
    
        }
    
      }, [usuario])

    return (
        <div>Desde {id}</div>
    )
}

export default ModificarPublicacion