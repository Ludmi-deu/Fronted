import React, { useState, useEffect } from 'react';
import './TipoPropiedadPage.css';
import { Link } from 'react-router-dom'; // Importar Link


const TipoPropiedadPage = () => {
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [error, setError] = useState(null);
  const [mensajeEliminacion, setMensajeEliminacion] = useState(null); // Nuevo estado para el mensaje

  useEffect(() => {
    const fetchTiposPropiedad = async () => {
      try {
        const response = await fetch('http://localhost/tipos_propiedad'); 
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();

        if (data.status === 'success') { // Verificar el estado de la respuesta
          setTiposPropiedad(data.data); // Acceder a los datos dentro de la respuesta
        } else {
          throw new Error(data.message || 'Error desconocido en la API'); 
        }
      } catch (error) {
        console.error('Error al obtener los tipos de propiedad');
      }
    };

    fetchTiposPropiedad();
  }, []);

  const handleEliminarTipoPropiedad = async (tipoId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el tipo de propiedad "${tiposPropiedad.find(tipo => tipo.id === tipoId)?.nombre}"?`)) {
      try {
        const response = await fetch(`http://localhost/tipos_propiedad/${tipoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setTiposPropiedad(tiposPropiedad.filter(tipo => tipo.id !== tipoId));
        } else {
          setError(data.message || 'Error desconocido en la API');
          setMensajeEliminacion(data.message || 'Error desconocido en la API'); // Actualizar el estado del mensaje

        }
      } catch (error) {
        console.error('Error al eliminar el tipo de propiedad:', error);
        setError('Error al eliminar el tipo de propiedad');
      }
    }
  };

  return (
    <div className="tipo-propiedad-page">
      
      <h1>Tipos de propiedad</h1>
      <Link to="/tipoPropiedad/nuevo" className="btn btn-primary">
        Nuevo tipo de propiedad
      </Link>

      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : Array.isArray(tiposPropiedad) && tiposPropiedad.length > 0 ? (
        <ul className="tipo-propiedad-list">
          {tiposPropiedad.map(tipo => (
            <li key={tipo.id} className="tipo-propiedad-card">
              <h2>{tipo.nombre}</h2>
              <div className="card-actions"> {/* Nuevo contenedor */}
              <Link to={`/tipo-propiedad/editar/${tipo.id}`}>
               <button className="btn-editar"
                state={{ nombre: tipo.nombre }} 
               >Editar</button>
              </Link>                
              <button className="btn-eliminar" onClick={() => handleEliminarTipoPropiedad(tipo.id)} >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tipos de propiedad disponibles.</p> 
      )}
    </div>
  );
};

export default TipoPropiedadPage;