const shop_content = document.getElementById("shop-content");
const ver_carrito = document.getElementById("cart-btn");
const modal_container = document.getElementById("modal-container")
const cantidad_carrito = document.getElementById("cantidad-carrito")

let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "box";
    content.innerHTML += `
                    <div class="image">
                        <img src="${product.imagen}" >
                    </div>
                    <div class="content">
                        <h3>${product.titulo}</h3>
                        <div class="price">$ ${product.precio} <span>$250</span> </div>
                    </div>
    `;

    shop_content.append(content);

    let comprar = document.createElement("button");
    comprar.className = "add";
    comprar.innerHTML = `
    <i class="fas fa-cart-shopping"></i>
    `;

    content.append(comprar);

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeat_product) => repeat_product.id === product.id)

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++
                }
            })
        } else {
            carrito.push({
                id: product.id,
                imagen: product.imagen,
                titulo: product.titulo,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        console.log(carrito);

        carrito_counter()
    });
});


const pintar_carrito = () => {

    modal_container.innerHTML = ""
    modal_container.style.display = "block"

    const modal_header = document.createElement("div");
    modal_header.className = "modal-header";
    modal_header.innerHTML = `
        <h2 class = "modal-header-title">Carrito</h2>
    `;

    modal_container.append(modal_header)

    const modal_button = document.createElement("button")
    modal_button.className = "modal-header-button"
    modal_button.innerHTML = `
    <i class="fas fa-times"></i>
    `
    modal_button.addEventListener("click", () => {
        modal_container.style.display = "none"
    })

    modal_header.append(modal_button)

    carrito.forEach((product) => {
        let carrito_content = document.createElement("div")
        carrito_content.className = "modal-content"
        carrito_content.innerHTML = `
            <img src="${product.imagen}">
            <h3>${product.titulo}</h3>
            <p class="price">$ ${product.precio}</p>
            <p class="quantity">Cantidad: ${product.cantidad}</p>
            <p class="total">Total: $ ${product.cantidad * product.precio}</p>

        `
        modal_container.append(carrito_content)

        let eliminar = document.createElement("div")
        eliminar.className = "delete-product"
        eliminar.innerHTML = `
        <i class="fa-solid fa-trash-can"></i>
        `
        carrito_content.append(eliminar)

        eliminar.addEventListener("click", eliminar_producto)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const total_buying = document.createElement("div")
    total_buying.className = "total-content"
    total_buying.innerHTML = `Total: $ ${total} `
    modal_container.append(total_buying)

};

ver_carrito.addEventListener("click", pintar_carrito)

const eliminar_producto = () => {
    const found_id = carrito.find((element) => element.id)

    carrito = carrito.filter((carrito_id) => {
        return carrito_id !== found_id
    })
    carrito_counter()
    pintar_carrito()
}

const carrito_counter = () => {
    cantidad_carrito.style.display = "block"
    cantidad_carrito.innerText = carrito.length
}