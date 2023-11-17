import React, { useState, useEffect } from "react";

import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
type Props = {};

export default function SignOut({}: Props) {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: `${process.env.NEXTAUTH_URL}auth` });
  }, []);
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};