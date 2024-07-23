import React from 'react';

function Historial({ cotizaciones }) {
  return (
    <div className="container my-4">
      <h2>Historial de Cotizaciones</h2>
      {cotizaciones.length === 0 ? (
        <p>No hay cotizaciones previas.</p>
      ) : (
        <ul>
          {cotizaciones.map((cotizacion, index) => (
            <li key={index}>
              <h3>Cotización {index + 1}</h3>
              <p><strong>Nombre:</strong> {cotizacion.nombre}</p>
              <p><strong>Email:</strong> {cotizacion.email}</p>
              <p><strong>Teléfono:</strong> {cotizacion.telefono}</p>
              <p><strong>Servicios:</strong></p>
              <ul>
                {cotizacion.servicios.map((servicio, i) => (
                  <li key={i}>{servicio.nombre}: {servicio.metros} m² - ${servicio.costo.toLocaleString()}</li>
                ))}
              </ul>
              <p><strong>Costo Total:</strong> ${cotizacion.costoTotal.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Historial;