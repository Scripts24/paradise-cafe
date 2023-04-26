const shop_content = document.getElementById("shop-content");
const ver_carrito = document.getElementById("cart-btn");
const modal_container = document.getElementById("modal-container")
const cantidad_carrito = document.getElementById("cantidad-carrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const get_products = async () => {
    const response = await fetch("products.json")
    const data = await response.json()

    data.forEach((product) => {
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

            Swal.fire({
                title: `¡Se ha agregado ${product.cantidad} unidad de café ${product.titulo}`,
                showConfirmButton: false,
                timer: 3000,
                color: "#13131a",
                background: "#fff"
            })

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
            carrito_counter()
            save_local()
        });
    });

}

get_products()

const save_local = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

