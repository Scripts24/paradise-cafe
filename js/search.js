var searchInput = document.getElementById("searchInput");
var searchIcon = document.getElementById("searchIcon");
var searchResults = document.getElementById("searchResults");
var resetButton = document.getElementById("resetButton");

searchIcon.addEventListener("click", function(event) {
    event.stopPropagation(); // Evitar la propagación del evento

    search();
});

resetButton.addEventListener("click", function(event) {
    resetSearch();
});

function search() {
    var inputValue = searchInput.value.toLowerCase();

    // Limpiar resultados anteriores
    clearResults();

    if (inputValue.trim() !== "") {
        // Leer el archivo JSON de productos
        fetch("products.json")
            .then(response => response.json())
            .then(data => {
                // Filtrar productos que coincidan con la búsqueda
                var filteredProducts = data.filter(producto =>
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
            var resultItem = document.createElement("div");
            var productLink = document.createElement("a");
            productLink.href = "#" + producto.id; // Agregar el enlace al producto
            productLink.textContent = producto.titulo;
            resultItem.appendChild(productLink);
            searchResults.appendChild(resultItem);
        });
    } else {
        // Mostrar mensaje si no hay resultados
        searchResults.innerHTML = "<div>No se encontraron resultados</div>";
        searchResults.style.display = "block"; // Mostrar el div de resultados
    }
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



