# CRUD de productos con React + Vite

Aplicación web para administrar un inventario básico de productos: crear, leer, actualizar y eliminar (CRUD), con búsqueda, filtro por estado, contadores y ordenamiento por precio.

## Cómo ejecutar el proyecto

1. Instalar [Node.js](https://nodejs.org) (versión 18 o superior).
2. Abrir la carpeta del proyecto en Visual Studio Code y una terminal (`Ctrl + ñ`).
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir en el navegador la dirección que aparece (normalmente http://localhost:5173).

## Modelo de datos

| Campo | Descripción |
|---|---|
| id | Se genera automáticamente |
| nombre | Texto obligatorio |
| categoria | Texto obligatorio |
| precio | Número mayor que 0 |
| cantidad | Número mayor o igual a 0 |
| estado | Disponible, Agotado o Inactivo |

Si la cantidad es 0, el estado pasa automáticamente a **Agotado**.

## Estructura y responsabilidad de cada componente

```
src/
├── components/
│   ├── FormularioProducto.jsx
│   ├── ListaProductos.jsx
│   ├── Producto.jsx
│   └── Header.jsx
├── App.jsx
├── main.jsx
└── index.css
```

- **main.jsx**: punto de entrada, monta `App` en la página.
- **App.jsx**: guarda el estado principal (productos, producto en edición, búsqueda, filtro y orden), define las funciones agregar, actualizar, eliminar y duplicar, y calcula los contadores. Pasa datos y funciones a los hijos por props.
- **Header.jsx**: muestra el título y el resumen (total, disponibles, agotados, inactivos).
- **FormularioProducto.jsx**: formulario para crear y editar. Valida los campos y avisa a `App` con `onAgregar` u `onActualizar`.
- **ListaProductos.jsx**: muestra la tabla con `map()`, el buscador, el filtro, el orden y los mensajes de lista vacía.
- **Producto.jsx**: una fila de la tabla con los botones EDITAR, DUPLICAR y ELIMINAR.
- **index.css**: estilos de toda la aplicación.

## Conceptos aplicados

React, Vite, JSX, componentes, props, `useState`, `useEffect`, eventos, formularios controlados, `map()`, `filter()`, `find()`, `sort()`, renderizado condicional y CSS.

## Retos incluidos

1. Ordenar por precio (mayor a menor y menor a mayor).
2. Formato de moneda colombiana con `Intl.NumberFormat`.
3. Mensaje "No hay productos registrados".
4. Mensaje "No se encontraron productos".
5. Botón para duplicar un producto.

## Preguntas de análisis
1. ¿Qué información debe almacenarse en cada producto? Id, nombre, categoría, precio, cantidad y estado (Disponible, Agotado o Inactivo).
2. ¿Dónde debería mantenerse el estado principal de los productos? En el componente App, con useState. Es el componente padre de los demás y por eso puede repartir los datos a todos.
3. ¿Qué componente debería encargarse del formulario? FormularioProducto, porque agrupa los campos, las validaciones y los botones de agregar, guardar y limpiar.
4. ¿Cómo puede el formulario informar a App que se creó un producto? App le pasa por props una función (onAgregar). Cuando el formulario valida los datos, ejecuta esa función y le envía el producto. Así el hijo avisa al padre sin tocar el estado directamente.
5. ¿Qué método usaría para mostrar los productos? map(), que recorre el arreglo y devuelve un componente Producto (una fila) por cada elemento.
6. ¿Qué método usaría para eliminar un producto? filter(). Devuelve un arreglo nuevo con todos los productos cuyo id sea distinto del que se quiere eliminar.
7. ¿Qué método usaría para actualizar un producto? map(). Recorre la lista y, solo cuando el id coincide, reemplaza el producto por la versión editada. Los demás quedan igual.
8. ¿Qué hook de React usaría para manejar el estado? useState. En el proyecto también usé useEffect para cargar en el formulario los datos del producto que se va a editar.
9. ¿Por qué usar la propiedad key al mostrar una lista? Porque React la usa para identificar cada elemento. Con una key única (el id), React sabe cuál se agregó, cambió o eliminó y actualiza solo esa parte, sin mezclar elementos ni redibujar toda la lista.
10. ¿Diferencia entre crear, actualizar y eliminar?
  - Crear agrega un producto nuevo con un id nuevo.
  - Actualizar modifica uno existente y conserva su id.
  - Eliminar lo retira de la lista.
En los tres casos se crea un arreglo nuevo en lugar de modificar el original.