import '../styles/globals.css'
import '../styles/Spinner.css'

import firebase, { FirebaseContext } from '../firebase';

function MyApp({ Component, pageProps }) {

  return (
    <FirebaseContext
      value={{
        firebase
      }}
    >

      <Component {...pageProps} />

    </FirebaseContext>


  )
}


export default MyApp


//UCHIHA alejo 21 del 5