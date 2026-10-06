// Header: muestra el título de la app y el resumen (contadores).
// Solo recibe datos por props, no tiene estado propio.
function Header({ contadores }) {
  return (
    <header className="header">
      <h1>Inventario de productos</h1>
      <ul className="resumen">
        <li><strong>{contadores.total}</strong> Total</li>
        <li className="disponible"><strong>{contadores.disponibles}</strong> Disponibles</li>
        <li className="agotado"><strong>{contadores.agotados}</strong> Agotados</li>
        <li className="inactivo"><strong>{contadores.inactivos}</strong> Inactivos</li>
      </ul>
    </header>
  )
}

export default Header
