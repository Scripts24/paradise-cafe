let searchInput = document.getElementById("searchInput");
let searchIcon = document.getElementById("searchIcon");
let searchResults = document.getElementById("searchResults");
let resetButton = document.getElementById("resetButton");

searchIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Evitar la propagación del evento

    search();
});

resetButton.addEventListener("click", function (event) {
    resetSearch();
});

function search() {
    let inputValue = searchInput.value.toLowerCase();

    // Limpiar resultados anteriores
    clearResults();

    if (inputValue.trim() !== "") {
        // Leer el archivo JSON de productos
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                // Filtrar productos que coincidan con la búsqueda
                let filteredProducts = data.filter(producto =>
                    producto.titulo.toLowerCase().includes(inputValue)
                );

                // Mostrar resultados en el HTML
                displayResults(filteredProducts);

            });
    } else {
        // Ocultar el div de resultados si no hay texto de búsqueda
        searchResults.style.display = "none";
    }
}

function displayResults(filteredProducts) {
    // Mostrar u ocultar el div de resultados
    if (filteredProducts.length > 0) {
        searchResults.style.display = "block"; // Mostrar el div de resultados
        filteredProducts.forEach(producto => {
            let resultItem = document.createElement("div");
            let productLink = document.createElement("a");
            productLink.href = "#" + producto.id; // Agregar el enlace al producto
            productLink.textContent = producto.titulo;
            resultItem.appendChild(productLink);
            searchResults.appendChild(resultItem);


            // Agregar evento de clic al enlace del producto
            productLink.addEventListener("click", function (event) {
                event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

                // Mostrar el modal con los detalles del producto
                showModal(producto);
            });
        });
    } else {
        // Mostrar mensaje si no hay resultados
        searchResults.innerHTML = "<div>No se encontraron resultados</div>";
        searchResults.style.display = "block"; // Mostrar el div de resultados
    }
}

function showModal(producto) {
    let modal = document.getElementById("productModal");
    let modalTitle = document.getElementById("modalTitle");
    let modalBody = document.getElementById("modalBody");
    let closeBtn = document.getElementsByClassName("close")[0];

    // Configurar el contenido del modal
    modalTitle.textContent = producto.titulo;
    modalBody.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <p>$ ${producto.precio}</p>
                <p>${producto.categoria.id.toUpperCase()}</p>
                <p>${producto.detalles}</p>
    `;

    // Mostrar el modal
    modal.style.display = "block";

    searchIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        showModal();
    });

    function showModal() {
        var modalContainer = document.getElementById("modal");
        modalContainer.classList.remove("hidden");
    }


    // Agregar evento de clic al botón de cerrar el modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Ocultar el modal al hacer clic en el botón de cerrar
    });

    // Agregar evento de clic fuera del modal para cerrarlo
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none"; // Ocultar el modal al hacer clic fuera de él
        }
    });
}


function clearResults() {
    // Limpiar resultados anteriores
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }
}

function resetSearch() {
    searchInput.value = ""; // Limpiar el contenido del input
    clearResults(); // Limpiar los resultados
}



