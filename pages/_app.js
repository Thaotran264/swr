import Head from 'next/head'
import Header from '../components/Header'
import '../styles/globals.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
