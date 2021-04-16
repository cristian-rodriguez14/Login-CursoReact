import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useHistory } from "react-router";
import AlertaContext from "../context/alertas/alertaContext";

const useStyles = makeStyles({
  root: {
    background:
      "radial-gradient(circle, rgba(255,255,100,1) 0%, rgba(100,255,255,1) 50%, rgba(255,100,255,1) 100%)",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    marginTop: "7%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    border: "1px solid red",
  },
  formu: {
    display: "flex",
    marginBottom: "2rem",
    marginTop: "1rem",
  },
  GoogleButton: {
    backgroundColor: "#ffffff00",
  },
  butons: {
    alignItems: "center",
    display: "flex",
    fontWeight: "bold",
  },
  bottom: {
    marginLeft: "1rem",
  },
});

export default function Login({ check, setCheck }) {
  const classes = useStyles();
  const fecha = new Date().getFullYear();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer);
    }
    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/Usuarios')
    const data = await res.json()
    return data
  };

  const [signin, setsignin] = useState({
    email: "",
    password: "",
  });

  const [google, setGoogle] = useState(null);
  const history = useHistory();
  const [facebook, setFacebook] = useState(null);
  const { email, password } = signin;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const onChange = (e) => {
    setsignin({
      ...signin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterEmail = users.filter((user) => user.eMail === email.trim());
    const filterPassword = users.filter(
      (user) => user.passWord === password.trim()
    );
    // validar
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    } else if (filterEmail.length === 0 || filterPassword.length === 0) {
      mostrarAlerta("Email o contraseña incorrectos", "alerta-error");
    } else {
      setCheck(true);
      mostrarAlerta("Login Exitoso", "alerta-ok");
      history.push("/api");
    }
  };

  const responseGoogle = (response) => {    
    setGoogle(response.profileObj);
  };

  useEffect(() => {
    if (google !== null || facebook !== null) {
      history.push("/api");
    }
  }, [google, facebook, history]);

  const responseFacebook = (response) => {
    setFacebook(response.profileObj);
  };

  return (
    <>
      <Header check={check} setCheck={setCheck}/>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h1" component="h1">
                Iniciar Sesion
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
              {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>
                  {" "}
                  {alerta.msg}{" "}
                </div>
              ) : null}
              <Grid item xs={12} className={classes.formu}>
                <Grid item xs={6}>
                  <label htmlFor="email" style={{ fontWeight: 800 }}>
                    Email
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Escriba el email"
                    onChange={onChange}
                    value={email}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.formu}>
                <Grid item xs={6}>
                  <label htmlFor="password" style={{ fontWeight: 800 }}>
                    Password
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Escriba la contraseña"
                    onChange={onChange}
                    value={password}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.butons}
                  variant="outlined"
                  type="submit"
                  style={{ color: "green", marginLeft: "4rem" }}
                  startIcon={<VpnKeyIcon />}
                >
                  Ingresar
                </Button>
              </Grid>
            </form>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <GoogleLogin
                clientId="397592795206-dvcvhmn1kkm80794obkla0rupmcvn9qi.apps.googleusercontent.com"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={renderProps.onClick}
                    label="Login con Google"
                    type="dark"
                    style={{
                      backgroundColor: "#ffffff00",
                      color: "red",
                      borderRadius: 5,
                      border: "1px solid gray",
                    }}
                  >
                    Login con Google
                  </GoogleButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Grid>
            <Grid item xs={12}>
              <FacebookLogin
                appId="735002167187321"
                autoLoad={false}
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    className={classes.butons}
                    variant="outlined"
                    type="submit"
                    style={{ color: "blue" }}
                    startIcon={<FacebookIcon />}
                  >
                    Inciar con Facebbok
                  </Button>
                )}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Footer fecha={fecha} className={classes.bottom} />
    </>
  );
}
