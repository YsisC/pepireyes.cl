import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Link from "@/src/Link";
import { Box, Button, Grid, TextField, Typography, Chip } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthContext } from '../../context';

import { AuthLayout } from "@/components/layouts";
import { validations } from "../../utils";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {

  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData) => {

    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
    }
  // Todo: navegar a la pantalla que el usuario estaba
  // const destination = router.query.p?.toString() || '/';
  // router.replace(destination);

  await signIn('credentials', { email, password })
  };

  return (
    <AuthLayout title="Registrar">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Crear usuario
              </Typography>
              <Chip
                label="Ya existe ese usuario"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
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
              <Link href={  router.query.p?.toString() ? `/auth/login?p=${ router.query}`: '/auth/login'} underline="always">
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const session = await getSession({req});

  const {  p = '/'} = query;
  
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }
  return {
    props: {
      session 
    }
  }
}

export default RegisterPage;
