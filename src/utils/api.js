export const fetchLocalidades = async () => {
    try {
      const response = await fetch('http://localhost/localidades');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar las localidades');
      }
    } catch (error) {
      console.error('Error al cargar las localidades:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };
  

  export const fetchPropiedades = async () => {
    try {
      const response = await fetch('http://localhost/propiedades');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar las propiedades');
      }
    } catch (error) {
      console.error('Error al cargar las propiedades:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };

  export const fetchInquilinos = async () => {
    try {
      const response = await fetch('http://localhost/inquilinos');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar los inquilinos');
      }
    } catch (error) {
      console.error('Error al cargar los inquilinos:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };

/*  export const crearReserva = async (datosReserva) => {
    try {
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
      return data;
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      return { error: error.message };
    }
  };*/

 /*const processedReservas = data.data.map((reserva) => {
    // Obtener el domicilio de la tabla "propiedad"
    const propiedadResponse = await fetch(`http://localhost/propiedad/${reserva.propiedad_id}`);
    if (!propiedadResponse.ok) {
      throw new Error('Error al obtener la propiedad');
    }
    const propiedadData = await propiedadResponse.json();
    const domicilio = propiedadData.data.domicilio;

    // Obtener nombre y apellido de la tabla "inquilino"
    const inquilinoResponse = await fetch(`http://localhost/inquilino/${reserva.inquilino_id}`);
    if (!inquilinoResponse.ok) {
      throw new Error('Error al obtener el inquilino');
    }
    const inquilinoData = await inquilinoResponse.json();
    const nombre = inquilinoData.data.nombre;
    const apellido = inquilinoData.data.apellido;

    // Combinar los datos procesados
    return {
      ...reserva,
      domicilio,
      nombreCompleto: `${nombre} ${apellido}`,
    };
  });*/