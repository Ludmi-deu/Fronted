import React from 'react';
import '../assets/styles/NavBar.css';


function NavbarComponent() {

  return (
    <nav className="navbar">
      <ul>
        <a href="/" className="nav-item">Inicio</a>
        <a href="/tipoPropiedad" className="nav-item">Tipo de Propiedad</a>
        <a href="/propiedades" className="nav-item">Propiedades</a>
        <a href="/reservas" className="nav-item">Reservas</a>
        <a href="/localidades" className="nav-item">Localidades</a>
        <a href="/inquilinos" className="nav-item">Inquilinos</a>
      </ul>
    </nav>
  );
}

export default NavbarComponent;

