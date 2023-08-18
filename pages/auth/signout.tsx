import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Index from "@/styles/auth.module.css";
import Head from "next/head";
import Image from "next/image";
import { getProviders, signIn, getCsrfToken, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
type Props = {};

export default function SignOut({}: Props) {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: `${process.env.HOSTNAME}/auth` });
  }, []);
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};