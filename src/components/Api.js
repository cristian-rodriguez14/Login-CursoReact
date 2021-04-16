import React, { useState, useEffect } from "react";
import Formulario from "./Api/Formulario";
import Cancion from "./Api/Cancion";
import Info from "./Api/Info";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import {useHistory} from "react-router";

export default function Api({check, setCheck}) {
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (check===false) {
      history.push("/");
    }
  }, [check, history]);

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      

      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);

      // guardarLetra(resultado.data.lyrics);
    };
    consultarApiLetra();
  }, [busquedaletra, info]);
  const fecha = new Date().getFullYear();
  return (
    <>
    <Header check={check} setCheck={setCheck}/>
    <Grid item xs={12} style={{marginBottom: "2rem"}}></Grid>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra}/>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Info info={info} />
        </Grid>
        <Grid item xs={6}>
          <Cancion letra={letra} />
        </Grid>
      </Grid>
      <Footer fecha={fecha} style={{marginLeft: "1rem"}} />
    </>
  );
}
