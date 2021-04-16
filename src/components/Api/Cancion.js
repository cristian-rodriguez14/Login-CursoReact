import React from 'react';

const Cancion = ({letra}) => {

    if(letra.length === 0) return null;

    return ( 
        <>
            <h2>Letra Canción</h2>
            <p style={{whiteSpace: "pre-wrap"}}>{letra}</p>
        </>
    );
}
 
export default Cancion;
