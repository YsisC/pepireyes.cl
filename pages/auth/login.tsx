import { useState, useEffect, } from "react";
import Link from "@/src/Link";
import { GetServerSideProps } from "next";
import { getSession, signIn, getProviders } from "next-auth/react";

import { Box, Button, Grid, TextField, Typography, Chip , Divider} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { useRouter } from "next/router";


type FormData = {
  email: string;
  password: string;
};



const LoginPage = () => {

  const router = useRouter();
  // const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then( prov => {
      console.log({prov});
      setProviders(prov)
    })
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    
    setShowError(false);

  //   const isValidLogin = await loginUser(email, password);

  //   if (!isValidLogin) {
  //     setShowError(true);
  //     setTimeout(() => setShowError(false), 3000);
  //     return;
  //   }

  //  // Todo: navegar a la pantalla que el usuario estaba
  //  const destination = router.query.p?.toString() || '/';
  //  router.replace(destination);

  const isValidLogin = await signIn('credentials', {email, password });
  if (!isValidLogin) {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

  };

  return (
    <AuthLayout title="Ingresar">
      <form  onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={"h1"}>
                Iniciar sesion
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent="end">
              <Link href={  router.query.p?.toString() ? `/auth/register?p=${ router.query}`: '/auth/register'} underline="always">
                ¿No tienes cuenta?
              </Link>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                             {
                                Object.values( providers ).map(( provider: any ) => {
                                    
                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            className="circular-btn"
                                            variant="outlined"
                                            fullWidth
                                            color="secondary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                }) 
                            } 

                        </Grid>
          </Grid>
        </Box>
      </form>
      </AuthLayout>
    );
  
  }



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
export default LoginPage;
