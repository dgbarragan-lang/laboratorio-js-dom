1. Botón para abrir el JSON

Coloque este botón debajo de la tabla:

<button id="btnVerJSON" class="btn btn-dark mt-3">
  Ver JSON de estudiantes
</button>
2. Modal Bootstrap para mostrar el JSON

Coloque este modal antes de cerrar el body:

<div class="modal fade" id="modalJSON" tabindex="-1" aria-labelledby="modalJSONLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="modalJSONLabel">JSON de estudiantes registrados</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <pre id="contenidoJSON" class="bg-dark text-white p-3 rounded"></pre>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>

    </div>
  </div>
</div>
3. Agregar el script de Bootstrap

Antes de app.js, coloque el script de Bootstrap. Debe quedar así:

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="app.js"></script>

Esto es necesario para que el modal funcione.

4. JavaScript mínimo

En app.js, agregue un arreglo global:

const estudiantesRegistrados = [];

Cuando agregue un estudiante correctamente, guárdelo en ese arreglo:

estudiantesRegistrados.push(estudiante);

Luego capture el botón:

const btnVerJSON = document.getElementById("btnVerJSON");

btnVerJSON.addEventListener("click", mostrarModalJSON);

Y cree esta función:

function mostrarModalJSON() {
  const contenidoJSON = document.getElementById("contenidoJSON");

  if (estudiantesRegistrados.length === 0) {
    contenidoJSON.textContent = "No existen estudiantes registrados.";
  # Laboratorio DOM — Registro de Estudiantes

  Descripción
  -----------
  Pequeña aplicación para registrar estudiantes usando manipulación del DOM. Permite agregar, editar, eliminar registros, buscar y filtrar, y ver los datos en formato JSON dentro de un modal Bootstrap. Además integra SweetAlert2 y Toastify para confirmaciones y notificaciones.

  Características implementadas
  -----------------------------
  - Arreglo global `estudiantes` que almacena los registros en memoria.
  - Agregar estudiantes (nombre, carrera, semestre) y guardarlos como objetos en el arreglo.
  - Tabla dinámica que se renderiza desde el arreglo y muestra todos los registros.
  - Columna de acciones con botones: `Ver JSON`, `Editar`, `Eliminar`.
  - Modal Bootstrap para visualizar JSON (individual y general) usando `JSON.stringify(..., null, 2)`.
  - Botón para ver el JSON general de todos los estudiantes.
  - Validaciones simples de formulario y notificaciones visuales.
  - Edición en línea: carga datos al formulario, modo edición y cambio del texto del botón.
  - Eliminación con confirmación SweetAlert2.
  - Notificaciones breves con Toastify para agregar/editar/eliminar/limpiar.
  - Búsqueda por texto (nombre, carrera, semestre) y filtro por carrera; ambos operan sobre el arreglo y luego vuelven a renderizar la tabla.

  Estructura de archivos
  ----------------------
  - [index.html](index.html): interfaz, formulario, tabla, modal y enlaces a librerías.
  - [app.js](app.js): lógica principal (arreglo, renderizado, CRUD, búsqueda, modal, SweetAlert2/Toastify).
  - [README.md](README.md): este archivo.

  Cómo ejecutar
  -------------
  1. Abrir `index.html` en el navegador (doble clic o `Abrir con` → navegador). No necesita servidor.
  2. Completar el formulario y usar `Agregar estudiante` para registrar.
  3. Usar los botones de la tabla para ver JSON, editar o eliminar.

  Pruebas sugeridas (mínimo 5 estudiantes)
  ---------------------------------------
  1. Registrar cinco estudiantes diferentes.
  2. Ver el JSON individual de al menos dos registros.
  3. Abrir el JSON general y verificar su formato.
  4. Editar un registro y confirmar que la tabla y el contador se actualizan.
  5. Eliminar un registro y confirmar la confirmación y la actualización del contador.
  6. Usar búsqueda y filtro por carrera para comprobar resultados.

  Notas técnicas y recomendaciones
  --------------------------------
  - La aplicación usa un arreglo en memoria; al recargar la página los datos se pierden. Para persistencia se podría usar `localStorage` o un backend.
  - Recomendación: usar un identificador único por estudiante (por ejemplo `id: Date.now()` o UUID) para evitar problemas al editar/eliminar desde vistas filtradas. Actualmente las acciones usan índices relativos; si trabajas con resultados filtrados, esto podría eliminar/editar el elemento incorrecto.

  Bibliotecas integradas
  ----------------------
  - Bootstrap 5: estilos y modal.
  - SweetAlert2: confirmaciones (eliminar, limpiar todo).
  - Toastify: notificaciones breves de éxito/advertencia.

