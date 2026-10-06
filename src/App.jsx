// App: componente principal. Mantiene el ESTADO PRINCIPAL de los productos
// y reparte datos y funciones a los hijos mediante props.
import { useState } from 'react'
import Header from './components/Header'
import FormularioProducto from './components/FormularioProducto'
import ListaProductos from './components/ListaProductos'

// 8. Datos iniciales (mínimo 5 productos)
const productosIniciales = [
  { id: 1, nombre: 'Laptop Lenovo', categoria: 'Computadores', precio: 2500000, cantidad: 10, estado: 'Disponible' },
  { id: 2, nombre: 'Mouse inalámbrico', categoria: 'Accesorios', precio: 45000, cantidad: 35, estado: 'Disponible' },
  { id: 3, nombre: 'Teclado mecánico', categoria: 'Accesorios', precio: 180000, cantidad: 0, estado: 'Agotado' },
  { id: 4, nombre: 'Monitor 24 pulgadas', categoria: 'Pantallas', precio: 620000, cantidad: 8, estado: 'Disponible' },
  { id: 5, nombre: 'Impresora HP', categoria: 'Impresión', precio: 750000, cantidad: 3, estado: 'Inactivo' },
  { id: 6, nombre: 'Disco duro 1TB', categoria: 'Almacenamiento', precio: 260000, cantidad: 14, estado: 'Disponible' },
]

// 15. Regla de negocio: si la cantidad es 0, el estado siempre es Agotado
const calcularEstado = (cantidad, estado) => (Number(cantidad) === 0 ? 'Agotado' : estado)

function App() {
  // Estado principal
  const [productos, setProductos] = useState(productosIniciales)
  const [productoEditando, setProductoEditando] = useState(null) // null = modo "crear"
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [orden, setOrden] = useState('ninguno') // Reto 1: 'ninguno' | 'asc' | 'desc'

  // 12. ID automático: el mayor id existente + 1 (el usuario no lo escribe)
  const generarId = () => (productos.length ? Math.max(...productos.map((p) => p.id)) + 1 : 1)

  // CREATE
  const agregarProducto = (datos) => {
    const nuevo = { ...datos, id: generarId(), estado: calcularEstado(datos.cantidad, datos.estado) }
    setProductos([...productos, nuevo])
  }

  // UPDATE: map() reemplaza solo el producto con el mismo id, los demás quedan igual
  const actualizarProducto = (datos) => {
    setProductos(
      productos.map((p) =>
        p.id === datos.id ? { ...datos, estado: calcularEstado(datos.cantidad, datos.estado) } : p,
      ),
    )
    setProductoEditando(null)
  }

  // DELETE: pide confirmación y usa filter() para retirar el producto
  const eliminarProducto = (id) => {
    const producto = productos.find((p) => p.id === id)
    if (window.confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`)) {
      setProductos(productos.filter((p) => p.id !== id))
      if (productoEditando && productoEditando.id === id) setProductoEditando(null)
    }
  }

  // Selecciona un producto para cargarlo en el formulario (find())
  const seleccionarParaEditar = (id) => {
    setProductoEditando(productos.find((p) => p.id === id))
  }

  // Reto 5: duplicar producto con un nuevo id
  const duplicarProducto = (id) => {
    const original = productos.find((p) => p.id === id)
    setProductos([...productos, { ...original, id: generarId(), nombre: `${original.nombre} (copia)` }])
  }

  // 20. Limpiar formulario: cancela la edición y deja listo el formulario para crear
  const limpiarFormulario = () => setProductoEditando(null)

  // ---- Datos derivados (no necesitan estado propio) ----
  const texto = busqueda.trim().toLowerCase()
  let productosVisibles = productos
    .filter((p) => p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto)) // 16. Búsqueda
    .filter((p) => filtroEstado === 'Todos' || p.estado === filtroEstado) // 17. Filtro

  // Reto 1: ordenar sobre una COPIA para no mutar el arreglo original
  if (orden === 'asc') productosVisibles = [...productosVisibles].sort((a, b) => a.precio - b.precio)
  if (orden === 'desc') productosVisibles = [...productosVisibles].sort((a, b) => b.precio - a.precio)

  // 18. Contadores
  const contadores = {
    total: productos.length,
    disponibles: productos.filter((p) => p.estado === 'Disponible').length,
    agotados: productos.filter((p) => p.estado === 'Agotado').length,
    inactivos: productos.filter((p) => p.estado === 'Inactivo').length,
  }

  return (
    <div className="app">
      <Header contadores={contadores} />
      <main className="contenido">
        <FormularioProducto
          productoEditando={productoEditando}
          onAgregar={agregarProducto}
          onActualizar={actualizarProducto}
          onLimpiar={limpiarFormulario}
        />
        <ListaProductos
          productos={productosVisibles}
          totalRegistrados={productos.length}
          busqueda={busqueda}
          onBuscar={setBusqueda}
          filtroEstado={filtroEstado}
          onFiltrar={setFiltroEstado}
          orden={orden}
          onOrdenar={setOrden}
          onEditar={seleccionarParaEditar}
          onEliminar={eliminarProducto}
          onDuplicar={duplicarProducto}
          editandoId={productoEditando ? productoEditando.id : null}
        />
      </main>
    </div>
  )
}

export default App
