import React from 'react';
import '../App.css'; // Asegúrate de que la ruta es correcta

const Servicios = () => {
  const listaServicios = [
    {
      nombre: 'Instalación de cerámicos',
      descripcion: 'Servicio profesional de instalación de cerámicos para pisos y paredes.',
      imagen: 'img/ceramicos.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Pintura de interiores',
      descripcion: 'Pintura de alta calidad para interiores de viviendas y oficinas.',
      imagen: 'img/pintura_interior.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Construcción de murallas y portones',
      descripcion: 'Construcción resistente y segura de murallas y portones.',
      imagen: 'img/murallas_portones.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Instalación de porcelanato',
      descripcion: 'Instalación de porcelanato con acabados profesionales.',
      imagen: 'img/porcelanato.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Pintura de exteriores',
      descripcion: 'Pintura duradera y resistente para exteriores de edificios.',
      imagen: 'img/pintura_exterior.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Piso flotante',
      descripcion: 'Instalación de pisos flotantes con materiales de alta calidad.',
      imagen: 'img/piso_flotante.jpg', // Asegúrate de que la ruta es correcta
    },
    {
      nombre: 'Piso vinílico',
      descripcion: 'Instalación de pisos vinílicos con diferentes estilos y colores.',
      imagen: 'img/piso_vinilico.jpg', // Asegúrate de que la ruta es correcta
    },
  ];

  return (
    <div className="servicios-container">
      <h1>Nuestros Servicios</h1>
      <div className="servicios-lista animate__animated animate__fadeIn">
        {listaServicios.map((servicio, index) => (
          <div className="servicio-item" key={index}>
            <img src={servicio.imagen} alt={servicio.nombre} />
            <h2>{servicio.nombre}</h2>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;