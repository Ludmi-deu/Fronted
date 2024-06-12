import React, { useState } from 'react';
import '../assets/styles/NavBar.css';
import DropdownMenu from './MenuDesplegable';

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const tipoPropiedadOptions = ['editar', 'nuevo']; // Opciones para Tipo de Propiedad

  return (
    <nav className="navbar">
      <ul>
        <a href="/" className="nav-item">Inicio</a>
        <a href="/tipos-propiedad" className="nav-item" onClick={toggleMenu}>Tipo de Propiedad</a>
        <a href="/propiedades" className="nav-item">Propiedades</a>
        <a href="/reservas" className="nav-item">Reservas</a>
        <a href="/localidades" className="nav-item">Localidades</a>
        <a href="/inquilinos" className="nav-item">Inquilinos</a>
      </ul>
      {isOpen && <DropdownMenu options={tipoPropiedadOptions} />} {/* Renderiza el menú desplegable si isOpen es true */}
    </nav>
  );
}

export default NavbarComponent;

