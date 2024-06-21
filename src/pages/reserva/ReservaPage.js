import React, { useState, useEffect } from 'react';
import './ReservaPage.css';
import { Link } from 'react-router-dom';

const ReservaPage = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost/reservas'); // Ajusta el puerto según tu configuración Docker
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (data.status === 'success') {
          setReservas(data.data);
        } else {
          throw new Error(data.message || 'Error desconocido en la API');
        }
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
        setError(error.message);
      }
    };

    fetchReservas();
  }, []);

  const handleEliminarReserva = async (id) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la reserva con ID ${id}?`)) {
      try {
        const response = await fetch(`http://localhost/reservas/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        // Actualizar lista de reservas después de eliminación
        setReservas(reservas.filter(reserva => reserva.id !== id));
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        setError('Error al eliminar la reserva');
      }
    }
  };

  return (
    <div className="reservas-page">
      <h1>Reservas</h1>

      {error && (
        <p className="error-message mostrar">Error: {error}</p>
      )}

      <div className="reservas-header">
        <Link to="/reservas/nuevo" className="btn btn-primary">Crear Nueva Reserva</Link>
      </div>

      {reservas.length > 0 ? (
        <ul className="reservas-list">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="reservas-card">
              <h2>{`${reserva.nombre} ${reserva.apellido}`}</h2>
              <div className="card-details">
                <p>Propiedad: {reserva.domicilio}</p>
                <p>Fecha desde: {reserva.fecha_desde}</p>
                <p>Cantidad de noches: {reserva.cantidad_noches}</p>
                <p>Valor total: {reserva.valor_total}</p>
              </div>
              <div className="card-actions">
                {/* Corregir el uso de template literal con backticks (`) */}
                <Link
                  to={{
                    pathname: `/reservas/editar/${reserva.id}`, // Utilizar backticks (`) para template literal
                    state: { reserva } // Pasar la reserva como estado
                  }}
                >
                  <button className="btn-editar">Editar</button>
                </Link>
                <button className="btn-eliminar" onClick={() => handleEliminarReserva(reserva.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default ReservaPage;
