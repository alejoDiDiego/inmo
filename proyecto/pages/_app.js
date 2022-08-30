import '../styles/globals.css'
import '../styles/Spinner.css'
import firebase, { FirebaseContext } from '../firebase';
import useAutentication from '../hooks/useAutentication';

function MyApp({ Component, pageProps }) {
  const usuario = useAutentication();


  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >

      <Component {...pageProps} />

    </FirebaseContext.Provider>


  )
}


export default MyApp


//UCHIHA alejo 21 del 5