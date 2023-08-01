import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { fetcher } from "../hooks";
import { CartProvider, UiProvider, AuthProvider } from "../context";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, 
    emotionCache = clientSideEmotionCache,
     pageProps: { session, ...pageProps },
     } = props;
  const router = useRouter();
  const pageKey = router.asPath;
  return (
    <SessionProvider session={session}>
    <AnimatePresence initial={false} mode="popLayout">
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <CacheProvider value={emotionCache}>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>
                <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <Component key={pageKey} {...pageProps} />
                </ThemeProvider>
              </CacheProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </AnimatePresence>
    </SessionProvider>
  );
}
