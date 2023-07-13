
const form = document.querySelector(".form")

const DateTime = luxon.DateTime;

const now = DateTime.now();

//Envío de formulario
document.addEventListener("submit", (e) => {

    const name = document.querySelector("#nombre").value;

    e.preventDefault();

    const response = document.querySelector(".contact-form-response");

    // ---FETCH-----

    fetch("https://formsubmit.co/ajax/pato.atanasoff0815@gmail.com", {
        method: "POST",
        body: new FormData(e.target)
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            console.log(json);
            response.classList.remove("none");
            form.reset();
        })
    Swal.fire({
        title: `Gracias por su compra ${name}, en breve le será enviado su pedido`,
        html: `<span class="sweet-fechas">Fecha de compra: ${now.toLocaleString()}</span>
            `,
        position: 'center',
        color: "#13131a",
        icon: 'success',
        background: "#fff",
        showConfirmButton: true,
        confirmButtonColor: "#13131a",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("carrito", JSON.stringify([]));
            window.location.href = "../index.html";
        }
    });
    // Limpiar el carrito después de 10 segundos
    setTimeout(() => {
        localStorage.setItem("carrito", JSON.stringify([]));
    }, 10000);

    // Redireccionar a la página principal después de 10 segundos
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 10000);
    
});

