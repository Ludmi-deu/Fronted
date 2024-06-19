import React, { useState, useEffect } from 'react';
import './ReservaPage.css';
import { Link } from 'react-router-dom'; // Importar Link

const ReservaPage = () => {
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
  const [error, setError] = useState(null); // Estado para mensajes de error
  const [mensajeEliminacion, setMensajeEliminacion] = useState(null); // Nuevo estado para el mensaje
  const [mostrarError, setMostrarError] = useState(false); // Estado para mostrar mensaje de error
  const [mostrarExito, setMostrarExito] = useState(false); // Estado para mostrar mensaje de éxito
  useEffect(() => {
    const fetchReservas = () => {
      fetch('http://localhost/reservas') // Reemplazar con su punto final de API
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {
            // Procesar los datos de la reserva
            const processedReservas = data.data.map((reserva) => {
              // Obtener el domicilio de la tabla "propiedad"
              return fetch(`http://localhost/propiedades/${reserva.propiedad_id}`)
                .then(propiedadResponse => {
                  if (!propiedadResponse.ok) {
                    throw new Error('Error al obtener la propiedad');
                  }
                  return propiedadResponse.json();
                })
                .then(propiedadData => {
                  const domicilio = propiedadData.data.domicilio;
  
                  // Obtener nombre y apellido de la tabla "inquilino"
                  return fetch(`http://localhost/inquilinos/${reserva.inquilino_id}`)
                    .then(inquilinoResponse => {
                      if (!inquilinoResponse.ok) {
                        throw new Error('Error al obtener el inquilino');
                      }
                      return inquilinoResponse.json();
                    })
                    .then(inquilinoData => {
                      const nombre = inquilinoData.data.nombre;
                      const apellido = inquilinoData.data.apellido;
  
                      // Combinar los datos procesados
                      return {
                        ...reserva,
                        domicilio,
                        nombreCompleto: `${nombre} ${apellido}`,
                      };
                    });
                });
            });
  
            setReservas(processedReservas);
          } else {
            throw new Error(data.message || 'Error desconocido en la API');
          }
        })
        .catch(error => {
          console.error('Error al obtener las reservas:', error);
          setError('Error al obtener las reservas');
        });
    };
  
    fetchReservas();
  }, []);
  

  const handleEliminarReserva = async (tipoId) => {
    const fechaActual = new Date();
    const fechaDesdeReserva = new Date(reservas.find(tipo => tipo.id === tipoId)?.fecha_desde);

  if (fechaActual >= fechaDesdeReserva) {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la reserva? "${reservas.find(tipo => tipo.id === tipoId)?.fecha_desde}"?`)) {
      try {
        const response = await fetch(`http://localhost/reservas/${tipoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setReservas(reservas.filter(tipo => tipo.id !== tipoId));
          setMostrarExito(true); // Mostrar mensaje de éxito
          setTimeout(() => {
            setMostrarExito(false);
            setError(null); // Reiniciar el estado de error (por si acaso)
          }, 3000); 
        } else {
          setError(data.message || 'Error desconocido en la API');
          setMostrarError(true); 
          setTimeout(() => {
            setMostrarError(false);
          }, 3000); // Actualizar el estado del mensaje

        }
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        setError('Error al eliminar la reserva');
      }
    }
  }else {
      setError('No se puede eliminar una reserva que ya ha comenzado.');
      setMostrarError(true);
      setTimeout(() => {
        setMostrarError(false);
      }, 3000);
    }
  };

  return (
    <div className="reservas-page">
      <h1>Reservas</h1>

      {mostrarExito && (
        <p className="mensaje-exito mostrar">Reserva eliminada con éxito</p>
      )}

      {error && mostrarError && (
        <p className="error-message mostrar">Error: {error}</p>
      )}

      <Link to="/reservas/nuevo" className="btn btn-primary">
        Nueva reserva
      </Link>

      {Array.isArray(reservas) && reservas.length > 0 ? (
        <ul className="reservas-list">
          {reservas.map((reservas) => (
            <li key={reservas.id} className="reservas-card">
              <h2>{reservas.nombreCompleto}</h2>
              <div className="card-details">
                <p>Propiedad: {reservas.domicilio}</p>
                <p>Inquilino: {reservas.nombreCompleto}</p>
                <p>Fecha desde: {reservas.fecha_desde}</p>
                <p>Cantidad de noches: {reservas.cantidad_noches}</p>
                <p>Valor total: {reservas.valor_total}</p>
              </div>
            
              <div className="card-actions">
            
                <Link
                  to={`/reservas/editar/${reservas.id}`}
                  className="btn-editar"
                  state={{
                    propiedadId: reservas.propiedad_id,
                    inquilinoId: reservas.inquilino_id,
                    fechaDesde: reservas.fecha_desde,
                    cantidadNoches: reservas.cantidad_noches,
                    valorTotal: reservas.valor_total,
                  }}
                />        
                <button className="btn-eliminar" onClick={() => handleEliminarReserva(reservas.id)}>Eliminar</button>
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