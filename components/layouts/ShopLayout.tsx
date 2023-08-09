import React, { FC, ReactNode, useEffect, useRef } from "react";
import Head from "next/head";
import { Navbar, SideMenu } from "../ui";
import Footer from "../ui/Footer";
import { motion, HTMLMotionProps } from "framer-motion";

type PageTransitionProps = HTMLMotionProps<"div">;

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const onTheRight = { x: "100%" };
  const inTheCenter = { x: 0 };
  const onTheLeft = { x: "-100%" };

  const transition = { duration: 0.6, ease: "easeInOut" };
  const sessionProviderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After the component is mounted, forward the ref to the SessionProvider
    const sessionProviderNode = sessionProviderRef.current;
    if (sessionProviderNode) {
      // Forwarding the ref to the SessionProvider
      (sessionProviderNode as any)._reactInternalFiber.child.ref =
        sessionProviderRef;
    }
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <motion.main
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        style={{
          paddingTop: "3.4rem",
          paddingBottom: "1.5rem",
        }}
      >
        {children}
      </motion.main>

   <Footer />
    </>
  );
};
