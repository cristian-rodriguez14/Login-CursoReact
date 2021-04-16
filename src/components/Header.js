import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  navbar: {
    border: "2px solid green",
  },
  title: {
    marginLeft: "20px",
    fontWeight: "bold",
    fontSize: "20px",
  },
  buttons: {
    display: "flex",
  },
  register: {
    marginLeft: "25%",
  },
  login: {
    marginLeft: "25%",
  },
});

export default function Header({ check, setCheck }) {
  const classes = useStyles();
  const history = useHistory();
  const handleLogout = () => {
    setCheck(null);
    history.push("/");
  };
  return (
    <>
      <Grid className={classes.navbar} container>
        {check === false ? (
          <Grid item xs={6}>
            <h2 className={classes.title}>Login con React</h2>
          </Grid>
        ) : (
          <Grid item xs={6}>
            <h2 className={classes.title}>Bienvenido al buscador de canciones</h2>
          </Grid>
        )}
        {check === false ? (
          <Grid className={classes.buttons} item xs={6}>
            <Button href={"/login"} color="primary" className={classes.login}>
              Iniciar Sesion
            </Button>
            <Button
              href={"/register"}
              color="primary"
              className={classes.register}
            >
              Registrarse
            </Button>
          </Grid>
        ) : (
          <Grid className={classes.buttons} item xs={6}>
            <Button href={"/"} color="primary" onClick={handleLogout}>
              Cerrar Sesion
            </Button>
          </Grid>
        )}
      </Grid>
      <div className="navbar"></div>
    </>
  );
}
