import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';
import Footer from '../ui/Footer';
import { motion, HTMLMotionProps } from 'framer-motion';

type PageTransitionProps = HTMLMotionProps<'div'>;

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  const onTheRight = { x: '100%' }
  const inTheCenter = { x: 0 }
  const onTheLeft = { x: '-100%' }

  const transition = { duration: 0.6, ease: 'easeInOut' }

  return (
    <motion.div
      initial={onTheRight}
      animate={inTheCenter}
      exit={onTheLeft}
      transition={transition}
    >
      <Head>
        {/* Rest of the code... */}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <main style={{
        paddingTop: '3.4rem',
        paddingBottom: '1.5rem'
      }}>
        {children}
      </main>

      <footer>
        {/* Rest of the code... */}
      </footer>

    </motion.div>
  )
}
