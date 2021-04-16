import React from 'react'

export default function Body({ titulo }) {
    return (
        <>
            <h1 className="titulo">{titulo}</h1>
            <h4 className="mensaje">Esta es la página de inicio de la aplicación de ejemplo del curso de React</h4>
            <span style={{textAlign: "center"}}>Para continuar por favor de click en alguno de los botones de la barra de navegación</span>
        </>
    );
}
