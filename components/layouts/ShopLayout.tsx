import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar} from '../ui';
import Footer from '../ui/Footer';
import { motion, HTMLMotionProps } from 'framer-motion'
import { Padding } from '@mui/icons-material';

type PageTransitionProps = HTMLMotionProps<'div'>
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: ReactNode;
    page:PageTransitionProps;
    ref?: PageTransitionRef;

}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl,ref, ...rest}) => {
    const onTheRight = { x: '100%' }
	const inTheCenter = { x: 0 }
	const onTheLeft = { x: '-100%' }

    const transition = { duration: 0.6, ease: 'easeInOut' }
 
    return (
        <motion.div
        ref={ref}
        initial={onTheRight}
        animate={inTheCenter}
        exit={onTheLeft}
        transition={transition}
        {...rest}
    >
        <Head>
            <title>{ title }</title>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
<link
  rel="apple-touch-icon"
  href="/apple-icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
            <meta name="description" content={ pageDescription } />
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head> 

        <nav>
            <Navbar />
        </nav>

        {/* <SideMenu /> */}

        <main style={{
           
          paddingTop:'3.4rem',
          paddingBottom:'1.5rem'
          
           
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
            <Footer />
        </footer>

        </motion.div>
  )
}


