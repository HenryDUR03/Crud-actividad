// ListaProductos: muestra la tabla con map(), el buscador, el filtro y el orden.
// No guarda estado: todo llega por props desde App.
import Producto from './Producto'

function ListaProductos({
  productos, totalRegistrados,
  busqueda, onBuscar,
  filtroEstado, onFiltrar,
  orden, onOrdenar,
  onEditar, onEliminar, onDuplicar, editandoId,
}) {
  return (
    <section className="panel lista">
      <h2>Productos</h2>

      {/* Barra de herramientas: buscar, filtrar y ordenar */}
      <div className="herramientas">
        <input
          type="search"
          placeholder="Buscar producto por nombre o categoría"
          value={busqueda}
          onChange={(e) => onBuscar(e.target.value)}
        />
        <select value={filtroEstado} onChange={(e) => onFiltrar(e.target.value)} aria-label="Filtrar por estado">
          <option>Todos</option>
          <option>Disponible</option>
          <option>Agotado</option>
          <option>Inactivo</option>
        </select>
        <select value={orden} onChange={(e) => onOrdenar(e.target.value)} aria-label="Ordenar por precio">
          <option value="ninguno">Sin orden</option>
          <option value="desc">Precio: mayor a menor</option>
          <option value="asc">Precio: menor a mayor</option>
        </select>
      </div>

      {/* Renderizado condicional (Retos 3 y 4) */}
      {totalRegistrados === 0 ? (
        <p className="vacio">No hay productos registrados. Agrega el primero con el formulario.</p>
      ) : productos.length === 0 ? (
        <p className="vacio">No se encontraron productos con ese criterio.</p>
      ) : (
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* 9. map() + key única por producto */}
              {productos.map((p) => (
                <Producto
                  key={p.id}
                  producto={p}
                  enEdicion={p.id === editandoId}
                  onEditar={onEditar}
                  onEliminar={onEliminar}
                  onDuplicar={onDuplicar}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ListaProductos
