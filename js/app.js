//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

const cargarEventListeners = () => {

    // Cuando presionas agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

const agregarCurso = (e) => {
    
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const eliminarCurso = (e) => {
    
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por el data-id
        const indice_curso = articulosCarrito.findIndex(curso => curso.id === cursoId);
        const curso = articulosCarrito[indice_curso];

        if (curso.cantidad > 1) {
            curso.cantidad--;
        }
        else {
            articulosCarrito.splice(indice_curso, 1);
        }
        
        carritoHTML(); // Iteramos sobre el carrito y mostramos su HYML
    }
}

const vaciarCarrito = () => {
    articulosCarrito = [];
    limpiarCarritoHTML();
}

cargarEventListeners();

const leerDatosCurso = (curso) => {

    //Creando objeto con la info del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        
        const cursos = articulosCarrito.map(curso => {

            if (curso => curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }
            else {
                return curso; // retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];
    }
    else {
        
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//Muestra el carrito de compras en el HTML

const carritoHTML = () => {

    //Limpiando el carrito con contenido previo
    limpiarCarritoHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>

            <td>
                ${titulo}
            </td>
            
            <td>
                ${precio}
            </td>

            <td>
                ${cantidad}
            </td>
            
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
};

const limpiarCarritoHTML = () => {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    //Forma optima de borrar
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}