import React, { useState, useEffect, useMemo } from 'react';

function Cotizar() {
  const [tipoCotizacion, setTipoCotizacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comuna, setComuna] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [metrosCuadrados, setMetrosCuadrados] = useState({});
  const [costoTotal, setCostoTotal] = useState(0);
  const [resumenServicios, setResumenServicios] = useState([]);
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  const servicios = useMemo(() => [
    { nombre: 'Instalación de cerámicos', costo: 50000 },
    { nombre: 'Pintura de interiores', costo: 30000 },
    { nombre: 'Construcción de murallas y portones', costo: 70000 },
    { nombre: 'Instalación de porcelanato', costo: 55000 },
    { nombre: 'Pintura de exteriores', costo: 35000 },
    { nombre: 'Piso flotante', costo: 60000 },
    { nombre: 'Piso vinílico', costo: 40000 },
  ], []);

  const handleTipoCotizacionChange = (e) => {
    setTipoCotizacion(e.target.value);
    setCostoTotal(0);
    setResumenServicios([]);
  };

  const handleServicioChange = (servicio) => {
    setServiciosSeleccionados(prevState => {
      if (prevState.includes(servicio)) {
        return prevState.filter(s => s !== servicio);
      } else {
        return [...prevState, servicio];
      }
    });
  };

  const handleMetrosCuadradosChange = (servicio, value) => {
    setMetrosCuadrados(prevState => ({
      ...prevState,
      [servicio]: value,
    }));
  };

  useEffect(() => {
    const costo = serviciosSeleccionados.reduce((total, servicioNombre) => {
      const servicio = servicios.find(s => s.nombre === servicioNombre);
      const metros = metrosCuadrados[servicioNombre] || 0;
      return total + (servicio ? servicio.costo * parseFloat(metros) : 0);
    }, 0);
    setCostoTotal(costo);

    const resumen = serviciosSeleccionados.map(servicioNombre => ({
      nombre: servicioNombre,
      metros: metrosCuadrados[servicioNombre] || 0,
      costo: (servicios.find(s => s.nombre === servicioNombre).costo || 0) * (metrosCuadrados[servicioNombre] || 0)
    }));
    setResumenServicios(resumen);
  }, [serviciosSeleccionados, metrosCuadrados, servicios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoCotizacion === 'proyecto') {
      if (nombre && email && telefono && comuna && proyecto) {
        setHistorialCotizaciones(prevState => [
          ...prevState,
          {
            nombre,
            email,
            telefono,
            tipoCotizacion,
            comuna,
            proyecto,
            costoTotal
          }
        ]);
      } else {
        alert('Por favor, complete todos los campos.');
      }
    } else {
      if (nombre && email && telefono && serviciosSeleccionados.length > 0 && Object.values(metrosCuadrados).every(value => value > 0)) {
        setHistorialCotizaciones(prevState => [
          ...prevState,
          {
            nombre,
            email,
            telefono,
            tipoCotizacion,
            servicios: resumenServicios,
            costoTotal
          }
        ]);
      } else {
        alert('Por favor, complete todos los campos y seleccione al menos un servicio.');
      }
    }
  };

  return (
    <div className="cotizar-container">
      <div className="total-tiempo-real">
        <h3>Total en Tiempo Real</h3>
        <p>Costo Total: ${costoTotal.toLocaleString()}</p>
        <ul>
          {resumenServicios.map((servicio, index) => (
            <li key={index}>
              {servicio.nombre}: {servicio.metros} m² - ${servicio.costo.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="form-cotizar">
        <h1 className="mb-4">Cotizar</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo de Cotización:
            <select value={tipoCotizacion} onChange={handleTipoCotizacionChange} required>
              <option value="">Seleccione un tipo de cotización</option>
              <option value="proyecto">Proyecto</option>
              <option value="servicios">Servicios</option>
            </select>
          </label>
          
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Teléfono:
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          </label>
          {tipoCotizacion === 'proyecto' && (
            <>
              <label>
                Comuna:
                <input type="text" value={comuna} onChange={(e) => setComuna(e.target.value)} required />
              </label>
              <label>
                Descripción del Proyecto:
                <textarea value={proyecto} onChange={(e) => setProyecto(e.target.value)} required />
              </label>
            </>
          )}

          {tipoCotizacion === 'servicios' && (
            <div>
              {servicios.map((servicio, index) => (
                <div key={index} className="servicio-checkbox">
                  <label>
                    {servicio.nombre}
                    <input
                      type="checkbox"
                      value={servicio.nombre}
                      checked={serviciosSeleccionados.includes(servicio.nombre)}
                      onChange={() => handleServicioChange(servicio.nombre)}
                    />
                  </label>
                  {serviciosSeleccionados.includes(servicio.nombre) && (
                    <label className="metros-cuadrados">
                      Metros Cuadrados:
                      <input
                        type="number"
                        value={metrosCuadrados[servicio.nombre] || ''}
                        onChange={(e) => handleMetrosCuadradosChange(servicio.nombre, e.target.value)}
                        required
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}

          <button type="submit">{tipoCotizacion === 'proyecto' ? 'Enviar Cotización' : 'Solicitar Servicios'}</button>
        </form>
      </div>

      <div className="cotizar-historial">
        <h3>Historial de Cotizaciones</h3>
        {historialCotizaciones.length === 0 ? (
          <p>No hay cotizaciones previas.</p>
        ) : (
          historialCotizaciones.map((cotizacion, index) => (
            <div key={index} className="historial-item">
              <p><strong>Nombre:</strong> {cotizacion.nombre}</p>
              <p><strong>Email:</strong> {cotizacion.email}</p>
              <p><strong>Teléfono:</strong> {cotizacion.telefono}</p>
              <p><strong>Tipo de Cotización:</strong> {cotizacion.tipoCotizacion}</p>
              {cotizacion.tipoCotizacion === 'proyecto' ? (
                <>
                  <p><strong>Comuna:</strong> {cotizacion.comuna}</p>
                  <p><strong>Descripción del Proyecto:</strong> {cotizacion.proyecto}</p>
                </>
              ) : (
                <>
                  <p><strong>Servicios:</strong></p>
                  <ul>
                    {cotizacion.servicios.map((servicio, idx) => (
                      <li key={idx}>{servicio.nombre}: {servicio.metros} m² - ${servicio.costo.toLocaleString()}</li>
                    ))}
                  </ul>
                </>
              )}
              <p><strong>Costo Total:</strong> ${cotizacion.costoTotal.toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cotizar;
