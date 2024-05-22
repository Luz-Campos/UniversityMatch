console.log('correcto');
let datos;

document.querySelector('#buscar').addEventListener('click', function () {
    const filtro = document.getElementById('filtro').value;
    buscarProductos(filtro);
});

traerDatos();

function traerDatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'Unis.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    datos = JSON.parse(this.responseText);
                    mostrarProductos(datos);
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                }
            } else {
                console.error('Error en la solicitud:', this.status);
            }
        }
    };
}

function mostrarProductos(productos) {
    let res = document.querySelector('#res');
    res.innerHTML = '';

    for (let producto of productos) {
        if (producto.nombre && producto.acronimo && producto.direccion && producto.telefono && producto.url && producto.foto) {
            res.innerHTML += `
            <div class="col-md-4 text-center producto">
            <div class="card" style="margin: 10px;">
                <div class="card-content">
                    <h2 class="text-center text-dark">
                        ${producto.acronimo}
                    </h2>
                    <h3 class="text-center text-primary text-dark nombre">
                        ${producto.nombre}
                    </h3>
                    <a href="${producto.url}">
                        <img class="text-center" src="${producto.foto}" alt="">
                    </a>
                    <h5 class="direccion">
                        ${producto.direccion}
                    </h5>
                    <h4 class="text-center text-dark">
                        ${producto.telefono}
                    </h4>
                </div>
            </div>
        </div>
        
            `;
        }
    }
}

function buscarProductos(filtro) {
    const productosFiltrados = datos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.acronimo.toLowerCase().includes(filtro.toLowerCase())
    );
    mostrarProductos(productosFiltrados);
}

function filtrarPorCategoria(categoria) {
    const productosFiltrados = datos.filter(producto =>
        producto[categoria] === "si"
    );
    mostrarProductos(productosFiltrados);
}


document.getElementById('filtrar').addEventListener('change', function () {
    const categoriaSeleccionada = this.value;
    if (categoriaSeleccionada !== 'ninguno') {
        filtrarPorCategoria(categoriaSeleccionada);
    } else {
        mostrarProductos(datos);
    }
});
