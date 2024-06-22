import React, {useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/EditPropiedades.css'; 

import { fetchPropiedadPorId, fetchLocalidades, fetchTiposPropiedad } from '../../utils/api';


const EditPropiedad = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);
    const [localidades,setLocalidades] = useState([]);
    const [tiposPropiedad,setTipoPropiedad] = useState([]);
    const [mostrarError, setMostrarError] = useState(false);
    const [mostrarExito, setMostrarExito] = useState(false);
    const [exito, setExito] = useState(false);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const cargarDatos = async () => {

            try {
                const propiedadData = await fetchPropiedadPorId(id);
                setPropiedad(propiedadData);

                const localidadesData = await fetchLocalidades();
                setLocalidades(localidadesData);

                const tiposPropiedadData = await fetchTiposPropiedad();
                setTipoPropiedad(tiposPropiedadData)
            } catch (error){
                console.log(error);
            }

        };

        cargarDatos();

    },[id]);

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

    const handleSubmit = async(event) => {

        const formDataToObject = (formData) => {
            const obj = {};
            formData.forEach((value, key) => {
              obj[key] = value;
            });
            return obj;
        };

        event.preventDefault();
        const formData = new FormData(event.target);
        
        const domicilio = formData.get('domicilio');
        const localidadId = formData.get('localidad_id');
        const cantidadHabitaciones = formData.get('cantidad_habitaciones');
        const cantidadBanios = formData.get('cantidad_banios');
        const cantidadHuespedes = formData.get('cantidad_huespedes');
        const fechaInicioDisponibilidad = formData.get('fecha_inicio_disponibilidad');
        const cantidadDias = formData.get('cantidad_dias');
        const valorNoche = formData.get('valor_noche');


        if (domicilio.trim() === '') { 
            setError('El domicilio es obligatorio.');
            mostrarErrorOn();
            return; 
        }

        if (localidadId === '') { 
            setError('Debes seleccionar una localidad.');
            mostrarErrorOn();
            return; 
        }

        if (cantidadHabitaciones !== ''){
            if(!/^\d+$/.test(cantidadHabitaciones)) {
                setError('La cantidad de huéspedes debe ser un número entero.');
                mostrarErrorOn();
                return;
            }
        } 


        if (cantidadBanios !==  ''){
            if(!/^\d+$/.test(cantidadBanios)) {
            setError('La cantidad de baños debe ser un número entero.');
            mostrarErrorOn();
            return;
            }
        } 

        if (cantidadHuespedes.trim() === ''){
            setError('La cantidad de huéspedes no puede estar vacío.');
            mostrarErrorOn();
            return;
        } else if(!/^\d+$/.test(cantidadHuespedes)) {
            setError('La cantidad de huéspedes debe ser un número entero.');
            mostrarErrorOn();
            return;
        }
        
        if (fechaInicioDisponibilidad.trim() === '') {
            setError('La fecha de inicio de disponibilidad es obligatoria.');
            mostrarErrorOn();
            return;
        }

        if (cantidadDias.trim() === '') {
            setError('La cantidad de días no puede estar vacío.');
            mostrarErrorOn();
            return;
          } else if (!/^\d+$/.test(cantidadDias)) {
            setError('La cantidad de días debe ser un número entero.');
            mostrarErrorOn();
            return;
          }
        
        if (valorNoche.trim() === '') {
            setError('El valor por noche no puede estar vacío.');
            mostrarErrorOn();
            return;
        } else if (!/^\d+$/.test(valorNoche)) {
            setError('El valor por noche debe ser un número entero.');
            mostrarErrorOn();
            return;
        }

        try {
            const dataToSend = {
                domicilio:domicilio,
                localidad_id:localidadId,
                cantidad_habitaciones:cantidadHabitaciones,
                cantidad_banios:cantidadBanios,
                cantidad_huespedes:cantidadHuespedes,
                fecha_inicio_disponibilidad:fechaInicioDisponibilidad,
                cantidad_dias:cantidadDias,
                valor_noche:valorNoche,
            }


            const response = await fetch(`http://localhost/propiedades/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if(response.ok){
                const data = await response.json();
                if(data.status ===  'success'){
                    console.log('success');
                    setExito(data.message);
                    mostrarExitoOn();
                    setPropiedad(await fetchPropiedadPorId(id));
                } else {
                    console.log('error: no success ',data.message);
                    setError(data.message);
                    mostrarErrorOn();
                }
            } else {
                throw new Error('Error en la respuesta de la API');
            }

        } catch(error){
            console.log('error ', error);
            setError(error);
            mostrarErrorOn();
        }
    }

 
    return (
        <div className='edit-propiedad-page'>
            <h1>Editar Propiedad</h1>
            {error && mostrarError && (
                <p className="error-message mostrar">Error: {error.message}</p>
            )}

            
            {mostrarExito && (
                <p className="mensaje-exito mostrar">
                    {exito}
                </p>
            )} 

            {propiedad ? (
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='domicilio'>Domicilio: </label>
                    <input type="text" id="domicilio" name="domicilio" defaultValue={propiedad.domicilio}></input>
                </div>
                
                <div>
                    <label htmlFor='localidad_id'>Localidad: </label>
                    <select id ="localidad_id" name="localidad_id" defaultValue={propiedad.localidad_id}>
                        {localidades.map(localidad => (
                            <option key={localidad.id} value={localidad.id}>
                                {localidad.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor='cantidad_habitaciones'>Cantidad de Habitaciones:</label>
                    <input type="number" id="cantidad_habitaciones"
                    name="cantidad_habitaciones" defaultValue={propiedad.cantidad_habitaciones} />
                </div>

                <div>
                    <label htmlFor='cantidad_banios'>Cantidad de baños:</label>
                    <input type="number" id="cantidad_banios" name="cantidad_banios" defaultValue={propiedad.cantidad_banios}/>
                </div>
                
                <div>
                    <label htmlFor='cochera'>Cochera:</label>
                    <input type='checkbox' id='cochera' name='cochera' defaultValue={propiedad.cochera}/>
                </div>
                
                <div>
                    <label htmlFor="cantidad_huespedes">Cantidad de huéspedes:</label>
                    <input type="number" id="cantidad_huespedes" name="cantidad_huespedes" defaultValue={propiedad.cantidad_huespedes} />
                </div>

                <div>
                    <label htmlFor="fecha_inicio_disponibilidad">Fecha de inicio de disponibilidad:</label>
                    <input type="date" id="fecha_inicio_disponibilidad" name="fecha_inicio_disponibilidad" defaultValue={propiedad.fecha_inicio_disponibilidad} />
                </div>

                <div>
                    <label htmlFor="cantidad_dias">Cantidad de días:</label>
                    <input type="number" id="cantidad_dias" name="cantidad_dias" defaultValue={propiedad.cantidad_dias} />
                </div>

                <div>
                    <label htmlFor="disponible">Disponible:</label>
                    <input type="checkbox" id="disponible" name="disponible" defaultChecked={propiedad.disponible} />
                </div>

                <div>
                    <label htmlFor="valor_noche">Valor por noche:</label>
                    <input type="number" id="valor_noche" name="valor_noche" defaultValue={propiedad.valor_noche} />
                </div>

                <div>
                    <label htmlFor="tipo_propiedad_id">Tipo de propiedad:</label>
                    <select id="tipo_propiedad_id" name="tipo_propiedad_id" defaultValue={propiedad.tipo_propiedad_id}>
                        {tiposPropiedad.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="imagen" className="custom-file-upload">
                        Seleccionar imagen
                        <input type="file" name="imagen" id="imagen" /> 
                    </label>

                    {propiedad.imagen && (
                        <div className='imagen-actual'>
                            Imagen actual: {propiedad.imagen}.{propiedad.tipo_imagen}
                        </div>
                    )}
                </div>
                <button type='submit'>Guardar</button>
                <button type="button" onClick={() => navigate(-1)}>Volver</button>
            </form>
            ) : (
                <p>Cargando propiedades..</p>
            )}

        </div>
    );
};

export default EditPropiedad;