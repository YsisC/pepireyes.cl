import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "../themeMUI/theme";
import { CartProvider, UiProvider, AuthProvider } from "../context";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";


export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router = useRouter();
  const pageKey = router.asPath;
  return (
    <SessionProvider session={pageProps.session}>
   <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >

    <AnimatePresence mode="wait" initial={false}>
     
        <AuthProvider>
          <CartProvider>
            <UiProvider>                
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Component key={pageKey} {...pageProps} />
                </ThemeProvider>
          
            </UiProvider>
          </CartProvider>
        </AuthProvider>
    
    </AnimatePresence>
 
    </SWRConfig>
    </SessionProvider>
  );
}
