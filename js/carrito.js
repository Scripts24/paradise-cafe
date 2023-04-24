const shop_content = document.getElementById("shop-content");
const ver_carrito = document.getElementById("cart-btn");
const modal_container = document.getElementById("modal-container")

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
        carrito.push({
            id: product.id,
            imagen: product.imagen,
            titulo: product.titulo,
            precio: product.precio,
        });
        console.log(carrito);
    });
});

ver_carrito.addEventListener("click", () => {

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
        `
        modal_container.append(carrito_content)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio, 0)

    const total_buying = document.createElement("div")
    total_buying.className = "total-content"
    total_buying.innerHTML = `Total: $ ${total} `
    modal_container.append(total_buying)

});
