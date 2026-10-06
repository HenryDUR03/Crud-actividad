// Producto: dibuja UNA fila de la tabla y expone los botones EDITAR, ELIMINAR y DUPLICAR.
// Le avisa a App qué producto se quiere modificar mediante callbacks.

// Reto 2: formato de moneda colombiana ($ 2.500.000)
const formatoMoneda = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function Producto({ producto, enEdicion, onEditar, onEliminar, onDuplicar }) {
  return (
    <tr className={enEdicion ? 'fila-edicion' : ''}>
      <td>{producto.id}</td>
      <td>{producto.nombre}</td>
      <td>{producto.categoria}</td>
      <td className="num">{formatoMoneda.format(producto.precio)}</td>
      <td className="num">{producto.cantidad}</td>
      <td>
        <span className={`etiqueta ${producto.estado.toLowerCase()}`}>{producto.estado}</span>
      </td>
      <td className="botones">
        <button className="btn pequeno" onClick={() => onEditar(producto.id)}>EDITAR</button>
        <button className="btn pequeno" onClick={() => onDuplicar(producto.id)}>DUPLICAR</button>
        <button className="btn pequeno peligro" onClick={() => onEliminar(producto.id)}>ELIMINAR</button>
      </td>
    </tr>
  )
}

export default Producto
