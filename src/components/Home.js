import React, {useEffect} from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { Grid, makeStyles } from "@material-ui/core";
import {useHistory} from "react-router";

const useStyles = makeStyles({
  middle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  bottom: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
});


export default function Home({check, setCheck}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();
  const fecha = new Date().getFullYear();
  const history = useHistory();
  useEffect(() => {
    if (check===false) {
      history.push("/");
    }
  }, [check, history]);

  return (
    <>
      <Grid className="container" container spacing={3}>
        <Grid item xs={12}>
          <Header check={check} setCheck={setCheck} />
        </Grid>
        <Grid
          className={classes.middle}
          item
          xs={12}
        >
          <Body titulo="Iniciar Sesion con React" />
        </Grid>
        <Grid className={classes.bottom} item xs={12}>
          <Footer fecha={fecha} />
        </Grid>
      </Grid>
    </>
  );
}
