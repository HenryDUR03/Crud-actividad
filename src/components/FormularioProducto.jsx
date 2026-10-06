// FormularioProducto: crea y edita productos.
// Tiene su propio estado (los campos) y avisa a App con onAgregar / onActualizar.
import { useState, useEffect } from 'react'

const formVacio = { nombre: '', categoria: '', precio: '', cantidad: '', estado: 'Disponible' }

function FormularioProducto({ productoEditando, onAgregar, onActualizar, onLimpiar }) {
  const [form, setForm] = useState(formVacio)
  const [errores, setErrores] = useState({})

  // Cuando App selecciona un producto para editar, sus datos pasan al formulario
  useEffect(() => {
    setForm(productoEditando ? productoEditando : formVacio)
    setErrores({})
  }, [productoEditando])

  // Un solo manejador para todos los campos
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // 11. Validaciones
  const validar = () => {
    const e = {}
    if (form.nombre.trim() === '') e.nombre = 'El nombre es obligatorio.'
    if (form.categoria.trim() === '') e.categoria = 'La categoría es obligatoria.'
    if (form.precio === '' || Number(form.precio) <= 0) e.precio = 'El precio debe ser mayor que cero.'
    if (form.cantidad === '' || Number(form.cantidad) < 0) e.cantidad = 'La cantidad debe ser 0 o mayor.'
    if (!['Disponible', 'Agotado', 'Inactivo'].includes(form.estado)) e.estado = 'Selecciona un estado válido.'
    return e
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    // Se limpian los espacios y se convierten los números
    const datos = {
      ...form,
      nombre: form.nombre.trim(),
      categoria: form.categoria.trim(),
      precio: Number(form.precio),
      cantidad: Number(form.cantidad),
    }

    if (productoEditando) {
      onActualizar(datos) // conserva el id original
    } else {
      onAgregar(datos) // App genera el id
    }
    setForm(formVacio)
  }

  // Si la cantidad es 0 el estado se muestra como Agotado automáticamente
  const estadoMostrado = form.cantidad !== '' && Number(form.cantidad) === 0 ? 'Agotado' : form.estado

  return (
    <section className="panel formulario">
      <h2>{productoEditando ? `Editando: ${productoEditando.nombre}` : 'Nuevo producto'}</h2>
      <form onSubmit={manejarEnvio} noValidate>
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={manejarCambio} placeholder="Ej: Laptop Lenovo" />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </label>

        <label>
          Categoría
          <input name="categoria" value={form.categoria} onChange={manejarCambio} placeholder="Ej: Computadores" />
          {errores.categoria && <span className="error">{errores.categoria}</span>}
        </label>

        <div className="fila">
          <label>
            Precio
            <input name="precio" type="number" min="0" value={form.precio} onChange={manejarCambio} />
            {errores.precio && <span className="error">{errores.precio}</span>}
          </label>
          <label>
            Cantidad
            <input name="cantidad" type="number" min="0" value={form.cantidad} onChange={manejarCambio} />
            {errores.cantidad && <span className="error">{errores.cantidad}</span>}
          </label>
        </div>

        <label>
          Estado
          <select name="estado" value={estadoMostrado} onChange={manejarCambio}>
            <option>Disponible</option>
            <option>Agotado</option>
            <option>Inactivo</option>
          </select>
          {errores.estado && <span className="error">{errores.estado}</span>}
        </label>

        <div className="acciones">
          <button type="submit" className="btn primario">
            {productoEditando ? 'GUARDAR CAMBIOS' : 'AGREGAR PRODUCTO'}
          </button>
          <button type="button" className="btn" onClick={onLimpiar}>
            LIMPIAR FORMULARIO
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormularioProducto
