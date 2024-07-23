import React from 'react';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4>La Casa de Papel</h4>
          <p>Información de contacto y enlaces rápidos.</p>
        </div>
        <div>
          <p><strong>Ubicación:</strong> Osorno, Chile</p>
          <p><strong>Teléfono:</strong> +569 5942 4216</p>
          <p><strong>Email:</strong> eliasoyarzunccp@lacasadepapel.com</p>
        </div>
        <div className="footer-links">
          <a href="#enlace1">Enlace 1</a>
          <a href="#enlace2">Enlace 2</a>
          <a href="#enlace3">Enlace 3</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 La Casa de Papel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;