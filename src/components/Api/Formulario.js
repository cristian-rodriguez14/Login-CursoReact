import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  titulo: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontSize: 30,
    color: "rgba(160,20,20,1)",
  },
  fila: { display: "flex", textAlign: "center" },
  etiqueta: { float: "right", marginRight: "4rem" },
  texto: { float: "left", marginLeft: "2rem" },
  filaBoton: {
    alignItems: "center",
    textAlign: "center",
  },
});

const Formulario = ({ guardarBusquedaLetra }) => {
  const classes = useStyles();
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });
  const [error, guardarError] = useState(false);

  const { artista, cancion } = busqueda;

  // función a cada input para leer su contenido
  const actualizarState = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // consultar las apis
  const buscarInformacion = (e) => {
    e.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    // Todo bien, pasar al componente principal

    guardarBusquedaLetra(busqueda);
  };

  return (
    <Grid className="bg-info">
      {error ? (
        <p className="alert alert-danger text-center p-2">
          Todos los campos son obligatorios
        </p>
      ) : null}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <form onSubmit={buscarInformacion}>
            <fieldset>
              <legend className={classes.titulo}>
                Buscador Letras Canciones
              </legend>

              <Grid item xs={12} className={classes.fila}>
                <Grid item xs={6}>
                  <label className={classes.etiqueta}>Artista</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="text"
                    name="artista"
                    className={classes.texto}
                    placeholder="Nombre Artista"
                    onChange={actualizarState}
                    value={artista}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.fila}>
                <Grid item xs={6}>
                  <label className={classes.etiqueta}>Canción</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="text"
                    className={classes.texto}
                    name="cancion"
                    placeholder="Nombre Canción"
                    onChange={actualizarState}
                    value={cancion}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.filaBoton}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  Buscar
                </Button>
              </Grid>
            </fieldset>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Formulario;
