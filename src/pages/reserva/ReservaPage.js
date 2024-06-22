import React, { useState, useEffect } from 'react';
import '../../assets/styles/Pages.css';
import { Link } from 'react-router-dom';

const ReservaPage = () => {
  const [reservas, setReservas] = useState([]);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarError, setMostrarError] = useState(false); 
  const [mostrarExito, setMostrarExito] = useState(false);

  function mostrarErrorOn() {
    setMostrarError(true);
    setTimeout(() => {
        setMostrarError(false);
        setError(null);
        setExito(null);
    }, 5000);
  }

  function mostrarExitoOn(){
    setMostrarExito(true);
    setTimeout(() => {
        setMostrarExito(false);
        setError(null);
        setExito(null);
    }, 5000);
  }

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
        console.error('Error al obtener las reservas:');
        setError(error.message);
        mostrarErrorOn()
      }
    };

    fetchReservas();
  }, []);

  const handleEliminarReserva = async (EliminarReserva) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la reserva con fecha de inicio ${EliminarReserva.fecha_desde}?`)) {
      try {
        const response = await fetch(`http://localhost/reservas/${EliminarReserva.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        if (data.status === 'success') {
        setReservas(reservas.filter(reserva => reserva.id !== EliminarReserva.id));
        setExito(data.message);
        mostrarExitoOn()
      } else {
        setError(data.message || 'Error desconocido en la API');
        mostrarErrorOn()
      }
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
      setError('Error al eliminar la reserva');
      mostrarErrorOn()
      }
    }
  };

  return (
    <div className="page">
      <h1>Reservas</h1>

      {exito && mostrarExito && (
        <p className="mensaje-exito mostrar">{exito}</p>
    ) }

      {error && mostrarError &&  (
        <p className="error-message mostrar">Error: {error}</p>
      )}

      <div className="header">
        <Link to="/reservas/nuevo" className="btn btn-primary">Crear Nueva Reserva</Link>
      </div>

      {reservas.length > 0 ? (
        <ul className="list">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="card">
              <h2>{`${reserva.nombre_inquilino} ${reserva.apellido_inquilino}`}</h2>
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
                <button className="btn-eliminar" onClick={() => handleEliminarReserva(reserva)}>Eliminar</button>
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
