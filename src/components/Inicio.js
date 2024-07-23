import React from 'react';
import '../App.css';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1 className="animate__animated animate__fadeInDown">Bienvenido a La Casa de Papel</h1>
      <p className="animate__animated animate__fadeInUp">Somos una empresa constructora con más de 20 años de experiencia, comprometidos con la calidad y la excelencia en cada uno de nuestros proyectos. Ofrecemos una amplia gama de servicios que incluyen la instalación de cerámicos, pintura de interiores y exteriores, construcción de murallas y portones, y mucho más. Nuestra misión es brindar un servicio de alta calidad y superar las expectativas de nuestros clientes.</p>
      <img src="/img/empresa_imagen.jpg" alt="Imagen de la empresa" className="empresa-imagen animate__animated animate__fadeIn" />
    </div>
  );
}

export default Inicio;