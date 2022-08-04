import { doc, getDoc } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import ContainerRegisterParticular1 from '../../../components/Register/Register-Particular/ContainerRegisterParticular1'
import ContainerRegisterParticular2 from '../../../components/Register/Register-Particular/ContainerRegisterParticular2'
import ContainerRegisterParticular3 from '../../../components/Register/Register-Particular/ContainerRegisterParticular3'
import ContainerSpinnerParticular from '../../../components/Register/Register-Particular/ContainerSpinnerParticular'
import firebase, { FirebaseContext } from '../../../firebase'
import styles from '../../../styles/RegisterParticular.module.css'









export default function RegisterParticular() {

  const [verdadero, setVerdadero] = useState(false)
  const [verdadero2, setVerdadero2] = useState(false)

  const [omitir, setOmitir] = useState(false)

  const [loadingBig, setLoadingBig] = useState(true)

  
  const [userCore, setUserCore] = useState({})

  const router = useRouter()

  const { usuario } = useContext(FirebaseContext)


  // Si el usuario ya subio una foto, que no pueda acceder a esta seccion

  useEffect(() => {
    console.log(usuario)
    if (usuario != null) {
      if(usuario.displayName != null){
        console.log("el usuario ya existe")
        router.push('/')
      }
      else{
        console.log("waiting")
      }
        
    }
    else {
      setTimeout(() => {
        setLoadingBig(false)
        console.log('no')
      }, 1500)
    }


  }, [usuario])





  return (
    <div className={styles.body}>
      <Head>
        <title>Inmo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Logo_inmo_new.png" />
      </Head>
      {
        loadingBig == true ?
          <ContainerSpinnerParticular />
          :
          verdadero == false ?
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
            )


      }





      {/* {verdadero == false ?
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
        )} */}

    </div>
  )
}