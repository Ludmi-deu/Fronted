import React, { useState, useEffect } from 'react';
import './NewReserva.css';
import { fetchPropiedades } from '../../utils/api';
import { fetchInquilinos } from '../../utils/api';

const NewReserva = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [propiedadId, setPropiedadId] = useState('');
    const [inquilinoId, setInquilinoId] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [cantidadNoches, setCantidadNoches] = useState('');
    const [valorNoche, setValorNoche] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Cargar propiedades e inquilinos al montar el componente
    useEffect(() => {
            const cargarPropiedades = async () => {
              try {
                const propiedadesData = await fetchPropiedades();
                setPropiedades(propiedadesData);
              } catch (error) {
                console.error('Error al cargar propiedades:', error);
              }
            };
        
      
            const cargarInquilinos = async () => {
              try {
                const inquilinosData = await fetchInquilinos();
                setInquilinos(inquilinosData);
              } catch (error) {
                console.error('Error al cargar inquilinos:', error);
              }
            };
      
        cargarPropiedades();
        cargarInquilinos();
      }, []);
      
      const handleSubmit = async (event) => {
        event.preventDefault();

        if (!propiedadId || !inquilinoId || !fechaDesde || !cantidadNoches || !valorNoche) {
            setMensaje('Todos los campos son obligatorios.');
            return;
        }

        try {
            const datosReserva = {
                propiedad_id: propiedadId,
                inquilino_id: inquilinoId,
                fecha_desde: fechaDesde,
                cantidad_noches: cantidadNoches,
                valor_noche: valorNoche,
            };

            const response = await fetch('http://localhost/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReserva),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();
            setMensaje('Reserva creada correctamente.');

            // Limpiar los campos del formulario después de enviar la reserva
            setPropiedadId('');
            setInquilinoId('');
            setFechaDesde('');
            setCantidadNoches('');
            setValorNoche('');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            setMensaje('Error al crear la reserva.');
        }
    };

    return (
        <div className="new-reserva-page">
            <h1>Crear una Nueva Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propiedadId">Propiedad:</label>
                    <select
                        id="propiedadId"
                        value={propiedadId}
                        onChange={(e) => setPropiedadId(e.target.value)}
                    >
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map((propiedad) => (
                            <option key={propiedad.id} value={propiedad.id}>
                                {propiedad.domicilio}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="inquilinoId">Inquilino:</label>
                    <select
                        id="inquilinoId"
                        value={inquilinoId}
                        onChange={(e) => setInquilinoId(e.target.value)}
                    >
                        <option value="">Selecciona un inquilino</option>
                        {inquilinos.map(inquilino => (
                            <option key={inquilino.id} value={inquilino.id}>{inquilino.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fechaDesde">Fecha desde:</label>
                    <input
                        type="date"
                        id="fechaDesde"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cantidadNoches">Cantidad de noches:</label>
                    <input
                        type="number"
                        id="cantidadNoches"
                        value={cantidadNoches}
                        onChange={(e) => setCantidadNoches(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="valorNoche">Valor por noche:</label>
                    <input
                        type="number"
                        id="valorNoche"
                        value={valorNoche}
                        onChange={(e) => setValorNoche(e.target.value)}
                    />
                </div>

                <button type="submit">Crear Reserva</button>
            </form>
            {mensaje && (
                <p className={mensaje.includes('Error') ? 'mensaje-error' : 'mensaje-exito'}>
                    {mensaje}
                </p>
            )}
        </div>
    );
};

export default NewReserva;