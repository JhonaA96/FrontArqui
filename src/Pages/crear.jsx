import React from 'react';
import '../estilos/index.css';

export function crear(){
    return(
        <div>
            <h1>Crear usuario</h1>

            <label>Nombre</label>
            <input type="text" name="nombre"  placeholder='Tú nombre acá'/>

            <label>Correo Electronico</label>
            <input type="email" name="correo"  placeholder='Tú correo acá'/>

            <label>Usuario</label>
            <input type="text" name="usuario"  placeholder='Tú usuario acá'/>

            <label>Contraseña</label>
            <input type="password" name="password" />

            <label>Telefono</label>
            <input type="number" name="telefono" />
            
            <a href="/index">aceptar</a>
            <a href="/index">cancelar</a>
        </div>

    );
}