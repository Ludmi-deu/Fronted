import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación

const DropdownMenu = ({ options, isOpen }) => {
  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Link to={`/tipopropiedad/${option.toLowerCase()}`}>{option}</Link> {/* Redirecciona a la ruta correspondiente */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;