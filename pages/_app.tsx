import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <Fragment>
          <ChakraProvider>
              <Component {...pageProps} />
          </ChakraProvider>
    </Fragment>
  )
}
export default MyApp
