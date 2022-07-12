import Head from 'next/head'
import { useEffect, useState } from 'react'
import ContainerRegisterParticular1 from '../../../components/Register/Register-Particular/ContainerRegisterParticular1'
import ContainerRegisterParticular2 from '../../../components/Register/Register-Particular/ContainerRegisterParticular2'
import ContainerRegisterParticular3 from '../../../components/Register/Register-Particular/ContainerRegisterParticular3'
import { auth } from '../../../firebase/ControladorFirebase'
import styles from '../../../styles/RegisterParticular.module.css'




export default function RegisterParticular() {

  const [verdadero, setVerdadero] = useState(false)
  const [verdadero2, setVerdadero2] = useState(false)

  const [omitir, setOmitir] = useState(false)


  const [userCore, setUserCore] = useState({})


  useEffect(() => {
    setTimeout(() => {
      if(auth.currentUser == null) {
        
        console.log("no")
        console.log(auth.currentUser)
        setVerdadero(false)
      } else{
        setVerdadero(true)
        console.log("si")
        console.log(auth.currentUser)
      }
      
    },600)
  }, [auth.currentUser])




  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      {verdadero == false ? 
      <ContainerRegisterParticular1 
        setVerdadero={setVerdadero}
        userCore={userCore}
        setUserCore={setUserCore}
      /> 
      : 
      (
        verdadero2 == false ? 
        <ContainerRegisterParticular2 
          setVerdadero={setVerdadero} 
          setVerdadero2={setVerdadero2} 
          userCore={userCore}
          setUserCore={setUserCore}
          omitir={omitir}
          setOmitir={setOmitir}
        /> 
        :
        <ContainerRegisterParticular3 
          setVerdadero2={setVerdadero2}
          userCore={userCore}
          setUserCore={setUserCore}
          omitir={omitir}
          setOmitir={setOmitir}
        /> 
      )}
    </div>
  )
}