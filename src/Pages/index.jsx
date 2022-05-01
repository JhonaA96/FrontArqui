import React from 'react';
import '../estilos/index.css';

export function index(){
    return(
        <div>
            <a href="/crear">crear usuario</a>
        <table>
            <tr>
                <td>id</td>
                <td>Nombres</td>
                <td>Usuario</td>
                <td>E-Mail</td>
                <td>Contraseña</td>
                <td>Teléfono</td>
                <td>Acciones</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Julian Orley Sosa</td>
                <td>jososa86</td>
                <td>jososa86@ucatolica.edu.co</td>
                <td>AngieAmor</td>
                <td>123456</td>
                <td>
                    <a href="/editar">Editar</a>
                    <a href="">Eliminar</a>
                </td>
            </tr>
        </table>
        </div>
    )
}