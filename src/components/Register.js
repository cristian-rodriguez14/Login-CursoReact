import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Button,
  Grid,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Header from "./Header";
import Footer from "./Footer";
import AlertaContext from "../context/alertas/alertaContext";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    background:
      "radial-gradient(circle, rgba(255,255,100,1) 0%, rgba(100,255,255,1) 50%, rgba(255,100,255,1) 100%)",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    marginTop: "8%",
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
  butons: {
    alignItems: "center",
    display: "flex",
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Register({ check, setCheck }) {
  const classes = useStyles();
  const fecha = new Date().getFullYear();
  const [users, setUsers] = useState([]);

  const addUser = async (user) => {
    const res = await fetch("http://localhost:5000/Usuarios", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    setUsers([...users, data]);
  };

  const [verify, setVerify] = useState({
    username: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { username, email, password, confirmar } = verify;
  const history = useHistory();
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const onChange = (e) => {
    setVerify({
      ...verify,
      [e.target.name]: e.target.value,
    });
    
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // validar
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    } else if (password.length < 6) {
      mostrarAlerta(
        "La contraseña debe ser de al menos 6 caracteres",
        "alerta-error"
      );
    } else if (password !== confirmar) {
      mostrarAlerta("Las contraseñas no coinciden", "alerta-error");
    } else {
      addUser({ username, email, password });
      setCheck(true);
      mostrarAlerta("Registro Exitoso", "alerta-ok");
      history.push("/api");
    } 
  };

  return (
    <>
      <Header check={check} setCheck={setCheck} />
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
                Registarse
              </Typography>
            </Grid>
            <form onSubmit={onSubmit}>
              {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>
                  {" "}
                  {alerta.msg}{" "}
                </div>
              ) : null}
              <Grid item xs={12} className={classes.formu}>
                <Grid item xs={6}>
                  <label htmlFor="username" style={{ fontWeight: 800 }}>
                    Username
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Escriba su usuario"
                    onChange={onChange}
                    value={username}
                  />
                </Grid>
              </Grid>
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
              <Grid item xs={12} className={classes.formu}>
                <Grid item xs={6}>
                  <label htmlFor="confirmar" style={{ fontWeight: 800 }}>
                    Confirmar Password
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="password"
                    id="confirmar"
                    name="confirmar"
                    placeholder="Escriba la contraseña"
                    onChange={onChange}
                    value={confirmar}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.butons}
                  variant="outlined"
                  type="submit"
                  style={{ color: "black", marginLeft: "4rem" }}
                  startIcon={<SaveIcon />}
                >
                  Guardar
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
          ></Grid>
        </CardActions>
      </Card>
      <Footer fecha={fecha} />
    </>
  );
}
