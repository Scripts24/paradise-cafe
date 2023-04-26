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
            <p class="price"> $${product.precio}</p>
            <div class="box-quantity">
            <div class="increase">+</div>
            <p class="quantity"> ${product.cantidad}</p>
            <div class="decrease">-</div>
            </div>
            <p class="subtotal">Subtotal: $${product.cantidad * product.precio}</p>
            <div class="delete-product"><i class="fa-solid fa-trash-can"></i></div>
        `
        modal_container.append(carrito_content)

        let restar = carrito_content.querySelector(".decrease")

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--
            }
            save_local()
            pintar_carrito()
        })

        let sumar = carrito_content.querySelector(".increase")

        sumar.addEventListener("click", () => {
            product.cantidad++
            save_local()
            pintar_carrito()
        })

        let eliminar = carrito_content.querySelector(".delete-product")

        eliminar.addEventListener("click", () => {
            eliminar_producto(product.id)

            Swal.fire({
                title: `¡Se ha eliminado ${product.cantidad} unidad/es de café ${product.titulo}`,
                showConfirmButton: false,
                timer: 3000,
                color: "#13131a",
                background: "#fff"
            })
        })
    })


    if (carrito.length === 0) {
        let carrito_vacio = document.createElement("p")
        carrito_vacio.innerHTML = `
            <p class="parrafo-modal">Tu carrito está vacío</p>
            `;
        modal_container.append(carrito_vacio)
    }

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const total_buying = document.createElement("div")
    total_buying.className = "total-content"
    total_buying.innerHTML = `
                    
                    Total: $ ${total} 
                    
                `
    modal_container.append(total_buying)

    const opciones = document.createElement("div")
    opciones.innerHTML = `
    <button  class="btn" id="vaciar-carrito" > Vaciar carrito</button>
    <button  class="btn" id="continuar-compra">Realizar compra</button>
    `
    modal_container.append(opciones)

    let continuar_compra = opciones.querySelector("#continuar-compra")
    if (continuar_compra) {
        continuar_compra.addEventListener("click", () => {
            if (carrito.length === 0) {
                Swal.fire({
                    title: "⛔ El carrito está vacío‼",
                    text: "Agrega algún producto para continuar con la compra",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor:"#13131a",
                    background: "#fff",
                    color: "#13131a",
                });
            } else {
                location.href = "../checkout.html"
            }
        });
    }

    let vaciar_carrito = opciones.querySelector("#vaciar-carrito")
    if (vaciar_carrito) {
        vaciar_carrito.addEventListener('click', () => {
            carrito.length = [];
            localStorage.clear()
            pintar_carrito()
            window.location.reload()
        });
    }
};


ver_carrito.addEventListener("click", pintar_carrito)

const eliminar_producto = (id) => {
    const found_id = carrito.find((element) => element.id === id)

    carrito = carrito.filter((carrito_id) => {
        return carrito_id !== found_id
    })

    carrito_counter()
    save_local()
    pintar_carrito()
}

const carrito_counter = () => {
    cantidad_carrito.style.display = "block"

    const carrito_length = carrito.length

    localStorage.setItem("carrito_length", JSON.stringify(carrito_length))

    cantidad_carrito.innerText = JSON.parse(localStorage.getItem("carrito_length"))
}

carrito_counter()