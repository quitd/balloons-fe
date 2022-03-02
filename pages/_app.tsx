import '../styles/globals.css';
import { ChakraProvider, extendTheme, Spinner, Center } from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

function MyApp({ Component, pageProps }) {
  const [l, setL] = useState(false);
  const router = useRouter();


  useEffect(() => {
    router.events.on("routeChangeStart", url => setL(url !== router.pathname));
    router.events.on("routeChangeComplete", () => setL(false));
    router.events.on("routeChangeError", () => setL(false));
  }, [router]);

  return <ChakraProvider theme={extendTheme({
    components: {
      Divider: {
        baseStyle: {
          my: 3
        }
      },
    },
  })}>{l ? <Center w="100vw" h="100vh"><Spinner size="xl" thickness="3px" /></Center> : <div className="top"><Component {...pageProps} /></div>}</ChakraProvider>
}

export default MyApp
