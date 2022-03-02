import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={extendTheme({
  components: {
    Divider: {
      baseStyle: {
        my: 3
      }
    },
  },
})}><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
