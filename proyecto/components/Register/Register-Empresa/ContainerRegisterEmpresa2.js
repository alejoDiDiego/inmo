import { updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../../../styles/ContainerRegisterParticular2.module.css'
import { storage } from '../../../firebase/ControladorFirebase'
import { ref, uploadBytes, getDownloadURL, listAll, list } from "firebase/storage";



const ContainerRegisterEmpresa2 = ({setVerdadero, setVerdadero2}) => {

    const handleAnterior = () => {
        setVerdadero(false)
    }

    const [imagePerfilUpload, setImagePerfilUpload] = useState(null)
    const [imagePerfilURL, setImagePerfilURL] = useState([])
    
    const [imageFondoUpload, setImageFondoUpload] = useState(null)
    const [imageFondoURL, setImageFondoURL] = useState([])
    
    const handleSiguiente = () => {
      console.log(imagePerfilUpload)
      if (imagePerfilUpload != null && imageFondoUpload != null) {
          const imagePerfRef = ref(storage, `usuarios/${userCore.email}/perfil`)
          uploadBytes(imagePerfRef, imagePerfilUpload).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                  setImagePerfilURL((prev) => [...prev, url])
              })
          })

          const imageFondRef = ref(storage, `usuarios/${userCore.email}/fondo`)
          uploadBytes(imageFondRef, imageFondoUpload).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                  setImageFondoURL((prev) => [...prev, url])
              })
          })

          setVerdadero2(true)
      }else{
          return
      }

      
  }


  return (
    <div className={styles.main_container}>
      <div className={styles.inside_container}>
        <h2>Registra <span className={styles.text_blue}>tu empresa 2</span></h2>
        <div className={styles.form}>
          <div>
            <label>Suba una imagen que represente su persona o empresa, la imagen se mostrara en su perfil y en sus publicaciones</label>
            <div>
              <input type="file" onChange={e => { setImagePerfilUpload(e.target.files[0]) }}  accept="image/png, image/jpeg, image/jpg" />
            </div>
          </div>

          <div>
            <label>Incluya una imagen representativa que aparecera de forma decorativa en su perfil</label>
            <div>
              <input  type="file" onChange={e => { setImageFondoUpload(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg" />
            </div>
          </div>


          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleSiguiente}>Siguiente</button>
            <button className={styles.button} onClick={handleAnterior}>Anterior</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ContainerRegisterEmpresa2