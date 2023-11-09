"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { AxiosError } from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "@/themeMUI/Link";

import { useForm } from "react-hook-form";
import { Box, Button, Grid, TextField, Typography, Chip } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import { AuthContext } from "../../context";
import { AuthLayout } from "@/components/layouts";
import { validations } from "../../utils";
import { pepireyesApi } from "@/axiosApi";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const session = useSession();
  const { registerUser } = useContext(AuthContext);
  if (session.status === "authenticated") {
    router?.push("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    try {
    const { hasError, message } = await registerUser(name, email, password);
    console.log("mensaje",message)
    console.log("error",hasError)
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
    }

      //   const signupResponse = await pepireyesApi.post("/auth/signup",
      //    {
      //     email: email.toLocaleLowerCase(),
      //     password,
      //     name
      //   });
      //   console.log("se guarda",signupResponse.data);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("la respuesta", res);
      if (res?.ok) return router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        {showError && (
          <Chip
            label={errorMessage}
            color="error"
            icon={<ErrorOutline />}
            className="fadeIn"
            sx={{ display: showError ? "flex" : "none" }}
          />
        )}
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Crear usuario
              </Typography>
        
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                {" "}
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent="end">
              <Link
                href={
                  router.query.p?.toString()
                    ? `/auth/login?p=${router.query}`
                    : "/auth/login"
                }
                underline="always"
              >
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default RegisterPage;
