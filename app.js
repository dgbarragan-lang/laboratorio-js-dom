const nombreInput = document.getElementById("nombre");
const carreraInput = document.getElementById("carrera");
const semestreInput = document.getElementById("semestre");

const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnVerJsonGeneral = document.getElementById("btnVerJsonGeneral");

const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiarBusqueda = document.getElementById("btnLimpiarBusqueda");

const filtroCarrera = document.getElementById("filtroCarrera");
const btnFiltrar = document.getElementById("btnFiltrar");

const cuerpoTabla = document.getElementById("cuerpoTabla");
const totalEstudiantes = document.getElementById("totalEstudiantes");
const mensaje = document.getElementById("mensaje");

let estudiantes = [];
let editIndex = -1;

btnAgregar.addEventListener("click", manejarAgregar);
btnLimpiar.addEventListener("click", limpiarTodo);
btnVerJsonGeneral.addEventListener("click", mostrarJsonGeneral);
btnBuscar.addEventListener("click", buscarEstudiantes);
btnLimpiarBusqueda.addEventListener("click", () => { inputBuscar.value = ""; renderTabla(); });
btnFiltrar.addEventListener("click", aplicarFiltroCarrera);

// Delegación de eventos para botones dentro de la tabla
cuerpoTabla.addEventListener("click", (e) => {
  const target = e.target;
  const accion = target.dataset.action;
  const index = target.dataset.index;
  if (!accion) return;

  if (accion === "ver") {
    mostrarJsonIndividual(parseInt(index, 10));
  } else if (accion === "editar") {
    iniciarEdicion(parseInt(index, 10));
  } else if (accion === "eliminar") {
    eliminarEstudiante(parseInt(index, 10));
  }
});

function manejarAgregar() {
  const estudiante = obtenerDatosFormulario();

  if (!validarEstudiante(estudiante)) {
    mostrarToast("Complete todos los campos.", "warning");
    return;
  }

  if (editIndex >= 0) {
    estudiantes[editIndex] = estudiante;
    editIndex = -1;
    btnAgregar.textContent = "Agregar estudiante";
    mostrarToast("Estudiante editado correctamente.", "success");
  } else {
    estudiantes.push(estudiante);
    mostrarToast("Estudiante agregado correctamente.", "success");
  }

  renderTabla();
  limpiarFormulario();
}

function obtenerDatosFormulario() {
  return {
    nombre: nombreInput.value.trim(),
    carrera: carreraInput.value,
    semestre: semestreInput.value.trim()
  };
}

function validarEstudiante(est) {
  return est.nombre !== "" && est.carrera !== "" && est.semestre !== "";
}

function renderTabla(registros = estudiantes) {
  cuerpoTabla.innerHTML = "";
  registros.forEach((est, i) => {
    const tr = document.createElement("tr");

    const tdNum = document.createElement("td");
    tdNum.textContent = i + 1;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = est.nombre;

    const tdCarrera = document.createElement("td");
    tdCarrera.textContent = est.carrera;

    const tdSemestre = document.createElement("td");
    tdSemestre.textContent = est.semestre;

    const tdAcciones = document.createElement("td");
    tdAcciones.innerHTML = `
      <button class="btn btn-sm btn-info me-1" data-action="ver" data-index="${i}">Ver JSON</button>
      <button class="btn btn-sm btn-warning me-1" data-action="editar" data-index="${i}">Editar</button>
      <button class="btn btn-sm btn-danger" data-action="eliminar" data-index="${i}">Eliminar</button>
    `;

    tr.appendChild(tdNum);
    tr.appendChild(tdNombre);
    tr.appendChild(tdCarrera);
    tr.appendChild(tdSemestre);
    tr.appendChild(tdAcciones);

    cuerpoTabla.appendChild(tr);
  });

  actualizarTotal();
}

function actualizarTotal() {
  totalEstudiantes.textContent = estudiantes.length;
}

function limpiarFormulario() {
  nombreInput.value = "";
  carreraInput.value = "";
  semestreInput.value = "";
}

function limpiarTodo() {
  Swal.fire({
    title: '¿Limpiar todo?',
    text: 'Se eliminarán todos los registros y se reiniciará el contador.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, limpiar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      estudiantes = [];
      editIndex = -1;
      btnAgregar.textContent = 'Agregar estudiante';
      renderTabla();
      mostrarToast('Datos limpiados correctamente.', 'info');
    }
  });
}

function mostrarToast(texto, tipo = 'info') {
  let background = '#3498db';
  if (tipo === 'success') background = '#28a745';
  if (tipo === 'warning') background = '#f39c12';
  if (tipo === 'error') background = '#dc3545';
  if (tipo === 'info') background = '#6c757d';

  Toastify({
    text: texto,
    duration: 2500,
    close: true,
    gravity: 'top',
    position: 'right',
    style: { background }
  }).showToast();
}

function mostrarJsonIndividual(index) {
  const est = estudiantes[index];
  if (!est) return mostrarToast('Estudiante no encontrado.', 'error');
  mostrarJsonEnModal(est, 'JSON estudiante');
}

function mostrarJsonGeneral() {
  if (estudiantes.length === 0) {
    mostrarJsonEnModal({ mensaje: 'No existen estudiantes registrados.' }, 'JSON general');
    return;
  }
  mostrarJsonEnModal(estudiantes, 'JSON general');
}

function mostrarJsonEnModal(data, titulo = 'JSON') {
  const modalEl = document.getElementById('jsonModal');
  const contenido = document.getElementById('modalJsonContent');
  const modalTitle = modalEl.querySelector('.modal-title');
  modalTitle.textContent = titulo;
  contenido.textContent = JSON.stringify(data, null, 2);
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function iniciarEdicion(index) {
  const est = estudiantes[index];
  if (!est) return mostrarToast('Estudiante no encontrado.', 'error');
  nombreInput.value = est.nombre;
  carreraInput.value = est.carrera;
  semestreInput.value = est.semestre;
  editIndex = index;
  btnAgregar.textContent = 'Guardar cambios';
}

function eliminarEstudiante(index) {
  const est = estudiantes[index];
  if (!est) return mostrarToast('Estudiante no encontrado.', 'error');

  Swal.fire({
    title: '¿Eliminar estudiante?',
    text: `Se eliminará a ${est.nombre}. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      estudiantes.splice(index, 1);
      renderTabla();
      mostrarToast('Estudiante eliminado.', 'success');
    }
  });
}

function buscarEstudiantes() {
  const texto = inputBuscar.value.trim().toLowerCase();
  if (texto === '') return renderTabla();

  const resultados = estudiantes.filter((e) => {
    return (
      e.nombre.toLowerCase().includes(texto) ||
      e.carrera.toLowerCase().includes(texto) ||
      String(e.semestre).toLowerCase().includes(texto)
    );
  });

  renderTabla(resultados);
}

function aplicarFiltroCarrera() {
  const seleccionado = filtroCarrera.value;
  if (seleccionado === 'Todas') return renderTabla();
  const resultados = estudiantes.filter((e) => e.carrera === seleccionado);
  renderTabla(resultados);
}

// Render inicial
renderTabla();